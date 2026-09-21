# Log export (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Eksport berterusan dan berperingkat bagi log panggilan OmniRoute ke stor analitik luaran.

Tab papan pemuka Logs menyimpan sejarah permintaan dalam SQLite (`call_logs`), yang dihadkan oleh
putaran dan pengekalan. Eksport log menghantar set rekod yang sama mengikut jadual supaya ia dapat kekal
lebih lama daripada pangkalan data setempat dan digabungkan dengan data lain. BigQuery ialah destinasi
pertama; saluran paip ini merupakan sebuah registri, jadi lebih banyak destinasi boleh ditambah.

---

## 1. Cara ia berfungsi

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (set medan tab Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Jadual** — satu tugas cron `JobRegistry`, `log_export`, dengan nilai lalai `0 * * * *` (setiap jam,
  UTC). Didaftarkan dalam `src/lib/initCloudSync.ts`; boleh ditindih dengan `OMNIROUTE_LOG_EXPORT_CRON`.
  Setiap detik menjalankan eksport bagi setiap destinasi yang **didayakan**, secara berurutan.
- **Kursor** — `call_logs.rowid` tersirat SQLite, dikekalkan bagi setiap destinasi dalam
  `log_export_destinations.cursor_row_id`. `timestamp` sengaja tidak digunakan sebagai kursor: pemanggil
  boleh membekalkan nilainya sendiri, maka permintaan yang perlahan boleh ditulis selepas permintaan lebih pantas
  yang bermula kemudian, dan kursor cap masa akan melangkaunya.
- **Pengelompokan** — `batch_size` baris bagi setiap permintaan (lalai 500), `max_rows_per_run` baris bagi setiap pelaksanaan
  (lalai 10000) supaya tunggakan besar diproses sepanjang beberapa detik dan bukannya menyekat satu pelaksanaan.
- **Penghantaran** — kursor hanya bergerak ke hadapan selepas `send()` selesai. Kelompok yang gagal menyebabkan
  kursor kekal pada kedudukan asal, maka baris yang sama dicuba semula pada pelaksanaan seterusnya. Jaminannya ialah
  sekurang-kurangnya-sekali serta penyahduplikasian pada pihak destinasi, bukannya tepat-sekali sebenar: BigQuery menggunakan id log
  panggilan sebagai kunci bagi setiap baris, yang dipatuhinya berdasarkan usaha terbaik dalam tempoh penyahduplikasiannya sendiri.
- **Pelindung pertindihan** — detik cron dan `POST .../run` boleh berlaku serentak. Destinasi
  yang sedang diproses akan dilangkau dan bukannya diproses dua kali (`skipped: true` dalam hasil pelaksanaan),
  supaya pelaksanaan serentak tidak boleh menghantar semula sesuatu kelompok atau mengundurkan kursor.
- **Pemulihan pengosongan** — jika `cursor_row_id` akhirnya melebihi `MAX(rowid)` (keseluruhan jadual telah
  dikosongkan dan rowid dimulakan semula), pelaksana mengundurkan kursor kepada 0 agar tidak terus gagal mengesan rekod baharu.

### Muatan (gesaan dan pelengkapan)

Secara lalai, eksport hanya membawa medan ringkasan yang ditunjukkan oleh **senarai** Logs. Menghidupkan
**Eksport gesaan dan respons** (`includeBodies`) akan turut menghantar perkara yang ditunjukkan oleh anak tetingkap **butiran**
Logs bagi setiap panggilan:

| Medan                            | Kandungannya                                                  |
| -------------------------------- | ------------------------------------------------------------- |
| `request_body` / `response_body` | Muatan panggilan sebagaimana dipaparkan oleh papan pemuka     |
| `pipeline_route_decision`        | Sasaran dan model yang dipilih oleh penghala                  |
| `pipeline_client_request`        | Permintaan mentah tepat sebagaimana dihantar oleh klien       |
| `pipeline_openai_request`        | Selepas diterjemahkan kepada bentuk OpenAI dalaman            |
| `pipeline_provider_request`      | Sebagaimana dihantar ke huluan, dalam dialek penyedia         |
| `pipeline_provider_response`     | Respons huluan mentah                                         |
| `pipeline_client_response`       | Perkara yang dikembalikan kepada pemanggil                    |
| `pipeline_error`                 | Butiran ralat peringkat saluran paip bagi panggilan gagal     |
| `bodies_truncated`               | Benar apabila mana-mana medan di atas mencapai `maxBodyBytes` |

Ini ialah kandungan gesaan, maka ia **dimatikan secara lalai** dan sengaja dijadikan pilihan bagi setiap destinasi.
Perkara yang dihantar ialah perkara yang ditunjukkan oleh papan pemuka kerana kedua-duanya membaca melalui `getCallLogById`: muatan telah
dinyahkenal pasti daripada PII dan rahsia disunting ketika ia ditulis, manakala panggilan yang dibuat dengan
kunci API `noLog` langsung tidak menyimpan muatan, maka tiada apa-apa untuk dieksport.

Muatan dibaca bagi setiap baris daripada artifak sistem fail, maka penghidratan hanya berjalan untuk destinasi
yang memintanya. Baris yang artifaknya hilang atau rosak akan mengeksport ringkasannya dengan muatan
null dan bukannya menggagalkan kelompok serta menyebabkan kursor tersekat.

`maxBodyBytes` (lalai 262144) mengehadkan setiap medan. Muatan yang lebih panjang **dipenggal dan bukannya
digugurkan** — gesaan yang dipotong masih menjawab "apa yang ditanyakan" — dan baris tersebut ditandakan dengan
`bodies_truncated`. Delta yang distrim ketulan demi ketulan tidak dieksport; respons yang telah dihimpunkan
sudah tersedia dalam `pipeline_provider_response` dan `pipeline_client_response`.

---

## 2. Fail

| Komponen                  | Lokasi                                       |
| ------------------------- | -------------------------------------------- |
| Kontrak destinasi         | `src/lib/logExport/types.ts`                 |
| Daftar                    | `src/lib/logExport/registry.ts`              |
| Pengendalian rahsia       | `src/lib/logExport/secrets.ts`               |
| Pelaksana (gelung kursor) | `src/lib/logExport/runner.ts`                |
| Unjuran API               | `src/lib/logExport/presenter.ts`             |
| Destinasi BigQuery        | `src/lib/logExport/destinations/bigquery.ts` |
| Pengesahan Google SA      | `src/lib/logExport/googleServiceAccount.ts`  |
| Sumber log panggilan      | `src/lib/usage/callLogExportSource.ts`       |
| Penyimpanan berterusan    | `src/lib/db/logExportDestinations.ts`        |
| Tugas cron                | `src/lib/jobs/logExportJob.ts`               |
| Lapisan REST              | `src/app/api/log-export/`                    |
| Halaman papan pemuka      | `src/app/(dashboard)/dashboard/log-export/`  |

Skema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Semua laluan disahkan untuk pengurusan (`requireManagementAuth`). Rahsia tidak pernah dikembalikan:
rahsia yang disimpan dikembalikan sebagai nilai literal `__stored__`, dan menghantar semula nilai tersebut semasa kemas kini
akan mengekalkan kelayakan yang disimpan.

Mencipta atau mengemas kini destinasi yang jenisnya mengisytiharkan rahsia **memerlukan
`STORAGE_ENCRYPTION_KEY`**. Tanpanya, `encrypt()` hanya meneruskan nilai secara senyap, maka operasi penulisan
ditolak dengan 400 dan bukannya meletakkan kelayakan ke dalam SQLite sebagai teks biasa (perlindungan yang sama
digunakan oleh webhook Telegram).

| Kaedah   | Laluan                                   | Tujuan                                                           |
| -------- | ---------------------------------------- | ---------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Jenis destinasi + senarai medan konfigurasinya                   |
| `GET`    | `/api/log-export/destinations`           | Senaraikan destinasi (rahsia disunting)                          |
| `POST`   | `/api/log-export/destinations`           | Cipta destinasi                                                  |
| `GET`    | `/api/log-export/destinations/{id}`      | Baca satu destinasi                                              |
| `PUT`    | `/api/log-export/destinations/{id}`      | Kemas kini nama / didayakan / konfigurasi / pengumpulan          |
| `DELETE` | `/api/log-export/destinations/{id}`      | Padam                                                            |
| `POST`   | `/api/log-export/destinations/{id}/test` | Uji kelayakan, tanpa menulis apa-apa                             |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Kosongkan sekarang, laluan sama seperti pelaksanaan berjadual    |
| `GET`    | `/api/log-export/status`                 | Keadaan cron, pelaksanaan terkini, tunggakan bagi setiap sasaran |

`GET /api/log-export/types` menjadikan UI generik: borang papan pemuka dipaparkan berdasarkan
penerang medan yang dikembalikan, maka destinasi baharu tidak memerlukan perubahan UI.

---

## 4. Destinasi BigQuery

Kunci konfigurasi (`type: "bigquery"`):

| Kunci                | Catatan                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------- |
| `projectId`          | Projek GCP yang mengandungi set data                                                    |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                                         |
| `location`           | Hanya digunakan apabila set data perlu dicipta (lalai `EU`)                             |
| `serviceAccountJson` | Kunci akaun perkhidmatan. Rahsia: disulitkan semasa disimpan, tidak pernah dikembalikan |
| `autoCreate`         | Cipta set data dan jadual pada eksport pertama (lalai `true`)                           |

Akaun perkhidmatan memerlukan `bigquery.tables.updateData` pada jadual sasaran, serta
`bigquery.datasets.create` / `bigquery.tables.create` apabila `autoCreate` dihidupkan.

Kelompok yang dikonfigurasikan ialah unit **kursor**, bukannya unit HTTP: `send()` membahagikannya kepada panggilan insertAll
dengan maksimum 500 baris, maka `batch_size` yang besar tidak akan melanggar had permintaan 10 MB BigQuery.
Status sementara (408/429/500/502/503/504) dicuba semula sehingga tiga kali dengan sela masa
eksponen, menggunakan semula insertIds yang sama; kegagalan pengesahan dan skema akan mencetuskan ralat pada percubaan pertama
dan bukannya menghabiskan pelaksanaan tersebut.

Jadual yang baru sahaja dicipta belum kelihatan kepada titik akhir penstriman, yang memberikan respons
404 selama beberapa saat. 404 tersebut dicuba semula, tetapi **hanya apabila pelaksanaan ini mencipta jadual** —
jadual yang benar-benar tiada tetap gagal serta-merta. Ambil perhatian bahawa mencipta semula jadual menggunakan nama yang
baru-baru ini dipadam menyebabkan BigQuery menolak sisipan penstriman selama beberapa minit; ini ialah
sifat operasi padam-kemudian-cipta-semula, maka gunakan nama jadual baharu dan bukannya menggugurkan lalu menambah semula jadual.

**Kegagalan separa diterima sebagai HTTP 200 dengan `insertErrors[]` yang tidak kosong.** Ini dianggap sebagai
kegagalan dan akan mencetuskan ralat, yang menghentikan kursor daripada bergerak melepasi baris yang tidak pernah diterima
oleh BigQuery; `tests/unit/log-export-bigquery.test.ts` menetapkan tingkah laku ini.

Pengangkutan menggunakan REST biasa — pernyataan RS256 yang ditandatangani sendiri ditukarkan dengan token akses di
`https://oauth2.googleapis.com/token`, kemudian baris dihantar ke `tabledata.insertAll`. Tiada SDK Google
disertakan. Token akses dicache dalam proses bagi setiap (akaun perkhidmatan, skop).

Jadual yang dicipta mempunyai satu lajur bagi setiap medan tab Log serta `exported_at`, dan disusun mengikut
cara log panggilan sebenarnya disoal:

- **Dipartisikan mengikut hari pada `timestamp`**, maka pertanyaan yang dibatasi mengikut tarikh hanya mengimbas hari-hari tersebut.
- **Dikelompokkan mengikut `api_key_name`, `provider`, `model`, `status`** (dalam susunan tersebut), maka penapisan berdasarkan
  siapa yang menjalankannya, ke mana ia dihantar, atau sama ada ia gagal akan menyingkirkan blok dalam setiap partisi. BigQuery
  membenarkan maksimum empat lajur pengelompokan dan susunannya penting: penapis pada `api_key_name` sahaja
  akan menyingkirkan blok, manakala penapis pada `status` sahaja tidak.
- **Pengekalan partisi pilihan** melalui `partitionExpirationDays` (0 mengekalkan semuanya), digunakan
  apabila jadual dicipta.

Kedua-dua tetapan digunakan semasa penciptaan. Jadual sedia ada mengekalkan apa-apa susun atur yang sudah dimilikinya, jadi
halakan destinasi kepada id jadual baharu jika anda mahu menggunakannya.

`tests/unit/log-export-bigquery.test.ts` memastikan pemetaan dan skema jadual kekal
selaras, supaya lajur log panggilan baharu tidak boleh digugurkan secara senyap ketika dieksport.

Kelompok dipecahkan berdasarkan **kedua-dua** bilangan baris dan bait bersiri. Bilangan baris sahaja tidak mencukupi
apabila muatan dieksport: 500 baris yang mengandungi prom boleh mencecah puluhan megabait, dan insertAll
menolak permintaan yang melebihi 10 MB. Setiap pecahan ditutup apabila mencapai 500 baris atau 9 MB, mana-mana yang dicapai dahulu.

---

## 5. Menambah destinasi

1. Cipta `src/lib/logExport/destinations/<name>.ts` yang mengeksport `LogExportDestinationType`:
   `configSchema` Zod, tatasusunan deskriptor `fields` untuk UI, `secretFields`, dan
   `createClient(config)` yang mengembalikan `test()` / `prepare()` / `send(records)`.
2. Tambahkannya pada tatasusunan `DESTINATIONS` dalam `src/lib/logExport/registry.ts`.
3. Tulis ujian di bawah `tests/unit/`.

Itulah keseluruhan perubahan yang diperlukan: pengekalan data, tugas cron, lapisan REST, penyulitan rahsia dan
borang papan pemuka semuanya membaca registri.

Dua peraturan untuk destinasi baharu:

- `send()` **mesti membuang pengecualian** apabila berlaku kegagalan separa. Penyelesaian bermaksud "destinasi mempunyai baris-baris ini",
  dan kursor bergerak melepasi baris-baris tersebut secara kekal.
- Destinasi yang menerima URL yang dibekalkan pengguna mesti mengesahkannya melalui
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) sebelum membuat permintaan,
  dengan cara yang sama seperti webhook. BigQuery tidak memerlukannya: hosnya ialah pemalar.

---

## 6. Mengendalikannya

- **Papan pemuka**: Integrations → Log export. Tambah destinasi, jalankan **Test** untuk menyemak kelayakan
  tanpa menulis baris, kemudian dayakannya.
- **Tunggakan**: setiap kad destinasi menunjukkan baris yang belum selesai dan kursor; `GET
/api/log-export/status` mengembalikan angka yang sama serta 20 pelaksanaan tugas terakhir.
- **Destinasi yang gagal tidak menyebabkan destinasi lain gagal** — ringkasan pelaksanaan merekodkan status setiap destinasi
  dalam `last_status` / `last_error`, dan sejarah pelaksanaan tugas menyimpan agregat.
- **Memadamkan destinasi akan memadamkan kursornya.** Menambahkannya semula bermula daripada log panggilan tersimpan
  yang paling lama, yang menghantar semula baris yang mungkin sudah dimiliki oleh destinasi tersebut. Dalam BigQuery, `insertId`
  bagi setiap baris hanya menangani perkara itu dalam tetingkap penyahduplikasian BigQuery sendiri, jadi sebaik-baiknya
  nyahdayakan destinasi dan bukannya memadamkannya.
