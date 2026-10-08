# Log export (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Ekspor log panggilan OmniRoute secara kontinu dan inkremental ke penyimpanan analitik eksternal.

Tab dasbor Logs menyimpan riwayat permintaan di SQLite (`call_logs`), yang dibatasi oleh
rotasi dan retensi. Ekspor log mengirimkan kumpulan catatan yang sama secara terjadwal agar dapat
bertahan lebih lama daripada basis data lokal dan digabungkan dengan data lain. BigQuery adalah
tujuan pertama; pipeline ini merupakan registry, sehingga tujuan lain dapat ditambahkan.

---

## 1. Cara kerjanya

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (kumpulan bidang tab Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Jadwal** — satu cron job `JobRegistry`, `log_export`, dengan nilai default `0 * * * *` (setiap jam,
  UTC). Didaftarkan di `src/lib/initCloudSync.ts`; dapat ditimpa dengan `OMNIROUTE_LOG_EXPORT_CRON`.
  Setiap tick menguras setiap tujuan yang **diaktifkan**, secara berurutan.
- **Cursor** — `call_logs.rowid` implisit milik SQLite, yang dipertahankan per tujuan di
  `log_export_destinations.cursor_row_id`. `timestamp` sengaja tidak digunakan sebagai cursor: pemanggil
  dapat memberikan nilainya sendiri, sehingga permintaan yang lambat dapat ditulis setelah permintaan lebih cepat yang dimulai
  kemudian, dan cursor berbasis timestamp akan melewatkannya.
- **Batching** — `batch_size` baris per permintaan (default 500), `max_rows_per_run` baris per eksekusi
  (default 10000), sehingga backlog yang besar dikuras dalam beberapa tick alih-alih memblokir satu eksekusi.
- **Pengiriman** — cursor hanya bergerak maju setelah `send()` selesai. Batch yang gagal membiarkan
  cursor tetap di posisinya, sehingga baris yang sama akan dicoba kembali pada eksekusi berikutnya. Jaminannya adalah
  setidaknya satu kali pengiriman ditambah deduplikasi di sisi tujuan, bukan tepat satu kali yang sesungguhnya: BigQuery memberi
  kunci pada setiap baris berdasarkan ID log panggilan, yang dipatuhinya berdasarkan upaya terbaik dalam jendela deduplikasinya sendiri.
- **Pelindung tumpang tindih** — tick cron dan `POST .../run` dapat berjalan bersamaan. Tujuan yang
  sedang dikuras akan dilewati alih-alih dikuras dua kali (`skipped: true` dalam hasil eksekusi),
  sehingga eksekusi bersamaan tidak dapat mengirim ulang batch atau memundurkan cursor.
- **Pemulihan setelah purge** — jika `cursor_row_id` berakhir di atas `MAX(rowid)` (seluruh tabel
  telah dibersihkan dan rowid dimulai ulang), runner mengembalikannya ke 0 agar tidak kehilangan visibilitas secara permanen.

### Payload (prompt dan completion)

Secara default, ekspor hanya membawa bidang ringkasan yang ditampilkan oleh **daftar** Logs. Mengaktifkan
**Ekspor prompt dan respons** (`includeBodies`) juga mengirimkan hal-hal yang ditampilkan panel **detail**
Logs untuk setiap panggilan:

| Bidang                           | Isinya                                                             |
| -------------------------------- | ------------------------------------------------------------------ |
| `request_body` / `response_body` | Payload panggilan sebagaimana dirender oleh dasbor                 |
| `pipeline_route_decision`        | Target dan model yang dipilih router                               |
| `pipeline_client_request`        | Permintaan mentah persis seperti yang dikirim klien                |
| `pipeline_openai_request`        | Setelah diterjemahkan ke format internal OpenAI                    |
| `pipeline_provider_request`      | Sebagaimana benar-benar dikirim ke upstream, dalam dialek penyedia |
| `pipeline_provider_response`     | Respons mentah dari upstream                                       |
| `pipeline_client_response`       | Yang dikembalikan kepada pemanggil                                 |
| `pipeline_error`                 | Detail error tingkat pipeline untuk panggilan yang gagal           |
| `bodies_truncated`               | True ketika salah satu bidang di atas mencapai `maxBodyBytes`      |

Ini merupakan konten prompt, sehingga **dinonaktifkan secara default** dan sengaja menjadi pilihan per tujuan.
Yang dikirim adalah apa yang ditampilkan dasbor, karena keduanya membaca melalui `getCallLogById`: payload
telah disanitasi dari PII dan disunting untuk menghapus informasi rahasia ketika ditulis, dan panggilan yang dibuat dengan
kunci API `noLog` sama sekali tidak menyimpan payload, sehingga tidak ada yang dapat diekspor.

Payload dibaca per baris dari artefak sistem berkas, sehingga hidrasi hanya dijalankan untuk tujuan
yang memintanya. Baris dengan artefak yang hilang atau rusak akan mengekspor ringkasannya dengan
payload null alih-alih menggagalkan batch dan membuat cursor terhenti.

`maxBodyBytes` (default 262144) membatasi setiap bidang. Payload yang lebih panjang akan **dipotong, bukan
dihapus** — prompt yang terpotong masih menjawab "apa yang ditanyakan" — dan baris tersebut ditandai dengan
`bodies_truncated`. Delta yang dialirkan chunk demi chunk tidak diekspor; respons yang telah dirangkai
sudah tersedia dalam `pipeline_provider_response` dan `pipeline_client_response`.

---

## 2. File

| Bagian                | Lokasi                                       |
| --------------------- | -------------------------------------------- |
| Kontrak tujuan        | `src/lib/logExport/types.ts`                 |
| Registri              | `src/lib/logExport/registry.ts`              |
| Penanganan rahasia    | `src/lib/logExport/secrets.ts`               |
| Runner (loop cursor)  | `src/lib/logExport/runner.ts`                |
| Proyeksi API          | `src/lib/logExport/presenter.ts`             |
| Tujuan BigQuery       | `src/lib/logExport/destinations/bigquery.ts` |
| Autentikasi SA Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Sumber log panggilan  | `src/lib/usage/callLogExportSource.ts`       |
| Persistensi           | `src/lib/db/logExportDestinations.ts`        |
| Tugas cron            | `src/lib/jobs/logExportJob.ts`               |
| Lapisan REST          | `src/app/api/log-export/`                    |
| Halaman dasbor        | `src/app/(dashboard)/dashboard/log-export/`  |

Skema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Semua rute diautentikasi untuk manajemen (`requireManagementAuth`). Rahasia tidak pernah dikembalikan:
rahasia yang disimpan dikembalikan sebagai nilai literal `__stored__`, dan mengirim kembali nilai tersebut saat pembaruan
akan mempertahankan kredensial yang tersimpan.

Membuat atau memperbarui tujuan yang tipenya mendeklarasikan rahasia **memerlukan
`STORAGE_ENCRYPTION_KEY`**. Tanpanya, `encrypt()` hanya meneruskan nilai secara diam-diam, sehingga penulisan
ditolak dengan respons 400 alih-alih menyimpan kredensial ke SQLite sebagai teks biasa (pengamanan yang sama juga
diterapkan oleh webhook Telegram).

| Metode   | Jalur                                    | Tujuan                                                             |
| -------- | ---------------------------------------- | ------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Tipe tujuan + daftar bidang konfigurasinya                         |
| `GET`    | `/api/log-export/destinations`           | Mencantumkan tujuan (rahasia disamarkan)                           |
| `POST`   | `/api/log-export/destinations`           | Membuat tujuan                                                     |
| `GET`    | `/api/log-export/destinations/{id}`      | Membaca satu tujuan                                                |
| `PUT`    | `/api/log-export/destinations/{id}`      | Memperbarui nama / status aktif / konfigurasi / batch              |
| `DELETE` | `/api/log-export/destinations/{id}`      | Menghapus                                                          |
| `POST`   | `/api/log-export/destinations/{id}/test` | Menguji kredensial, tanpa menulis apa pun                          |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Menguras sekarang, melalui jalur yang sama dengan proses terjadwal |
| `GET`    | `/api/log-export/status`                 | Status cron, proses terbaru, backlog per target                    |

`GET /api/log-export/types` memungkinkan UI bersifat generik: formulir dasbor dirender dari
deskriptor bidang yang dikembalikan, sehingga tujuan baru tidak memerlukan perubahan UI.

---

## 4. Tujuan BigQuery

Kunci konfigurasi (`type: "bigquery"`):

| Kunci                | Catatan                                                                          |
| -------------------- | -------------------------------------------------------------------------------- |
| `projectId`          | Proyek GCP yang menampung dataset                                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                  |
| `location`           | Hanya digunakan saat dataset perlu dibuat (default `EU`)                         |
| `serviceAccountJson` | Kunci akun layanan. Rahasia: dienkripsi saat disimpan, tidak pernah dikembalikan |
| `autoCreate`         | Membuat dataset dan tabel pada ekspor pertama (default `true`)                   |

Akun layanan memerlukan `bigquery.tables.updateData` pada tabel target, ditambah
`bigquery.datasets.create` / `bigquery.tables.create` saat `autoCreate` diaktifkan.

Batch yang dikonfigurasi adalah unit **cursor**, bukan unit HTTP: `send()` membaginya menjadi beberapa panggilan insertAll
dengan maksimal 500 baris, sehingga `batch_size` yang besar tidak akan melampaui batas permintaan 10 MB milik BigQuery.
Status sementara (408/429/500/502/503/504) dicoba ulang hingga tiga kali dengan exponential
backoff, menggunakan kembali insertIds yang sama; kegagalan autentikasi dan skema langsung melempar error pada percobaan pertama
alih-alih menghabiskan proses.

Tabel yang baru dibuat belum langsung terlihat oleh endpoint streaming, yang akan merespons
404 selama beberapa detik. Respons 404 tersebut dicoba ulang, tetapi **hanya ketika proses ini membuat tabel** —
tabel yang benar-benar tidak ada tetap langsung menyebabkan kegagalan. Perhatikan bahwa membuat ulang tabel dengan nama yang
baru saja dihapus akan membuat BigQuery menolak streaming insert selama beberapa menit; hal ini merupakan
karakteristik penghapusan-lalu-pembuatan-ulang, jadi sebaiknya gunakan nama tabel baru daripada menghapus dan menambahkannya kembali.

**Kegagalan parsial diterima sebagai HTTP 200 dengan `insertErrors[]` yang tidak kosong.** Kondisi ini diperlakukan sebagai
kegagalan dan melempar error, sehingga cursor tidak bergerak melewati baris yang tidak pernah
diterima BigQuery; `tests/unit/log-export-bigquery.test.ts` memastikan perilaku ini.

Transport menggunakan REST biasa — assertion RS256 yang ditandatangani sendiri ditukarkan dengan token akses di
`https://oauth2.googleapis.com/token`, lalu baris dikirim ke `tabledata.insertAll`. Tidak ada Google SDK yang
disertakan. Token akses disimpan dalam cache di dalam proses untuk setiap pasangan (akun layanan, scope).

Tabel yang dibuat memiliki satu kolom untuk setiap bidang tab Logs ditambah `exported_at`, dan disusun sesuai
cara log panggilan sebenarnya dikueri:

- **Dipartisi per hari berdasarkan `timestamp`**, sehingga kueri yang dibatasi berdasarkan tanggal hanya memindai hari-hari tersebut.
- **Dikelompokkan berdasarkan `api_key_name`, `provider`, `model`, `status`** (dalam urutan tersebut), sehingga pemfilteran berdasarkan
  siapa yang menjalankannya, ke mana permintaan diteruskan, atau apakah terjadi kegagalan akan memangkas blok di dalam setiap partisi. BigQuery
  mengizinkan maksimal empat kolom pengelompokan dan urutannya penting: filter hanya pada `api_key_name`
  dapat memangkas, sedangkan filter hanya pada `status` tidak.
- **Retensi partisi opsional** melalui `partitionExpirationDays` (0 menyimpan semuanya), diterapkan
  saat tabel dibuat.

Kedua pengaturan diterapkan saat pembuatan. Tabel yang sudah ada tetap mempertahankan tata letak yang dimilikinya, jadi
arahkan tujuan ke id tabel baru jika Anda ingin menerapkannya.

`tests/unit/log-export-bigquery.test.ts` memastikan mapper dan skema tabel tetap
selaras, sehingga kolom log panggilan baru tidak dapat dihilangkan secara diam-diam saat diekspor.

Batch dipecah berdasarkan **baik** jumlah baris **maupun** byte yang diserialisasi. Jumlah baris saja tidak cukup
setelah payload diekspor: 500 baris yang berisi prompt dapat berukuran puluhan megabyte, dan insertAll
menolak permintaan yang melebihi 10 MB. Chunk ditutup saat mencapai 500 baris atau 9 MB, mana pun yang tercapai lebih dahulu.

---

## 5. Menambahkan destinasi

1. Buat `src/lib/logExport/destinations/<name>.ts` yang mengekspor `LogExportDestinationType`:
   sebuah `configSchema` Zod, array deskriptor `fields` untuk UI, `secretFields`, dan
   `createClient(config)` yang mengembalikan `test()` / `prepare()` / `send(records)`.
2. Tambahkan ke array `DESTINATIONS` di `src/lib/logExport/registry.ts`.
3. Tulis pengujian di bawah `tests/unit/`.

Itulah keseluruhan perubahannya: persistensi, cron job, lapisan REST, enkripsi rahasia, dan
formulir dasbor semuanya membaca registri.

Dua aturan untuk destinasi baru:

- `send()` **harus melempar error** saat terjadi kegagalan parsial. Jika berhasil diselesaikan, artinya "destinasi memiliki baris-baris ini",
  dan kursor akan bergerak melewatinya secara permanen.
- Destinasi yang menerima URL dari pengguna harus memvalidasinya melalui
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) sebelum melakukan pengambilan,
  dengan cara yang sama seperti webhook. BigQuery tidak memerlukan ini: host-nya adalah konstanta.

---

## 6. Mengoperasikannya

- **Dasbor**: Integrasi → Ekspor log. Tambahkan destinasi, jalankan **Uji** untuk memeriksa kredensial
  tanpa menulis baris, lalu aktifkan.
- **Antrean tertunda**: setiap kartu destinasi menampilkan baris tertunda dan kursor; `GET
/api/log-export/status` mengembalikan angka yang sama beserta 20 eksekusi job terakhir.
- **Destinasi yang gagal tidak menyebabkan destinasi lain gagal** — ringkasan eksekusi mencatat status per destinasi
  dalam `last_status` / `last_error`, dan riwayat eksekusi job menyimpan hasil agregat.
- **Menghapus destinasi akan menghapus kursornya.** Menambahkannya kembali akan dimulai dari log panggilan tersimpan
  yang paling lama, sehingga baris yang mungkin sudah dimiliki destinasi akan dikirim ulang. Di BigQuery, `insertId`
  per baris hanya menangani hal tersebut dalam jangka waktu deduplikasi milik BigQuery, jadi sebaiknya
  nonaktifkan destinasi daripada menghapusnya.
