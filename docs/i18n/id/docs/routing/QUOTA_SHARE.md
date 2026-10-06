# Quota Sharing Engine (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referensi dokumen**: `docs/routing/QUOTA_SHARE.md`
> Bagian dari Grup B (rencana 16 + 22).

---

## Gambaran Umum

Mesin Berbagi Kuota mendistribusikan kuota berbasis waktu milik penyedia (misalnya
jendela 5 jam Codex, Kimi 1500 permintaan/jam) secara adil ke beberapa kunci API
yang menggunakan koneksi yang sama.

**Masalah yang diselesaikan:** OmniRoute memproksikan banyak kunci API ke akun
penyedia upstream yang sama. Tanpa logika berbagi, lonjakan dari kunci A dapat
menghabiskan kuota penyedia untuk satu jam, sehingga kunci B dan C diblokir hingga
jendela direset. Mesin ini mencegahnya dengan:

1. Melacak konsumsi bergulir setiap kunci per dimensi (%, permintaan, token, $).
2. Menerapkan algoritma pembagian adil yang mempertahankan penggunaan kapasitas: sebuah kunci dapat meminjam dari
   bagian yang tidak digunakan selama kumpulan global belum jenuh.
3. Menerapkan hasilnya di jalur kritis (`chatCore.ts`) sebelum permintaan
   mencapai eksekutor upstream.

---

## Algoritma: Pembagian Adil yang Mempertahankan Penggunaan Kapasitas

Diimplementasikan dalam `src/lib/quota/fairShare.ts`.

### Mode

| Kondisi                                    | Mode        | Perilaku                                                                       |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------------------ |
| `globalUsedPercent < saturationThreshold`  | **Longgar** | Kunci dapat meminjam hingga batas global dikurangi total yang telah dikonsumsi |
| `globalUsedPercent >= saturationThreshold` | **Ketat**   | Terapkan bagian adil individual secara ketat                                   |

Nilai default `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Keputusan per dimensi

Untuk setiap dimensi aktif dalam kumpulan, mesin menghitung:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = nilai bergulir saat ini untuk kunci ini (dari QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Kemudian:

- **`policy = hard`**: jika `consumed > fairShareAllowed` dan mode ketat → **blokir**.
- **`policy = soft`**: jika `consumed > fairShareAllowed` dan mode ketat → **beri penalti** (turunkan prioritas dalam kombinasi; jangan pernah memblokir secara keras).
- **`policy = burst`**: izinkan selama masih ada kapasitas global, terlepas dari bagian adil.

### Batas absolut

`capValue` + `capUnit` pada suatu alokasi merupakan batas maksimum mutlak yang tidak bergantung pada mode atau
kebijakan. Setiap dimensi dengan `consumed >= capValue` selalu **memblokir** permintaan.

### Pemeriksaan multidimensi

Sebuah permintaan diblokir jika **salah satu** dimensi dalam kumpulan akan memblokirnya. Setiap dimensi
bersifat independen — habisnya 5h% tidak memengaruhi dimensi weekly%.

### Peminjaman

Dalam mode longgar, kunci yang alokasinya belum sepenuhnya dikonsumsi dapat menggunakan surplus dari
bagian kunci lain yang tidak teralokasi. Rumusnya adalah:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

dengan `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Batas maksimum global
(`limit` kumpulan untuk dimensi tersebut) selalu menjadi batas mutlak.

---

## Penghitung Jendela Bergulir

Diimplementasikan dalam `src/lib/quota/sqliteQuotaStore.ts` dan `redisQuotaStore.ts`.

Dua bucket per `(apiKeyId, dimensionKey)`:

- `curr`: bucket saat ini (`floor(nowMs / windowMs)`)
- `prev`: bucket sebelumnya (`curr - 1`)

Nilai bergulir efektif:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Presisi**: akurat ~99%. Galat paling banyak sebesar 1% dari ukuran jendela pada
batas antar-bucket (melekat pada aproksimasi 2 bucket).

### Konkurensi

Driver SQLite: mutex dalam memori per kunci `(apiKeyId | dimensionKey)` mencegah
race baca-modifikasi-tulis. Polanya menyerupai mekanisme anti-thundering-herd di `src/sse/services/auth.ts`.

Driver Redis: skrip Lua EVAL untuk inkremen atomik — berjalan sebagai satu perintah Redis.

---

## Driver

### SQLite (default, tanpa instalasi)

- Tabel: `quota_consumption` (lihat migrasi `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Paling sesuai untuk deployment satu instans.
- Semua persistensi berada dalam DB SQLite OmniRoute yang sudah ada (`DATA_DIR/storage.sqlite`).

### Redis (opsional, multi-instans)

- Memerlukan package npm `ioredis`.
- Penghitung disimpan di Redis; metadata (pool/alokasi) tetap berada di SQLite.
- Paling sesuai untuk deployment dengan banyak replika ketika penghitung harus digunakan bersama.

### Mengganti driver

Melalui UI pengaturan (`/dashboard/settings` → Penyimpanan Kuota), atau melalui variabel lingkungan:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Pengaturan DB lebih diprioritaskan daripada variabel lingkungan. Jika `driver=redis` tetapi URL tidak tersedia atau
`ioredis` tidak terinstal, factory akan kembali menggunakan SQLite dan mencatat peringatan.

Urutan pemilihan driver:

1. Pengaturan DB `quotaStore.driver`
2. Variabel lingkungan `QUOTA_STORE_DRIVER`
3. Default: `sqlite`

---

## Multi-Dimensi

Sebuah pool dapat memiliki beberapa dimensi. Setiap dimensi bersifat independen:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // batas maksimum pool global untuk dimensi ini
}
```

**Contoh: Paket Codex** (5h% + mingguan%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Sebuah permintaan harus memenuhi semua dimensi agar diizinkan.

---

## Resolver Paket

Diimplementasikan dalam `src/lib/quota/planResolver.ts`.

Urutan prioritas (tertinggi ke terendah):

1. **Override DB manual** — tabel `provider_plans`, per `connectionId`.
2. **Katalog yang dikenal** — `src/lib/quota/planRegistry.ts` (hanya data).
3. **Paket kosong** — tanpa dimensi, memerlukan konfigurasi manual.

### Katalog yang dikenal

| Penyedia              | Dimensi                                                       |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, tidak diketahui), `tokens/weekly`       |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Tanpa default — memerlukan konfigurasi manual                 |

---

## Integrasi Pipeline

### Hook PRE (`open-sse/handlers/chatCore.ts`)

Dijalankan sebelum eksekutor upstream, setelah pemeriksaan autentikasi dan kebijakan:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimensi
      → fairShare.decideFairShare()
      → jika diblokir → kembalikan 429 (buildErrorBody, Aturan Ketat #12)
      → jika diizinkan + turunkan prioritas → tetapkan quotaSoftPenalty=true pada kandidat
  → executor.execute()
```

**Fail-open**: jika `enforceQuotaShare` melempar error, permintaan tetap diizinkan
dengan log `pino.warn`. Hal ini mencegah bug pada mesin kuota memblokir seluruh
lalu lintas.

### Hook POST (mencatat konsumsi)

Setelah respons berhasil:

```
eksekutor mengembalikan keberhasilan
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimensi
      → fail-open: error dicatat sebagai pino.warn, tidak pernah diteruskan ke klien
```

**Catatan penyimpangan**: jika `consume` gagal setelah respons, penghitung bergulir mencatat nilai yang lebih rendah.
Sinyal saturasi dari penyedia (misalnya `anthropic-ratelimit-unified-5h-utilization`)
mengoreksi estimasi global pada permintaan berikutnya.

### Penalti lunak kombo (`open-sse/services/combo.ts`)

Ketika `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Penalti diterapkan setelah semua faktor penilaian lainnya. Penalti ini menurunkan probabilitas
kombo otomatis memilih kunci yang jenuh tanpa memblokirnya secara mutlak.

---

## Panduan UI

### `/dashboard/costs/quota-share` — Halaman pool utama

Komponen (semuanya di `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponen               | Tujuan                                                                         |
| ---------------------- | ------------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Kartu pengantar yang menjelaskan pembagian kuota kepada pengguna baru          |
| `CreatePoolModal`      | Membuat pool kuota baru (koneksi + nama + alokasi awal)                        |
| `PoolCard`             | Ringkasan per pool: nama, koneksi, jumlah alokasi                              |
| `DimensionBar`         | Bilah bertumpuk per dimensi: porsi setiap kunci + penggunaan global            |
| `AllocationTable`      | Tabel berisi penggunaan, porsi wajar, defisit/surplus, dan tanda peminjaman    |
| `BurnRateChart`        | Grafik garis laju pemakaian EMA (Recharts dimuat secara malas via `dynamic()`) |
| `EditAllocationsModal` | Mengedit bobot alokasi, batas, dan kebijakan untuk suatu pool                  |

Hook halaman:

- `usePools` — mengambil `GET /api/quota/pools` setiap 30 detik.
- `usePoolUsage` — mengambil `GET /api/quota/pools/[id]/usage` sesuai permintaan.
- `useLocalStoragePoolMigration` — dijalankan sekali saat mount untuk memigrasikan data LS lama.

### `/dashboard/costs/quota-share/plans` — Konfigurasi paket penyedia

- `ProviderPlanConfigClient.tsx`: menu tarik-turun untuk memilih penyedia, melihat
  paket yang ditentukan (otomatis dari katalog atau penggantian manual), dan mengedit dimensi.
- Perubahan ditulis ke `PUT /api/quota/plans/[connectionId]`.
- Penghapusan mengembalikan konfigurasi ke katalog atau paket kosong.

---

## Variabel Lingkungan

| Variabel                           | Nilai Bawaan | Deskripsi                                                        |
| ---------------------------------- | ------------ | ---------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`     | Driver yang digunakan: `sqlite` atau `redis`                     |
| `QUOTA_STORE_REDIS_URL`            | _(kosong)_   | URL Redis, misalnya `redis://localhost:6379`                     |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`        | 0..1; `>= ambang batas` mengaktifkan mode ketat                  |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`        | 0..1; pengali untuk skor gabungan kebijakan lunak                |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`         | Jumlah hari sebelum GC menghapus bucket `quota_consumption` lama |

Pengaturan DB (`quotaStore.*`) menggantikan variabel lingkungan.

---

## Pemecahan Masalah

### Redis dikonfigurasi tetapi tidak terhubung

Pastikan `ioredis` telah terinstal (`npm ls ioredis`) dan `QUOTA_STORE_REDIS_URL`
dapat dijangkau. Jika koneksi gagal, factory akan beralih kembali ke SQLite (dicatat
pada level `warn`).

### `peek` mengembalikan data usang / fail-open

Jika `peek` melempar error, `enforceQuotaShare` memperlakukan hasilnya sebagai "izinkan" (fail-open).
Periksa log `pino` untuk entri `quota:enforce` dan `quota:factory` guna mengidentifikasi
akar penyebabnya.

### Penyimpangan penghitung konsumsi

Jika penggunaan aktual dari penyedia berbeda dari penghitung, hal tersebut wajar — jendela
geser 2 bucket memiliki galat ~1% pada batas jendela, dan `consume` dijalankan secara
fire-and-forget setelah respons. Sinyal saturasi (`saturationSignals.ts`)
membaca pemanfaatan penyedia yang sebenarnya dengan TTL 30 detik dan menyesuaikan `globalUsedPercent`
sebagaimana mestinya.

### Pool menampilkan "tidak ada data" untuk laju pemakaian

`computeBurnRate` memerlukan setidaknya 2 sampel historis. Pool baru tanpa pemanggilan
`consume` sebelumnya akan menampilkan `tokensPerSecond: 0` dan `timeToExhaustionMs: null`.

---

## Migrasi dari localStorage

Saat `/dashboard/costs/quota-share` pertama kali dimuat, hook `useLocalStoragePoolMigration`
memeriksa:

1. `localStorage.getItem("omniroute:quota-share:pools")` tidak kosong.
2. `GET /api/quota/pools` mengembalikan `[]` (DB kosong).

Jika keduanya benar, hook tersebut mengirim setiap pool lama secara batch ke `POST /api/quota/pools`,
lalu menghapus key localStorage. Migrasi ini idempoten: kondisi 2 mencegah
migrasi ulang.

---

## Klasifikasi Strategi Internal

`quota-share` adalah strategi perutean **khusus internal** (`INTERNAL_ROUTING_STRATEGY_VALUES` di
`src/shared/constants/routingStrategies.ts`). Strategi ini digunakan secara eksklusif oleh
kombinasi pool `qtSd/` yang dibuat oleh sistem dan sengaja dikecualikan dari `ROUTING_STRATEGY_VALUES` agar tidak pernah
muncul sebagai opsi yang dapat dipilih pengguna di UI atau API.

---

## Cakupan Pengujian

Dua lapisan cakupan otomatis disertakan bersama mesin quota-share:

| Suite               | Perintah                                                               | Yang dicakup                                                                                                                                                                                                             |
| :------------------ | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit (29 pengujian) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Penjadwal DRR, pembatasan saturasi, batas konkurensi, perhitungan fairShare, antrean backlog                                                                                                                             |
| Matriks integrasi   | `npm run test:combo:matrix`                                            | Keputusan perutean menyeluruh melalui pipeline kombinasi sebenarnya; keadilan DRR + penurunan prioritas akibat saturasi melalui seam aktif (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Matriks integrasi dijalankan di CI bersama seluruh 19 strategi publik. Suite unit
dapat dijalankan secara mandiri.

---

## Ringkasan Skema DB

Tiga tabel ditambahkan oleh migrasi `078`, `079`, dan `085`:

- `quota_pools` + `quota_allocations` — definisi pool dan alokasi per key.
- `quota_consumption` — penghitung bergulir dengan 2 bucket per `(apiKeyId, dimensionKey)`.
- `provider_plans` — penggantian manual paket penyedia (JSON dimensi per connectionId).

Semua tabel ditambahkan melalui migrasi `CREATE TABLE IF NOT EXISTS` yang idempoten.
