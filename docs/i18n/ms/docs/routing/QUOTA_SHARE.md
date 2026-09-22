# Quota Sharing Engine (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Rujukan dokumen**: `docs/routing/QUOTA_SHARE.md`
> Sebahagian daripada Kumpulan B (pelan 16 + 22).

---

## Gambaran keseluruhan

Enjin Perkongsian Kuota mengagihkan kuota berasaskan masa penyedia (contohnya, tetingkap
5 jam Codex, 1500 permintaan/j Kimi) secara adil merentasi berbilang kunci API yang berkongsi
sambungan yang sama.

**Masalah yang diselesaikannya:** OmniRoute memproksikan banyak kunci API kepada akaun
penyedia huluan yang sama. Tanpa logik perkongsian, lonjakan daripada kunci A boleh menghabiskan
kuota penyedia untuk jam tersebut, menyebabkan kunci B dan C disekat sehingga tetingkap ditetapkan semula.
Enjin ini mencegah perkara tersebut dengan:

1. Menjejaki penggunaan bergulir setiap kunci bagi setiap dimensi (%, permintaan, token, $).
2. Menggunakan algoritma perkongsian adil yang mengekalkan penggunaan sumber: sesuatu kunci boleh meminjam daripada bahagian
   yang tidak digunakan selagi kumpulan global belum tepu.
3. Menguatkuasakan hasilnya dalam laluan kritikal (`chatCore.ts`) sebelum permintaan
   sampai kepada pelaksana huluan.

---

## Algoritma: Perkongsian Adil yang Mengekalkan Penggunaan Sumber

Dilaksanakan dalam `src/lib/quota/fairShare.ts`.

### Mod

| Keadaan                                    | Mod         | Tingkah laku                                                       |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------ |
| `globalUsedPercent < saturationThreshold`  | **Pemurah** | Kunci boleh meminjam sehingga had global ditolak jumlah penggunaan |
| `globalUsedPercent >= saturationThreshold` | **Ketat**   | Kuatkuasakan bahagian adil individu secara ketat                   |

Nilai lalai `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Keputusan setiap dimensi

Bagi setiap dimensi aktif dalam kumpulan, enjin mengira:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = nilai bergulir semasa untuk kunci ini (daripada QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Kemudian:

- **`policy = hard`**: jika `consumed > fairShareAllowed` dan mod adalah ketat → **sekat**.
- **`policy = soft`**: jika `consumed > fairShareAllowed` dan mod adalah ketat → **kenakan penalti** (kurangkan keutamaan dalam gabungan; jangan sekali-kali menyekat sepenuhnya).
- **`policy = burst`**: benarkan selagi kapasiti global masih tersedia tanpa mengira bahagian adil.

### Had mutlak

`capValue` + `capUnit` pada sesuatu peruntukan ialah had maksimum mutlak yang tidak bergantung pada mod atau
dasar. Mana-mana dimensi dengan `consumed >= capValue` akan sentiasa **menyekat** permintaan.

### Semakan berbilang dimensi

Permintaan disekat jika **mana-mana** dimensi dalam kumpulan akan menyekatnya. Dimensi
adalah bebas — kehabisan 5h% tidak menjejaskan dimensi weekly%.

### Peminjaman

Dalam mod pemurah, kunci yang peruntukannya kurang digunakan boleh menggunakan lebihan daripada
bahagian kunci lain yang tidak diperuntukkan. Formulanya ialah:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

dengan `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Had global
(`limit` kumpulan bagi dimensi tersebut) sentiasa merupakan had maksimum mutlak.

---

## Pembilang Tetingkap Gelongsor

Dilaksanakan dalam `src/lib/quota/sqliteQuotaStore.ts` dan `redisQuotaStore.ts`.

Dua baldi bagi setiap `(apiKeyId, dimensionKey)`:

- `curr`: baldi semasa (`floor(nowMs / windowMs)`)
- `prev`: baldi sebelumnya (`curr - 1`)

Nilai bergulir berkesan:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Ketepatan**: ~99% tepat. Ralat adalah paling banyak 1% daripada saiz tetingkap pada
sempadan antara baldi (sememangnya wujud dalam penghampiran 2 baldi).

### Keserentakan

Pemacu SQLite: mutex dalam memori bagi setiap kunci `(apiKeyId | dimensionKey)` menghalang
keadaan perlumbaan baca-ubah-tulis. Corak ini menyerupai mekanisme anti-thundering-herd dalam `src/sse/services/auth.ts`.

Pemacu Redis: skrip Lua EVAL untuk penambahan atomik — dijalankan sebagai satu perintah Redis.

---

## Pemacu

### SQLite (lalai, pemasangan sifar)

- Jadual: `quota_consumption` (lihat migrasi `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Paling sesuai untuk penggunaan tika tunggal.
- Semua pengekalan data berada dalam DB SQLite OmniRoute sedia ada (`DATA_DIR/storage.sqlite`).

### Redis (pilihan, berbilang tika)

- Memerlukan pakej npm `ioredis`.
- Pembilang disimpan dalam Redis; metadata (kumpulan/peruntukan) masih disimpan dalam SQLite.
- Paling sesuai untuk penggunaan berbilang replika yang memerlukan pembilang dikongsi.

### Menukar pemacu

Melalui UI tetapan (`/dashboard/settings` → Storan Kuota), atau melalui pemboleh ubah persekitaran:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Tetapan DB mempunyai keutamaan berbanding persekitaran. Jika `driver=redis` tetapi URL tiada atau
`ioredis` tidak dipasang, kilang akan kembali menggunakan SQLite dan merekodkan amaran.

Urutan pemilihan pemacu:

1. Tetapan DB `quotaStore.driver`
2. Persekitaran `QUOTA_STORE_DRIVER`
3. Lalai: `sqlite`

---

## Berbilang Dimensi

Sebuah kumpulan boleh mempunyai berbilang dimensi. Setiap dimensi adalah bebas:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // had maksimum kumpulan global untuk dimensi ini
}
```

**Contoh: Pelan Codex** (5h% + mingguan%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Sesuatu permintaan mesti memenuhi semua dimensi untuk dibenarkan.

---

## Penyelesai Pelan

Dilaksanakan dalam `src/lib/quota/planResolver.ts`.

Keutamaan (tertinggi hingga terendah):

1. **Penggantian manual DB** — jadual `provider_plans`, bagi setiap `connectionId`.
2. **Katalog yang diketahui** — `src/lib/quota/planRegistry.ts` (data sahaja).
3. **Pelan kosong** — tiada dimensi, konfigurasi manual diperlukan.

### Katalog yang diketahui

| Penyedia              | Dimensi                                                       |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, tidak diketahui), `tokens/weekly`       |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Tiada lalai — konfigurasi manual diperlukan                   |

---

## Penyepaduan Saluran Paip

### Cangkuk PRE (`open-sse/handlers/chatCore.ts`)

Dijalankan sebelum pelaksana huluan, selepas semakan pengesahan dan dasar:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() bagi setiap dimensi
      → fairShare.decideFairShare()
      → jika disekat → kembalikan 429 (buildErrorBody, Peraturan Tegas #12)
      → jika dibenarkan + dinyahsutamakan → tetapkan quotaSoftPenalty=true pada calon
  → executor.execute()
```

**Benarkan ketika gagal**: jika `enforceQuotaShare` menghasilkan ralat, permintaan dibenarkan diteruskan
dengan log `pino.warn`. Ini menghalang pepijat enjin kuota daripada menyekat semua
trafik.

### Cangkuk POST (rekod penggunaan)

Selepas respons yang berjaya:

```
pelaksana mengembalikan kejayaan
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() bagi setiap dimensi
      → benarkan ketika gagal: ralat direkodkan sebagai pino.warn, tidak sekali-kali disebarkan kepada klien
```

**Nota hanyutan**: jika `consume` gagal selepas respons, pembilang bergerak akan terkurang kiraan.
Isyarat ketepuan daripada penyedia (cth. `anthropic-ratelimit-unified-5h-utilization`)
membetulkan anggaran global pada permintaan seterusnya.

### Penalti ringan gabungan (`open-sse/services/combo.ts`)

Apabila `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // lalai 0.7
}
```

Penalti digunakan selepas semua faktor pemarkahan lain. Ia mengurangkan kebarangkalian
gabungan automatik memilih kunci tepu tanpa menyekatnya secara tegas.

---

## Panduan UI

### `/dashboard/costs/quota-share` — Halaman kumpulan utama

Komponen (semuanya dalam `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponen               | Tujuan                                                                        |
| ---------------------- | ----------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Kad pengenalan yang menerangkan perkongsian kuota kepada pengguna baharu      |
| `CreatePoolModal`      | Cipta kumpulan kuota baharu (sambungan + nama + peruntukan awal)              |
| `PoolCard`             | Ringkasan setiap kumpulan: nama, sambungan, bilangan peruntukan               |
| `DimensionBar`         | Bar bertindan setiap dimensi: bahagian setiap kunci + penggunaan global       |
| `AllocationTable`      | Jadual dengan penggunaan, bahagian saksama, defisit/lebihan, tanda peminjaman |
| `BurnRateChart`        | Carta garis kadar penggunaan EMA (Recharts malas melalui `dynamic()`)         |
| `EditAllocationsModal` | Edit wajaran, had dan dasar peruntukan untuk sesuatu kumpulan                 |

Cangkuk halaman:

- `usePools` — mengambil `GET /api/quota/pools` setiap 30 saat.
- `usePoolUsage` — mengambil `GET /api/quota/pools/[id]/usage` apabila diperlukan.
- `useLocalStoragePoolMigration` — dijalankan sekali semasa pemasangan untuk memindahkan data LS legasi.

### `/dashboard/costs/quota-share/plans` — Konfigurasi pelan penyedia

- `ProviderPlanConfigClient.tsx`: menu juntai bawah untuk memilih penyedia, melihat
  pelan yang telah ditentukan (secara automatik daripada katalog atau penggantian manual), dan mengedit dimensi.
- Perubahan ditulis ke `PUT /api/quota/plans/[connectionId]`.
- Pemadaman mengembalikan tetapan kepada katalog atau pelan kosong.

---

## Pemboleh Ubah Persekitaran

| Pemboleh ubah                      | Lalai      | Penerangan                                                       |
| ---------------------------------- | ---------- | ---------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`   | Pemacu untuk digunakan: `sqlite` atau `redis`                    |
| `QUOTA_STORE_REDIS_URL`            | _(kosong)_ | URL Redis, cth. `redis://localhost:6379`                         |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`      | 0..1; `>= threshold` mengaktifkan mod ketat                      |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`      | 0..1; pengganda untuk skor gabungan dasar lembut                 |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`       | Bilangan hari sebelum GC membuang bakul `quota_consumption` lama |

Tetapan DB (`quotaStore.*`) mengatasi pemboleh ubah persekitaran.

---

## Penyelesaian Masalah

### Redis dikonfigurasi tetapi tidak bersambung

Pastikan `ioredis` dipasang (`npm ls ioredis`) dan `QUOTA_STORE_REDIS_URL`
boleh dicapai. Jika sambungan gagal, kilang akan kembali menggunakan SQLite (direkodkan pada
`warn`).

### `peek` mengembalikan data lapuk / gagal-terbuka

Jika `peek` menghasilkan ralat, `enforceQuotaShare` menganggap hasil tersebut sebagai "benarkan" (gagal-terbuka).
Semak log `pino` untuk entri `quota:enforce` dan `quota:factory` bagi mengenal pasti
punca utama.

### Hanyutan pembilang penggunaan

Jika penggunaan sebenar penyedia berbeza daripada pembilang, keadaan ini dijangka — tetingkap
gelongsor 2 bakul mempunyai ralat ~1% pada sempadan tetingkap, dan `consume`
dijalankan tanpa menunggu hasil selepas respons. Isyarat ketepuan (`saturationSignals.ts`)
membaca penggunaan sebenar penyedia dengan TTL 30 saat dan melaraskan `globalUsedPercent`
dengan sewajarnya.

### Kumpulan menunjukkan "tiada data" untuk kadar penggunaan

`computeBurnRate` memerlukan sekurang-kurangnya 2 sampel sejarah. Kumpulan baharu tanpa
panggilan `consume` terdahulu akan menunjukkan `tokensPerSecond: 0` dan `timeToExhaustionMs: null`.

---

## Migrasi daripada localStorage

Apabila `/dashboard/costs/quota-share` dimuatkan buat kali pertama, hook `useLocalStoragePoolMigration`
menyemak:

1. `localStorage.getItem("omniroute:quota-share:pools")` tidak kosong.
2. `GET /api/quota/pools` mengembalikan `[]` (DB kosong).

Jika kedua-duanya benar, ia menghantar setiap pool lama kepada `POST /api/quota/pools` secara kelompok,
kemudian mengalih keluar kunci localStorage. Migrasi ini bersifat idempoten: syarat 2 menghalang
migrasi semula.

---

## Pengelasan Strategi Dalaman

`quota-share` ialah strategi penghalaan **dalaman sahaja** (`INTERNAL_ROUTING_STRATEGY_VALUES` dalam
`src/shared/constants/routingStrategies.ts`). Ia digunakan secara eksklusif oleh gabungan pool `qtSd/`
yang dijana oleh sistem dan sengaja dikecualikan daripada `ROUTING_STRATEGY_VALUES` supaya ia tidak pernah
muncul sebagai pilihan yang boleh dipilih oleh pengguna dalam UI atau API.

---

## Liputan Ujian

Dua lapisan liputan automatik disertakan bersama enjin quota-share:

| Suit              | Perintah                                                               | Perkara yang diliputi                                                                                                                                                                                                                     |
| :---------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit (29 ujian)   | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Penjadual DRR, pengawalan ketepuan, had keserentakan, pengiraan fairShare, penggiliran baris gilir tunggakan                                                                                                                              |
| Matriks integrasi | `npm run test:combo:matrix`                                            | Keputusan penghalaan hujung ke hujung melalui saluran gabungan sebenar; keadilan DRR + penurunan keutamaan akibat ketepuan melalui titik integrasi langsung (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Matriks integrasi dijalankan dalam CI bersama kesemua 19 strategi awam. Suit unit
boleh dijalankan secara kendiri.

---

## Ringkasan Skema DB

Tiga jadual ditambahkan melalui migrasi `078`, `079` dan `085`:

- `quota_pools` + `quota_allocations` — takrifan pool dan peruntukan bagi setiap kunci.
- `quota_consumption` — pembilang 2 baldi bergulir bagi setiap `(apiKeyId, dimensionKey)`.
- `provider_plans` — penggantian pelan penyedia secara manual (dimensi JSON bagi setiap connectionId).

Semua jadual ditambahkan melalui migrasi `CREATE TABLE IF NOT EXISTS` yang idempoten.
