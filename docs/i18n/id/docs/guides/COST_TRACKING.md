# Cost & Spend Tracking (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Bagaimana OmniRoute memperkirakan, mencatat, dan melaporkan biaya setiap permintaan — serta mengapa angka pada
dasbor merupakan **pelacak penghematan**, bukan tagihan.

Lihat juga: [Panduan Pengguna](./USER_GUIDE.md) · [Galeri Fitur](./FEATURES.md)

---

## Apa itu (dan apa yang bukan)

OmniRoute mengatribusikan biaya USD per permintaan ke setiap penyelesaian dengan mengalikan jumlah
token dengan tarif harga model. Angka-angka ini digunakan oleh dasbor **Biaya**,
CLI `omniroute cost` / `omniroute usage`, ekspor CSV/JSON, dan anggaran per kunci API.

> **"Biaya" pada dasbor adalah pelacak penghematan, bukan tagihan.** OmniRoute tidak pernah menagih Anda
> — OmniRoute merutekan permintaan Anda ke penyedia yang telah Anda hubungkan (langganan Anda sendiri,
> tingkat gratis, dan kunci API). "Total biaya $290" yang seluruhnya terakumulasi pada model gratis
> berarti sekitar **$290 yang _tidak_ Anda bayarkan** kepada API berbayar. Angka tersebut merupakan _perkiraan_
> biaya yang akan dikenakan untuk lalu lintas yang sama berdasarkan harga standar, sehingga Anda dapat melihat
> di mana penggunaan Anda terkonsentrasi dan seberapa besar penghematan yang Anda peroleh dengan merutekan
> ke penyedia yang lebih murah/gratis.

Penjelasan ini dinyatakan secara langsung dalam [README](../../README.md) proyek ("'biaya' pada
dasbor adalah pelacak penghematan, bukan tagihan").

Karena angka tersebut merupakan perkiraan:

- Angka ini bergantung pada tabel harga yang dimiliki OmniRoute untuk setiap model. Model tanpa entri
  harga menyumbangkan biaya `0` (ditampilkan sebagai baris "Lama / Gratis" di penjelajah).
- Lalu lintas tingkat gratis dan langganan tetap mengakumulasi _perkiraan_ biaya — angka tersebut adalah
  jumlah yang Anda hemat, bukan jumlah yang harus dibayar.

---

## Cara biaya diperkirakan

### Sumber harga

Biaya berasal dari tabel harga yang ditentukan berdasarkan urutan prioritas berikut
([`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)):

1. **Penggantian oleh pengguna** — harga yang Anda tetapkan di dasbor / melalui `PATCH /api/pricing`.
2. **Harga eksternal yang disinkronkan** — diambil dari
   `model_prices_and_context_window.json` publik milik LiteLLM saat sinkronisasi diaktifkan (disimpan dalam namespace
   `pricing_synced` terpisah sehingga tidak pernah menimpa penggantian Anda).
3. **Nilai default yang dikodekan langsung** — disertakan bersama OmniRoute.

Sinkronisasi harga eksternal bersifat **opsional**, dan dinonaktifkan secara default. Variabel lingkungan yang relevan
(lihat [`.env.example`](../../.env.example)):

| Variabel lingkungan     | Default   | Tujuan                                                                |
| ----------------------- | --------- | --------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | Mengaktifkan sinkronisasi harga LiteLLM di latar belakang saat mulai. |
| `PRICING_SYNC_INTERVAL` | `86400`   | Interval sinkronisasi dalam **detik** (default harian).               |
| `PRICING_SYNC_SOURCES`  | `litellm` | Daftar sumber yang dipisahkan koma (saat ini hanya `litellm`).        |

### Rumus biaya

Biaya dihitung per permintaan berdasarkan jumlah token dan tarif per satu juta token dalam
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`):

- **Token input** (dikurangi pembacaan cache dan token pembuatan cache) × tarif `input`.
- **Token pembacaan cache** × tarif `cached` (kembali menggunakan tarif input jika tidak tersedia).
- **Token pembuatan cache** × tarif `cache_creation` (kembali menggunakan tarif input jika tidak tersedia).
- **Token output** × tarif `output`.
- **Token penalaran** × tarif `reasoning` (kembali menggunakan tarif output jika tidak tersedia).

Semua tarif ditafsirkan sebagai USD per 1.000.000 token. Tingkat layanan Codex "fast"/"priority" atau
"flex" menerapkan pengali biaya (`getCodexFastCostMultiplier`) — misalnya, flex
dikenai biaya dengan diskon token 50%, yang ditampilkan sebagai **penghematan flex** di dasbor.

Nama model dinormalisasi terlebih dahulu (prefiks jalur penyedia seperti `openai/` atau
`accounts/fireworks/models/` dihapus) sehingga baris historis tetap cocok dengan harga.

### Cara pengeluaran dicatat

- Biaya per permintaan dihitung setelah respons dan dicatat tanpa menunggu hasil agar tidak pernah
  menambah latensi bagi klien. Konsumsi kuota bersama dijadwalkan pada tick event loop berikutnya
  melalui [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- Pengeluaran kunci API ditampung sementara dan ditulis dalam batch oleh
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (interval penulisan default 60 detik,
  buffer 1.000 entri). Dapat disesuaikan melalui:

  | Variabel lingkungan                 | Default | Tujuan                                         |
  | ----------------------------------- | ------- | ---------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | Interval penulisan dalam milidetik.            |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | Entri maksimum yang ditampung sebelum ditulis. |

Angka biaya pada dasbor **tidak** dibaca dari nilai dolar per baris yang tersimpan — angka tersebut
dihitung ulang secara dinamis dari jumlah token dan tabel harga saat ini setiap kali endpoint
analitik dijalankan. Artinya, mengoreksi harga yang salah (dan melakukan sinkronisasi ulang) akan
memperbarui perkiraan biaya historis secara retroaktif.

---

## Dasbor: halaman Biaya

Halaman **Biaya** berada di `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Tampilan utamanya adalah tab **Ikhtisar Biaya**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
yang memuat semuanya dari `GET /api/usage/analytics`.

Yang ditampilkan:

- **Kartu pengeluaran** — estimasi pengeluaran untuk _Hari Ini (1d)_, _7 hari_, _30 hari_, dan rentang
  yang dipilih. Pemilih rentang: `7d`, `30d`, `90d`, `all`.
- **Metrik utama** — permintaan dalam rentang, penyedia aktif, model aktif, biaya rata-rata
  per permintaan.
- **Penjelajah Biaya** — tabel yang dapat diurutkan/difilter dan dikelompokkan berdasarkan **penyedia**, **model**,
  **kunci API**, **akun**, atau **tingkat layanan**, dengan biaya, permintaan, token, biaya rata-rata
  per permintaan, dan persentase dari total.
- **Penggunaan token** — total token / token input / token output dan rasio input:output.
- **Efisiensi perutean** — jumlah fallback, tingkat fallback, dan cakupan model yang diminta.
- **Prakiraan bulanan** — memproyeksikan pengeluaran akhir bulan dari rata-rata harian terkini.
- **Perbandingan periode** — persentase perubahan antara paruh pertama dan kedua dari rentang.
- **Bagan** — tren biaya harian, porsi penyedia (diagram lingkaran), penyedia teratas, model teratas, biaya
  berdasarkan kunci API, biaya berdasarkan akun, pola penggunaan mingguan, dan peta panas aktivitas.
- **Ekspor** — unduh rentang saat ini sebagai **CSV** atau **JSON** (tombol akan muncul
  setelah terdapat data biaya yang bukan nol).

Jika tidak ada lalu lintas berbayar, baris ditampilkan dengan label "Lama / Gratis", bukan `$0`,
yang mencerminkan model pelacak penghematan.

### Subhalaman Biaya terkait

Area Biaya juga mencakup (semuanya di bawah `/dashboard/costs/`):

- **Harga** (`/dashboard/costs/pricing`) — melihat dan mengganti harga per model (merender
  tab Harga bersama).
- **Anggaran** (`/dashboard/costs/budget`) — menetapkan batas pengeluaran per cakupan (merender tab
  Anggaran bersama).
- **Berbagi Kuota** (`/dashboard/costs/quota-share`) — kumpulan kuota bersama dan tampilan tingkat
  pemakaian.

---

## Endpoint API

Semua endpoint berikut memerlukan autentikasi manajemen (loopback/JWT, melalui `requireManagementAuth`), kecuali
jika dinyatakan lain.

### Analitik penggunaan & biaya

| Metode | Endpoint                 | Tujuan                                                                                                                                                                        |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Analitik biaya/penggunaan lengkap: ringkasan, tren harian, berdasarkan penyedia/model/kunci API/akun/tingkat. Kueri: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Pemanfaatan kuota per penyedia dari waktu ke waktu. Kueri: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                       |
| `GET`  | `/api/usage/history`     | Baris riwayat penggunaan mentah.                                                                                                                                              |
| `GET`  | `/api/usage/call-logs`   | Log panggilan per permintaan (model, token, biaya, latensi, status).                                                                                                          |
| `GET`  | `/api/usage/quota`       | Status kuota penyedia.                                                                                                                                                        |
| `GET`  | `/api/usage/proxy-logs`  | Log permintaan proksi.                                                                                                                                                        |

### Anggaran

| Metode | Endpoint                 | Tujuan                                                                                          |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Ringkasan biaya + pemeriksaan anggaran untuk satu kunci API (parameter kueri `apiKeyId` wajib). |
| `POST` | `/api/usage/budget`      | Menetapkan batas USD harian/mingguan/bulanan + ambang peringatan untuk sebuah kunci API.        |
| `GET`  | `/api/usage/budget/bulk` | Ringkasan anggaran secara massal di seluruh kunci API.                                          |

> API anggaran dicakup per **kunci API** (`apiKeyId`). Batas yang dikembalikan oleh
> `GET /api/usage/budget` mencakup `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> `warningThreshold`, dan total berjalan (`totalCostToday`, `totalCostMonth`, …).

### Harga

| Metode   | Endpoint                | Tujuan                                                                                                                     |
| -------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Harga gabungan saat ini (pengguna + tersinkronisasi + bawaan). Gunakan `?includeSources=1` untuk melihat sumber per entri. |
| `PATCH`  | `/api/pricing`          | Mengganti harga untuk `{ provider: { model: { input, output, cached, … } } }`.                                             |
| `DELETE` | `/api/pricing`          | Mengatur ulang harga ke nilai bawaan (opsional, dicakup berdasarkan `?provider=&model=`).                                  |
| `GET`    | `/api/pricing/defaults` | Menampilkan tarif fallback bawaan per 1 juta.                                                                              |
| `GET`    | `/api/pricing/models`   | Harga yang dikunci berdasarkan model.                                                                                      |
| `POST`   | `/api/pricing/sync`     | Memicu sinkronisasi manual dari sumber eksternal (LiteLLM).                                                                |
| `GET`    | `/api/pricing/sync`     | Status sinkronisasi saat ini.                                                                                              |
| `DELETE` | `/api/pricing/sync`     | Menghapus semua data harga yang telah disinkronkan.                                                                        |

### Endpoint lain yang berkaitan dengan biaya

| Metode | Endpoint                      | Tujuan                                                                 |
| ------ | ----------------------------- | ---------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Total token model gratis, penggunaan bulan ini, dan sisa kuota gratis. |
| `GET`  | `/api/quota/pools/[id]/usage` | Penggunaan untuk kumpulan kuota bersama.                               |

---

## CLI

CLI OmniRoute menyediakan perintah biaya, penggunaan, dan harga (didaftarkan di
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Laporan biaya yang diagregasi dari `/api/usage/analytics`.

```bash
omniroute cost                          # 30 hari terakhir, dikelompokkan berdasarkan penyedia
omniroute cost --period 7d              # 7 hari terakhir
omniroute cost --group-by model         # kelompokkan berdasarkan provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Kolom: grup, permintaan, token masuk/keluar, biaya (USD), dan % dari total. Baris total keseluruhan
dicetak di bagian akhir (disembunyikan dengan `--quiet` atau `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # ringkasan biaya per penyedia
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Anggaran
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` membaca `GET /api/pricing/defaults`. Untuk mengedit harga masing-masing model,
> gunakan halaman dasbor **Pricing** atau `PATCH /api/pricing`.

---

## Pemecahan Masalah

- **Semua biaya menampilkan $0 / "Legacy / Free".** Model yang digunakan tidak memiliki entri harga.
  Aktifkan sinkronisasi eksternal (`PRICING_SYNC_ENABLED=true`) dan jalankan `omniroute pricing sync`, atau
  tetapkan harga secara manual melalui halaman Pricing / `PATCH /api/pricing`.
- **Harga model historis tidak tepat.** Perbaiki harganya (timpa atau sinkronkan ulang) — biaya
  dihitung ulang dari jumlah token setiap kali analitik dibaca, sehingga estimasi diperbarui secara retroaktif.
- **Pengeluaran tertinggal dari waktu nyata.** Pengeluaran per kunci diproses secara batch; turunkan
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` jika Anda memerlukan angka yang lebih mutakhir.

---

Untuk mengetahui posisi fitur ini dalam dasbor secara keseluruhan, lihat [Panduan Pengguna](./USER_GUIDE.md) dan
[Galeri Fitur](./FEATURES.md).
