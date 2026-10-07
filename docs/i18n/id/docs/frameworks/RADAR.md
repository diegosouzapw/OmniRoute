# Radar Free-Model Catalog (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Sumber acuan:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Terakhir diperbarui:** 2026-09-01 — v3.8.51
> **Batas bukti layanan terkelola:** aturan sisi server yang dijelaskan di sini telah diverifikasi pada
> 2026-09-01 terhadap server Radar yang memang bersifat privat pada revisi persis
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Implementasi tersebut tidak didistribusikan dalam
> repositori OSS ini; ketersediaan layanan terkelola tetap merupakan keadaan operasional yang terpisah.

Radar adalah **pengaya opsional** yang melapiskan katalog model gratis yang ditandatangani dan
baru dikurasi di atas dasar acuan rilis (`FREE_MODEL_BUDGETS` dalam
`open-sse/config/freeModelCatalog.data.ts`). Radar tersedia karena lanskap tingkat gratis berubah
lebih cepat daripada siklus rilis — penyedia menambahkan, mengurangi, atau menghentikan kuota gratis di antara
rilis, sedangkan katalog dasar acuan hanya dapat diperbarui ketika versi baru dirilis.

**Tidak ada apa pun yang gratis saat ini menjadi tidak gratis karena umpan jarak jauh.** Radar tidak pernah
mengenakan batas berbayar pada entri dasar acuan; Radar hanya memperbarui bidang batas/status saat dibaca dan dapat
menambahkan model gratis yang baru ditemukan di antara rilis. Operator tetap dapat menyembunyikan
model secara lokal dan dapat memulihkannya dari dasbor yang sama. Katalog dasar acuan itu sendiri
tidak pernah diubah pada disk — lihat
[Aturan penggabungan lapisan saat dibaca](#read-time-overlay-merge-rules) di bawah ini.

---

## Status penyediaan dalam v3.8.51

Status berikut membedakan apa yang diimplementasikan oleh rilis OSS ini dari alur kerja Radar
selanjutnya. Ini merupakan status pada tingkat kode, bukan janji bahwa deployment terkelola tertentu
atau integrasi eksternal saat ini tersedia.

| Area                               | Status dalam rilis ini                                                                                                                                                                                                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Klien katalog bertanda tangan      | Diimplementasikan di balik `RADAR_ENABLED`, dengan keikutsertaan terpisah, verifikasi Ed25519, pengaturan/cache lokal terenkripsi, penggantian tampilan/keaktifan persisten, tombstone yang dapat dibatalkan, penjadwal, dan dasbor.                                       |
| Aktivasi kontributor               | Dasbor menautkan ke alur klaim GitHub yang dihosting server dan menerima kunci `omr_…` yang sudah ada. Kelayakan kontributor ditentukan oleh layanan privat; klien OSS tidak memuat token GitHub atau logika penerbitan.                                                   |
| Aktivasi kunci pendukung           | Diimplementasikan. Kunci mentah divalidasi, dienkripsi saat disimpan, disamarkan saat dibaca, dan hanya dikirim oleh sinkronisasi sisi server. Mengubah atau menghapus kunci membatalkan keempat cache umpan yang sensitif terhadap hak akses.                             |
| Tautan rujukan                     | Diimplementasikan sebagai umpan bertanda tangan yang terpisah dan diperbarui setiap jam. Tautan tetap langsung tersedia untuk tingkat komunitas; kampanye terbatas tetap merupakan data tingkat live.                                                                      |
| Penawaran pendukung                | Diimplementasikan sebagai umpan terpisah, bertanda tangan, dan khusus live serta halaman dasbor. Klien memvalidasi ulang skema manfaat tertutup, mempertahankan cache baik terakhir, memfilter entri kedaluwarsa, dan secara eksplisit memberi label pada penawaran mitra. |
| Intel dan pengakuan pendukung      | Diimplementasikan sebagai umpan khusus live yang ketat dan bertanda tangan, dengan ELO milik Radar, informasi faktual mengenai kebaruan/tren katalog, lencana pendukung lokal yang terverifikasi, halaman dasbor, serta perintah status/sinkronisasi CLI khusus lokal.     |
| Pembayaran dan email transaksional | Tidak diimplementasikan dalam klien OSS. Pembelian, donasi, peninjauan tanda terima, pemulihan, dan pengiriman email merupakan bagian dari layanan privat; ketersediaan layanan terkelola tetap bergantung pada deployment yang diawasi serta konfigurasi penyedianya.     |
| Alur kerja agen riset              | Bukan bagian dari rilis klien ini. Isi umpan yang dikurasi tetap merupakan data sisi server; tidak ada agen riset otonom yang berjalan dalam instalasi OmniRoute.                                                                                                          |

---

## Pembaca pengumuman publik

Pembaca pengumuman generik terpisah dari feature flag Radar. Beranda dasbor dan penampil
Changelog mengambil `news.json` publik milik repositori melalui `GET` biasa ke
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Keduanya tidak mengirim pengaturan Radar, prompt, konfigurasi
penyedia, catatan penggunaan, atau status penutupan lokal.

`news.json` menggunakan skema v2 tertutup yang diimplementasikan oleh `parseNewsPayload()`:

- `schemaVersion: 2` dan koleksi `items[]` dengan jumlah terbatas;
- nilai `id` pengumuman yang stabil dan unik;
- kolom `active` dan `publishedAt` berformat ISO yang eksplisit;
- teks bahasa Inggris wajib dengan teks terlokalisasi opsional;
- tautan HTTPS opsional tanpa kredensial dan ikon yang masuk dalam daftar izin;
- pemilihan berdasarkan entri aktif terbaru terlebih dahulu, fallback locale ke bahasa Inggris, dan penutupan lokal per ID.

Parser untuk sementara menerima format tunggal lama `{ active, title, message, ... }` agar
fork lama dapat bermigrasi tanpa merusak tampilan Changelog. Feed yang tidak valid tidak melakukan apa pun. Entri peluncuran Radar
disertakan dengan `active: false`; mengubahnya menjadi `true` adalah tindakan rilis terpisah setelah merge dan deployment,
serta tidak mengubah `RADAR_ENABLED` atau mekanisme opt-in sinkronisasi feed yang independen.

---

## Flag: `RADAR_ENABLED` (nonaktif secara default)

Radar dibatasi secara menyeluruh oleh feature flag `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategori `policies`,
`defaultValue: "false"`).

**Saat flag nonaktif, permukaan fitur tidak tersedia:**

- Semua endpoint `/api/radar/*`, termasuk pembacaan dan penulisan status model lokal,
  mengembalikan `404` sebelum menyentuh modul Radar apa pun.
- Layar dasbor (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) merender
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) mengembalikan baseline tanpa perubahan —
  jumlah entri yang sama, nilai yang sama, setiap entri diberi tag `origin: "baseline"` — dan tidak pernah
  membaca cache feed.
- Tidak ada panggilan jaringan Radar yang dilakukan; setiap modul sinkronisasi mengembalikan `{ status: "disabled" }`
  sebelum menyentuh `fetch`.

Ini adalah gerbang superset yang ketat: mengaktifkan flag hanya membuka _layar_,
tidak lebih. Tindakan ini tidak mengunggah data, tidak memulai sinkronisasi latar belakang, dan tidak mengubah
perutean atau pemilihan model — lihat opt-in terpisah di bawah ini.

---

## Sinkronisasi data adalah opt-in TERPISAH — janji privasi

Mengaktifkan `RADAR_ENABLED` hanya membuka UI. Sinkronisasi feed memerlukan opt-in kedua
yang independen dan disimpan di `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migrasi `136_radar_cache_settings.sql`). `syncRadar()` memeriksa flag _dan_ opt-in
sebelum melakukan panggilan jaringan apa pun:

```
Flag nonaktif → { status: "disabled" }   — tidak ada panggilan jaringan
Opt-in false  → { status: "opt_out" }    — tidak ada panggilan jaringan
```

Saat keduanya aktif, alur sinkronisasinya adalah:

1. `GET <URL dasar feed>/v1/catalog/latest` dengan `x-omniroute-radar-schema: 2` dan header
   `Authorization: Bearer <supporter key>` opsional (lihat di bawah). Server secara default menggunakan artefak
   transisi v1 yang ditandatangani secara terpisah saat header skema tidak ada, sehingga klien lama yang telah terinstal tetap
   menerima pembaruan.
2. Ini adalah alur aplikasi khusus pengunduhan, tetapi tetap merupakan permintaan HTTPS. Infrastruktur
   yang di-host menerima metadata koneksi biasa seperti IP sumber. Saat supporter key
   dikonfigurasi, sinkronisasi juga mengirimkan key tersebut di header Bearer agar layanan dapat menentukan
   hak akses. Pada revisi private-server yang tepat sebagaimana diidentifikasi dalam batas bukti di atas,
   pencatatan permintaan feed menggunakan hash key, penggunaan agregat, dan HMAC terpotong dari IP
   yang dirotasi setiap hari untuk peninjauan penyalahgunaan secara manual; tabel tersebut tidak menyimpan key maupun IP dalam bentuk mentah.
   Log akses infrastruktur dan outbox pengiriman terenkripsi merupakan batas operasional
   yang terpisah.
3. OmniRoute tidak pernah mengirim prompt, respons, percakapan, kredensial penyedia, traffic model,
   uptime, latensi, atau konfigurasi penyedia lokal ke layanan Radar.
4. Respons diverifikasi, divalidasi, dan di-cache secara lokal (lihat
   [Model keamanan](#security-model)). Radar memiliki tepat empat jalur jaringan sisi server:
   `syncRadar()` untuk katalog, `syncRadarReferrals()` untuk rujukan, serta
   `syncRadarOffers()` / `syncRadarIntel()` untuk penawaran dan Intel khusus pendukung.

**Supporter key** adalah token Bearer opsional (`radar_settings.supporter_key`)
yang memungkinkan layanan feed menentukan tier mana yang akan disediakan (lihat
[Tier](#tiers-community-and-live)). Key tersebut:

- Disimpan dalam keadaan **terenkripsi saat tersimpan** dengan helper AES-256-GCM `encrypt()`/`decrypt()`
  yang sama (`src/lib/db/encryption.ts`) seperti yang digunakan untuk kredensial penyedia.
- Diatur melalui `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) dan
  **tidak pernah dikirim kembali** — respons mengembalikan bentuk yang disamarkan (`omr_****abcd`).
- Mengubah atau menghapusnya secara atomik membatalkan cache katalog, rujukan, penawaran, dan Intel. Sinkronisasi/pembacaan
  berikutnya menentukan hak akses baru di sisi server; menyimpan key tidak dengan sendirinya
  membuat permintaan jaringan atau menggunakan key aktivasi sekali pakai.
- Dikirim ke layanan feed sebagai token Bearer dalam GET sinkronisasi — tidak ada hal lain tentang
  key tersebut yang pernah keluar dari klien.

---

## Aturan akses dan keamanan yang ditampilkan sebelum persetujuan

Dasbor yang tidak aktif merender aturan ini dari
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **sebelum** salah satu tindakan aktivasi.
Skala akses kanonis adalah:

| Tingkat                 | Kelayakan                                                                                        | Akses                                                           | Aturan pengulangan/kedaluwarsa                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Komunitas               | Siapa saja; tanpa kunci                                                                          | Katalog lengkap tertunda sekitar 30 hari                        | Selalu tersedia; tanpa penerbitan                                                                |
| Bintang + ikuti         | GitHub OAuth memverifikasi bintang pada repositori dan tindakan mengikuti pemilik                | Satu kali pembacaan katalog langsung, lalu Komunitas            | Satu penerbitan per login; tidak pernah diterbitkan ulang                                        |
| Kontributor 10 Teratas  | Posisi 1–10 dalam peringkat mingguan lengkap terbaru                                             | 365 hari akses langsung                                         | Diklaim sesuai permintaan; keluar dari peringkat tidak memperpendek periode yang telah diberikan |
| Kontributor 100 Teratas | Posisi 11–100 dalam peringkat tersebut                                                           | 90 hari akses langsung                                          | Aturan klaim sesuai permintaan/idempoten yang sama                                               |
| Pembelian pendukung     | Pembelian satu kali untuk 6 bulan, 1 tahun, atau seumur hidup                                    | Katalog langsung, penawaran langsung bertanda tangan, dan Intel | Tanpa perpanjangan otomatis                                                                      |
| Donasi/pemberian manual | Donasi yang ditinjau pemilik atau pemberian oleh pemilik untuk jumlah hari tertentu/seumur hidup | Hak akses langsung yang sama selama periode yang diberikan      | Pemberian yang diaudit dan idempoten                                                             |

PR yang digabungkan, commit, dan baris yang diubah **hanya merupakan masukan peringkat**. Login di luar 100 Teratas
tidak mendapatkan pemberian kontributor, berapa pun jumlah PR-nya. Pembelian berjangka, donasi, periode kontributor, dan
pemberian manual diakumulasikan dari waktu kedaluwarsa saat ini; akses seumur hidup lebih diutamakan. Perubahan peringkat tidak pernah
secara retroaktif mencabut atau memperpendek waktu yang telah diberikan.

Lisensi yang di-host bersifat pribadi dan aturan bagi pengguna adalah satu instalasi aktif dalam satu waktu. Rilis ini
**tidak** mengklaim adanya penguncian perangkat keras: sinkronisasi OSS tidak mengambil sidik jari perangkat keras atau mempertahankan
sewa perangkat kriptografis. Pada revisi server privat terverifikasi di atas, penegakan yang diterapkan
adalah validasi hak akses ditambah sinyal peninjauan manual ketika kunci aktif yang sama terlihat dari alamat IP berbeda yang
keempat dalam waktu 24 jam. Sinyal tersebut tidak pernah memblokir atau mencabut kunci secara otomatis. Pemulihan
mencabut dan mengganti kunci yang hilang sembari mempertahankan waktu kedaluwarsa yang ada; tindakan ini tidak memulai ulang
periode yang dibeli atau diberikan.

Penawaran langsung dikurasi secara manual dan dapat berubah atau kedaluwarsa. Layar persetujuan juga menyebutkan batas
privasi yang tepat: metadata katalog/referral bertanda tangan diunduh; kunci yang valid juga membuka akses ke
penawaran bertanda tangan dan Intel; kunci Bearer serta metadata koneksi normal mencapai layanan yang di-host;
prompt, respons, percakapan, kredensial penyedia, lalu lintas model, waktu aktif, latensi, dan konfigurasi
penyedia lokal tidak.

---

## Mendapatkan kunci pendukung

Layar aktivasi (`/dashboard/radar`) menyediakan tautan ke dua alur untuk **mendapatkan**
kunci pendukung. Repo OSS itu sendiri tidak pernah menerbitkan kunci, tidak pernah menjalankan kode pembayaran, dan
**tidak pernah mencantumkan harga** — harga ditentukan dan ditampilkan sepenuhnya pada
halaman tujuan, bukan di repo ini (keputusan spesifikasi D14).

- **"Saya adalah kontributor"** — membuka `RADAR_CONTRIBUTOR_CLAIM_URL` (default
  `https://radar.omniroute.online/auth/github`), alur klaim GitHub OAuth yang di-host di
  server Radar privat. Alur ini memeriksa peringkat mingguan lengkap terbaru: 10 teratas menerima 365 hari
  dan posisi 11–100 menerima 90 hari. Di luar 100 teratas, jumlah PR tidak pernah memberikan akses; alur tersebut
  sebagai gantinya memeriksa level sekali pakai terpisah berdasarkan pemberian bintang + mengikuti.
- **"Dukung proyek ini"** — membuka `RADAR_SUPPORTER_PLANS_URL` (default
  `https://radar.omniroute.online/planos`), halaman yang di-host untuk opsi satu kali 6 bulan, 1 tahun, dan
  seumur hidup. Halaman OSS tetap tidak menampilkan nilai uang apa pun.

Kedua URL di-resolve di sisi server (`src/lib/radar/links.ts`, dengan pola penggantian env yang sama
seperti `RADAR_FEED_URL`) dan diteruskan ke dasbor melalui respons
`GET /api/radar/settings` yang sudah ada (`contributorClaimUrl`, `supporterPlansUrl`) — komponen
klien tidak pernah membaca `process.env` secara langsung.

| Var                           | Tujuan                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Mengganti URL klaim kontributor (default `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Mengganti URL paket pendukung (default `https://radar.omniroute.online/planos`).        |

### Memulihkan kunci pendukung yang hilang

Titik masuk pemulihan layanan yang di-host adalah `https://radar.omniroute.online/recover`; tautannya juga
tersedia dari halaman paket. Pemulihan tetap sepenuhnya berada di luar klien OSS karena instalasi lokal
tidak pernah menerima alamat e-mail pembeli/kontributor dan tidak dapat merekonstruksi kunci mentah dari
pengaturan terenkripsinya.

1. Kirim alamat e-mail yang terkait dengan kunci tersebut. Layanan mengembalikan halaman konfirmasi yang sama, baik
   lisensi yang dapat dipulihkan ada maupun tidak, sehingga formulir tersebut tidak mengungkapkan akun.
2. Jika memenuhi syarat, worker pengiriman mengirimkan tautan berumur pendek yang hanya dapat digunakan satu kali. Membukanya akan segera memindahkan
   token ke cookie terenkripsi sementara `HttpOnly`/`Secure` dan mengalihkan ke URL
   `/recover` yang bersih; halaman tersebut tidak memuat token, e-mail, kunci lama, atau kunci pengganti.
3. Konfirmasikan pencabutan. Layanan privat mencabut kunci sebelumnya, membuat pengganti dengan
   paket/kedaluwarsa yang sama, dan memasukkannya ke antrean untuk dikirim melalui e-mail dalam satu transaksi. Kunci pengganti tidak pernah
   dikembalikan ke browser.
4. Tempelkan kunci pengganti ke `/dashboard/radar`. Kunci lama kini harus turun ke `community`;
   kunci pengganti harus menghasilkan sinkronisasi `live` yang terverifikasi. Membuka kembali tautan pemulihan yang sama harus gagal dengan
   respons generik bahwa tautan tidak valid/kedaluwarsa.

Rute pemulihan dan worker surat yang di-host dapat tersedia dalam kode tetapi tetap tidak dapat digunakan dalam deployment
tertentu. Jangan menyatakan alur ini siap untuk produksi sebelum server di-deploy, penyedia pengiriman
dikonfigurasi dengan penerima yang terkontrol, dan seluruh alur tautan sekali pakai telah diuji.

Setelah pengunjung memiliki kunci (`omr_` + 40 karakter heksadesimal), layar aktivasi
(`src/app/(dashboard)/dashboard/radar/page.tsx`) menyediakan input tempel-kunci sebagai jalur
utama: menempelkan kunci dan mengirimkannya akan mengirim `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) dalam satu panggilan — menempelkan kunci sekaligus menetapkannya dan mengaktifkan keikutsertaan,
sehingga layar terbuka. Format (`omr_` + 40 karakter heksadesimal) terlebih dahulu diperiksa di sisi klien
dengan helper bersama `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
sebagai kemudahan UX; bagaimanapun, skema Zod server merupakan pemeriksaan yang otoritatif. Setelah
kunci ditetapkan, layar aktivasi menampilkan bentuk yang disamarkan (`supporterKeyMasked` dari
`GET /api/radar/settings`) alih-alih input kosong, dengan kontrol "ubah kunci" untuk
menempelkan kunci baru — kunci mentah tidak pernah ditampilkan kembali. Kedua tombol klaim/paket di atas
tetap menjadi cara untuk _mendapatkan_ kunci pada awalnya; input ini adalah tempat operator
yang sudah memiliki kunci mengaktifkannya.

### Aktivasi menyeluruh dan penyiapan terpandu

Layanan feed privat dan klien OSS ini memiliki batasan yang sengaja dibuat sempit: layanan
menerbitkan dan memvalidasi kunci pendukung, sedangkan instalasi OmniRoute lokal mengenkripsi kunci,
menyinkronkan artefak yang ditandatangani di sisi server, dan memandu penyiapan penyedia. Urutan validasi terbantu adalah:

1. Dapatkan kunci yang baru diterbitkan atau dipulihkan melalui klaim kontributor, proses plans/checkout, alur
   pemulihan, atau operator server privat yang berwenang. Jangan tempelkan kunci mentah ke dalam log,
   tangkapan layar, komentar issue, atau argumen baris perintah.
2. Aktifkan feature flag `RADAR_ENABLED` pada instalasi OmniRoute lokal. Ini menampilkan UI,
   tetapi tetap tidak melakukan aktivitas jaringan sampai persetujuan terpisah disimpan.
3. Buka `/dashboard/radar`, tempelkan kunci, lalu aktifkan. Browser mengirim satu permintaan lokal
   `POST /api/radar/settings` dengan `{ optIn: true, supporterKey }`; kunci dienkripsi secara lokal dan
   respons hanya berisi `omr_****<last4>`.
4. Biarkan layar aktivasi menjalankan sinkronisasi katalognya, atau pilih **Sinkronkan sekarang**. Pastikan halaman
   melaporkan `live`, versi feed, dan waktu pengambilan. Untuk diagnostik lokal yang diautentikasi,
   `GET /api/radar/status` melaporkan status persetujuan/keberadaan kunci dan empat status cache tanpa mengembalikan
   kunci. `POST /api/radar/sync-all` dapat menyegarkan katalog, rujukan, penawaran, dan Intel secara eksplisit.
5. Buka `/dashboard/radar/setup?provider=<provider>`. Ikuti URL kredensial milik penyedia,
   pilih **Tambahkan kunci API**, simpan melalui formulir penyedia yang sebenarnya, kembali ke panduan, lalu jalankan
   **Uji koneksi**. Panduan menggunakan rute normal `/api/providers` dan
   `/api/providers/<connection-id>/test`; panduan ini tidak membuat kredensial Radar paralel.
6. Buka `/dashboard/radar/combos` setelah setidaknya dua koneksi penyedia yang kompatibel aktif.
   Tinjau kelompok yang disarankan dan buat combo melalui API combo yang sudah ada. Penawaran dan
   Intel tetap menjadi cache bertanda tangan yang terpisah dan hanya tersedia secara live, serta dapat diperiksa pada halaman Radar khusus masing-masing.
7. Muat ulang `/dashboard/radar` dan halaman penyiapan. Status persetujuan, status kunci tersamarkan, cache terverifikasi, koneksi
   penyedia yang tersimpan, dan tindakan pengujian harus tetap tersedia setelah pemuatan ulang. Ambil bukti hanya setelah
   kunci mentah dan kredensial penyedia tidak lagi terlihat.

Menyimpan kunci bukanlah bukti hak akses live. Buktinya adalah kombinasi hasil
`GET /v1/license/check` dari layanan privat, tier `live` yang disajikan oleh katalog OSS, cache bertanda tangan
yang terverifikasi, serta alur koneksi/pengujian penyedia yang sebenarnya. Kunci yang tidak valid, kedaluwarsa, atau dicabut akan secara aman
menurunkan katalog ke `community`; kondisi ini tidak boleh dilaporkan sebagai validasi kunci live yang berhasil.

### Tautan panel admin privat

`RADAR_ADMIN_URL` secara opsional menambahkan **Admin Radar ↗** tepat setelah item Radar yang ditampilkan kepada pengguna
di bagian Biaya pada bilah sisi. Variabel ini sengaja tidak memiliki nilai default: ketika variabel
tidak ditetapkan atau tidak valid, bilah sisi statis, palet perintah, dan layar penyesuaian bilah sisi tidak memuat
item admin maupun URL privat.

Nilai tersebut diuraikan di sisi server dan diteruskan melalui respons
`GET /api/settings` yang diautentikasi untuk pengelolaan hanya kepada sesi dasbor yang diautentikasi, atau kepada
pemilik loopback tepercaya selama bootstrap lokal tanpa login. Autentikasi CLI, layanan internal, dan kunci API
dengan cakupan pengelolaan tidak menerimanya. Browser memvalidasi kembali respons tersebut sebelum menampilkan
tautan eksternal, yang dibuka dengan `noopener noreferrer`.

Gunakan URL tunnel/tailnet HTTPS tanpa kredensial. HTTP biasa hanya diterima untuk penerusan SSH loopback
seperti `http://127.0.0.1:9351`; skema lain, kredensial tertanam, URL yang tidak valid, dan
tujuan HTTP jarak jauh akan ditolak secara aman dan membuat navigasi tidak aktif.

---

## Model keamanan

### Tanda tangan Ed25519 atas byte yang persis sama

Payload feed ditandatangani dengan Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) memverifikasi tanda tangan atas **byte respons yang persis sama**
seperti yang diterima melalui jaringan — payload tidak pernah diserialisasi ulang sebelum verifikasi, sehingga
pengodean ulang byte demi byte tidak dapat secara diam-diam membatalkan atau melewati pemeriksaan tanda tangan.
Kegagalan verifikasi (`invalid_signature`) membatalkan sinkronisasi sebelum payload
diuraikan atau disimpan ke cache.

### Kunci publik tersemat + rotasi

Kunci publik untuk verifikasi disematkan di `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), dalam bentuk array agar kunci baru dapat ditambahkan di awal sebelum
rotasi, sementara feed lama dalam cache yang ditandatangani dengan kunci sebelumnya tetap valid hingga
disinkronkan ulang.

### Penggantian melalui variabel lingkungan yang ramah fork

Dua variabel lingkungan memungkinkan fork dan pengelola hosting mandiri mengarahkan klien ke feed mereka sendiri sebagai pengganti
layanan OmniRoute bawaan — lihat
[Cara menghosting feed secara mandiri](#how-to-self-host-a-feed) di bawah ini:

| Variabel            | Tujuan                                                                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Mengganti URL dasar feed (bawaan `https://radar.omniroute.online`).                                                                    |
| `RADAR_FEED_PUBKEY` | Mengganti kunci publik tersemat (SPKI DER yang dikodekan dengan base64 atau PEM), sehingga array bawaan diganti dengan satu kunci ini. |

### Batas bawah versi

`syncRadar()` menolak feed yang diunduh jika `version` tidak benar-benar lebih baru daripada
versi yang saat ini tersimpan dalam cache (perbandingan `compareVersions()`, format bertitik `YYYY.MM.DD.n`) —
`{ status: "stale" }`. Hal ini mencegah endpoint feed yang disusupi atau salah dikonfigurasi
mengembalikan klien ke payload lama yang ditandatangani secara berbeda.

### Dua tanggal, dan alasan keduanya disimpan

Feed dalam cache menyimpan dua tanggal yang berbeda, dan mencegah kekeliruan di antara keduanya adalah alasan utama
keduanya dipertahankan:

| Bidang        | Berasal dari             | Menjawab                             |
| ------------- | ------------------------ | ------------------------------------ |
| `generatedAt` | isi feed bertanda tangan | seberapa lama usia **data** tersebut |
| `fetchedAt`   | jam instalasi ini        | kapan instalasi ini **mengunduhnya** |

Feed yang diambil beberapa menit lalu dapat memuat angka yang sudah berusia beberapa minggu, sehingga `fetchedAt` saja tidak dapat
memberi tahu operator apakah overlay tersebut lebih baru daripada baseline yang menjadi dasarnya. Keduanya
disimpan di `radar_feed_cache`, dikembalikan oleh `getRadarCatalog().meta`, dan dilaporkan
secara terpisah oleh `GET /api/radar/status`. Baris yang disimpan dalam cache sebelum kolom `generated_at`
tersedia (migrasi 163) akan dibaca kembali sebagai `null` — hal yang tidak diketahui tetap tidak diketahui, alih-alih
menggunakan waktu pengambilan. `radar_referrals_cache` telah menyimpan `generated_at` miliknya sendiri sejak
migrasi 142.

Batas bawah versi di atas membandingkan `version`, bukan salah satu tanggal tersebut.

Dua kekurangan masih ada, dan keduanya disengaja: dasbor masih hanya menampilkan `Last fetched`, sehingga untuk menampilkan
tanggal build di sana diperlukan label baru (beserta 41 entri lokalnya); dan cache penawaran serta intel
sama sekali tidak menyimpan tanggal build, meskipun skema feed-nya memuat tanggal tersebut — karena itu, `GET
/api/radar/status` tidak menyertakan bidang ini untuk keduanya, alih-alih melaporkan `null`
yang akan dimaknai sebagai "tidak diketahui".

### Validasi skema

Byte yang diunduh diuraikan dan divalidasi berdasarkan `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, sebuah skema Zod) **setelah** verifikasi tanda tangan. Ketidakcocokan
skema mengembalikan `{ status: "invalid_schema" }` dan cache dibiarkan
tidak berubah. Payload dalam cache secara defensif divalidasi ulang setiap kali dibaca
(`getRadarCatalog()`) — baris cache yang rusak atau diedit secara manual akan kembali menggunakan
baseline alih-alih disajikan.

### Batas ukuran respons (10 MB)

`syncRadar()` menerapkan **batas keras 10 MB** pada isi respons feed — feed yang
ditandatangani adalah dokumen JSON berskala KB, sehingga apa pun yang melebihi batas ini menunjukkan `RADAR_FEED_URL`
yang salah dikonfigurasi atau berbahaya (atau sumber hulu yang menyajikan data sampah), bukan katalog yang sah.
Penerapannya terdiri dari dua lapisan:

1. Pemeriksaan awal `Content-Length` melewati pembacaan isi sepenuhnya ketika
   header sudah menyatakan nilai yang melebihi batas.
2. Pemeriksaan total berjalan saat membaca isi menerapkan batas bahkan ketika
   `Content-Length` tidak ada atau menyatakan ukuran yang lebih kecil daripada ukuran sebenarnya — header tidak pernah
   dipercaya begitu saja. Penggabungan potongan yang terkumpul mempertahankan byte persis
   yang diperlukan untuk pemeriksaan tanda tangan Ed25519 setelahnya.

Melebihi batas akan mengembalikan `{ status: "too_large" }` dan membiarkan cache tidak berubah,
mengikuti pola non-destruktif yang sama seperti setiap kegagalan sinkronisasi lainnya
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Tingkatan: `community` dan `live`

Skema feed memuat kolom `tier: "community" | "live"`, yang ditentukan **di sisi server**
oleh layanan feed berdasarkan permintaan (keberadaan dan validitas kunci pendukung)
— klien tidak pernah menentukan tingkatannya sendiri.

- **`community`** — katalog gratis yang tertinggal sekitar 30 hari dari data
  terbaru. Inilah yang diterima oleh permintaan tanpa autentikasi atau dengan kunci tidak valid.
- **`live`** — katalog terbaru, disajikan kepada permintaan yang membawa kunci
  pendukung yang valid.

**Kunci pendukung yang tidak valid atau kedaluwarsa diturunkan ke `community` — hal itu tidak pernah
menjadi galat.** Jalur sinkronisasi hanya membedakan kegagalan tanda tangan/skema/versi (semuanya
dapat dipulihkan, semuanya tidak fatal bagi status cache) dari `{ status:
"updated", version, tier }` yang berhasil. Tidak ada jalur galat khusus tingkatan yang perlu
ditangani oleh klien.

### Tingkatan yang disajikan berasal dari header respons, bukan body yang ditandatangani

Kolom `tier` pada **body** feed yang ditandatangani selalu `"live"` — layanan feed mengirimkan
**dua artefak yang ditandatangani untuk setiap versi**: live menyertakan kampanye saat ini, sedangkan community
menghilangkannya. Setiap artefak ditandatangani berdasarkan byte persisnya sendiri. Body tetap tidak
berfungsi sebagai keputusan hak akses; tingkatan yang sebenarnya dipilih untuk suatu permintaan dibawa
dalam **header respons `x-omniroute-feed-tier`**, yang ditentukan di sisi server dari kunci
`Authorization` permintaan.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) adalah satu-satunya tempat
yang menetapkan tingkatan yang seharusnya dipercaya klien:

1. Parse `x-omniroute-feed-tier` dengan `RadarTierSchema` (Zod) — header yang tidak ada, atau
   nilai yang tidak persis `"community"` maupun `"live"`, diperlakukan sebagai **tidak
   ada** (tidak pernah dipercaya begitu saja ke dalam cache/UI; ini juga mencakup server feed
   lama yang dibuat sebelum header tersebut ada).
2. Gunakan kolom `tier` dari body yang ditandatangani (selalu `"live"`) sebagai fallback hanya ketika langkah 1
   tidak menghasilkan apa pun.
3. Tingkatan yang telah ditetapkan itulah yang disimpan ke cache dan dikembalikan sebagai `{ status: "updated",
version, tier }` — nilai inilah yang ditampilkan dasbor, bukan kolom mentah dari
   body.

---

## Aturan penggabungan overlay saat pembacaan

`applyFeed()` (`src/lib/radar/applyFeed.ts`) menggabungkan feed yang tersimpan di cache **di atas**
baseline statis pada **saat pembacaan**, di dalam `getRadarCatalog()`. Array baseline
(`FREE_MODEL_BUDGETS`) tidak pernah dimutasi — sebuah `MergedEntry[]` dihitung ulang pada setiap
pemanggilan.

Empat aturan, berdasarkan urutan prioritas:

1. **Feed tidak pernah menimpa override lokal.** Per kolom: jika operator telah
   menyesuaikan sebuah kolom pada entri (`localOverrides` map, dengan kunci `provider:modelId`),
   nilai feed untuk kolom spesifik tersebut dilewati — nilai operator yang digunakan.
2. **`enabled: false` menonaktifkan entri, dengan asal-usulnya.** Entri feed yang
   menonaktifkan sebuah entri menetapkan `enabled: false` dan `disabledBy: "radar"` pada hasil penggabungan,
   sehingga UI dapat menjelaskan _mengapa_ sebuah entri berubah dari tersedia menjadi dinonaktifkan.
3. **Entri yang ditambahkan pengguna dan tidak ada di feed tetap bertahan tanpa perubahan.** Entri yang
   hanya ada di baseline (atau ditambahkan secara lokal) dan tidak memiliki entri feed yang sesuai
   diteruskan tanpa perubahan.
4. **Entri yang telah diberi tombstone tidak pernah dihidupkan kembali.** Jika operator secara eksplisit menghapus
   sebuah entri (`tombstones` set), penambahan kembali `provider:modelId` tersebut oleh feed dalam versi
   berikutnya tidak akan mengembalikannya.

Kolom yang dapat diedit dan tombstone disimpan dalam
`radar_local_model_state` (migrasi `153_radar_local_model_state.sql`). Adapter DB publik
(`src/lib/db/radar.ts`) mengonversi baris-baris tersebut menjadi `localOverrides` map dan
`tombstones` set yang digunakan oleh `applyFeed()`; `getRadarCatalog()` produksi memuat status tersebut
setelah pemeriksaan flag, cache, dan skema lolos. Hanya `displayName` dan `enabled` yang
dapat diedit oleh operator. Identitas penyedia/model, asal-usul feed, kuota, kapabilitas, ToS,
dan data penyiapan tidak dapat ditulis melalui antarmuka ini.

Dasbor menyediakan empat tindakan lokal:

- **Edit** mengubah nama tampilan lokal dan status aktif.
- **Reset local changes** menghapus kedua kolom yang dapat diedit tanpa mengubah tombstone.
- **Hide** membuat tombstone, sehingga pembaruan feed berikutnya tidak dapat membuat ulang baris tersebut.
- **Restore** menghapus tombstone; override yang disimpan secara terpisah tetap berlaku.

`enabled: false` dari feed tetap menjadi pengecualian keselamatan: nilai ini mengungguli
`enabled: true` lokal yang usang, menjaga entri hasil penggabungan tetap dinonaktifkan, dan mencatat
`disabledBy: "radar"`.

Publikasi katalog menggunakan `schemaVersion: 2`. `contextWindow` serta masing-masing dari `tools`, `vision`, dan
`thinking` secara independen bertipe `number | null` / `boolean | null`: `null` berarti tidak diketahui, sedangkan
`false` berarti sumber resmi penyedia yang dikonfirmasi D16 secara eksplisit menyatakan bahwa kapabilitas tersebut tidak ada.
Flag spesifikasi model/registri internal OmniRoute tidak pernah dipromosikan secara langsung menjadi fakta feed. Klien
tetap menerima snapshot v1; karena builder lama menggunakan `false` sebagai placeholder untuk ketidakadaan, `false` pada v1
dinormalisasi menjadi tidak diketahui, sedangkan `true` pada v1 tetap dianggap faktual. Versi skema yang tidak dikenal ditolak secara aman dan
cache valid terakhir tetap tersedia. Setiap model v2 dengan konteks/kapabilitas non-null harus memiliki
`metadataEvidenceUrls[]` HTTPS yang tidak memerlukan kredensial; jika tidak, validasi skema gagal dan cache
tidak diganti. Tabel katalog merender ketiga status sebagai `✓`, `✕`, dan `?`.

### Kombinasi terpandu dan akses MCP

Nilai `familyId` yang telah dikonfirmasi tetap tersedia setelah overlay saat pembacaan dan menggerakkan modul murni
`buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Sebuah keluarga disarankan
hanya jika setidaknya dua penyedia berbeda memiliki koneksi aktif dan menyediakan ID model pilihan yang
persis sama. Model yang dinonaktifkan, penyedia yang tidak aktif, ID model yang tidak ada, keluarga tunggal, serta
kecocokan alias/prefix yang ambigu ditolak secara aman. Saran menggunakan strategi `priority` yang sudah ada, dengan
mengurutkan anggaran bulanan berulang terbesar terlebih dahulu; UI hanya membuatnya melalui `POST /api/combos`.

UI terpandu berada di `/dashboard/radar/combos`. UI ini hanya membaca endpoint lokal
`GET /api/radar/catalog` dan `GET /api/combos/builder/options`. UI ini tidak pernah memicu sinkronisasi Radar,
membaca kredensial penyedia, atau menulis langsung ke database combo.

Klien MCP dapat membaca proyeksi lokal yang sama dengan `omniroute_radar_catalog` (`read:radar`). Filter
opsional `provider`, `familyId`, dan `enabledOnly` dievaluasi setelah satu pembacaan lokal
`GET /api/radar/catalog`. Output tertutupnya mencakup metadata katalog serta penyedia/model,
nama tampilan, `familyId`, kuota, kapabilitas, status aktif, asal, dan `disabledBy`; URL penyiapan,
langkah-langkah, koneksi, alamat surel, kunci, dan data rujukan tidak pernah dikembalikan. Alat ini
bersifat hanya-baca dan tidak pernah memanggil `/api/radar/sync`.

### Penanda asal-usul

Setiap entri gabungan memiliki bidang `origin` yang dirender UI sebagai lencana:

- `"baseline"` — tidak berubah dari katalog rilis statis.
- `"radar"` — satu atau beberapa bidang telah diperbarui oleh umpan.
- `"local"` — operator memiliki setidaknya satu penggantian lokal pada entri ini (penggantian
  lokal selalu lebih diutamakan daripada umpan sesuai aturan 1, terlepas dari apa yang dinyatakan umpan).

---

## Permukaan lokal — tidak pernah menjadi proksi feed

Kelompok rute Radar lokal di bawah ini mendukung UI pada `src/app/api/radar/`:

| Rute                           | Metode | Tujuan                                                                                                                            |
| ------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Mengembalikan katalog gabungan (`getRadarCatalog()`) dari cache lokal.                                                            |
| `/api/radar/sync`              | POST   | Memicu `syncRadar()` di sisi server; mengembalikan status yang dihasilkan.                                                        |
| `/api/radar/settings`          | GET    | Mengembalikan `{ optIn, hasSupporterKey, supporterKeyMasked }` — tidak pernah mengembalikan kunci mentah.                         |
| `/api/radar/settings`          | POST   | Menetapkan persetujuan dan/atau kunci pendukung (terenkripsi).                                                                    |
| `/api/radar/referrals`         | GET    | Mengembalikan `{ fixed, campaigns, tier }` dari cache lokal — lihat [Tautan referral](#referral-links-free-credits) di bawah.     |
| `/api/radar/offers`            | GET    | Mengembalikan penawaran aktif dari cache live lokal yang terverifikasi; tidak pernah mengembalikan kunci pendukung.               |
| `/api/radar/offers/sync`       | POST   | Memicu pipeline `syncRadarOffers()` di sisi server yang hanya menggunakan kunci live.                                             |
| `/api/radar/intel`             | GET    | Mengembalikan Intel live lokal yang terverifikasi beserta boolean pengenalan pendukung; tidak pernah berupa identitas atau kunci. |
| `/api/radar/intel/sync`        | POST   | Memicu pipeline `syncRadarIntel()` di sisi server yang hanya menggunakan kunci live.                                              |
| `/api/radar/status`            | GET    | Mengembalikan status pengaturan/cache lokal hanya-baca untuk katalog, referral, penawaran, dan Intel, tanpa rahasia.              |
| `/api/radar/sync-all`          | POST   | Menjalankan keempat modul sinkronisasi di sisi server dan mengembalikan status terpisah untuk setiap feed.                        |
| `/api/radar/local-model-state` | GET    | Mencantumkan override dan tombstone tersimpan untuk kontrol edit/pemulihan.                                                       |
| `/api/radar/local-model-state` | PATCH  | Menetapkan atau menghapus kolom override `displayName`/`enabled` yang telah divalidasi.                                           |
| `/api/radar/local-model-state` | PUT    | Membuat atau menghapus tombstone dengan `{ provider, modelId, tombstoned }`.                                                      |
| `/api/radar/local-model-state` | DELETE | Menghapus kolom override yang dapat diedit sembari mempertahankan tombstone apa pun.                                              |

**Aturan tegas: rute-rute ini tidak pernah memproksikan layanan feed.** Browser hanya
berkomunikasi dengan server OmniRoute lokal. Empat modul yang berinteraksi dengan layanan Radar adalah
`src/lib/radar/sync.ts` (katalog), `src/lib/radar/referralsSync.ts` (referral), serta
`src/lib/radar/offersSync.ts` (penawaran) dan `src/lib/radar/intelSync.ts` (Intel); semuanya berjalan
di sisi server, tidak pernah di sisi klien. Hal ini memastikan
URL feed dan kunci pendukung apa pun sepenuhnya tidak muncul dalam lalu lintas jaringan yang menghadap klien.

Semua endpoint Radar mengembalikan `404` ketika `RADAR_ENABLED` dinonaktifkan (lihat
[Flag](#flag-radar_enabled-default-off) di atas), dan respons kesalahan rute diproses melalui
`buildErrorBody()`/`sanitizeErrorMessage()` sesuai aturan sanitasi kesalahan di seluruh repo
(`docs/security/ERROR_SANITIZATION.md`).

### Autentikasi

Semua endpoint Radar memerlukan autentikasi melalui `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — cookie sesi dasbor atau kunci API dengan cakupan manajemen,
yaitu gerbang yang sama yang melindungi bagian lain dari `/api/settings/*`. Pemeriksaan
`404` saat flag dinonaktifkan selalu dijalankan **sebelum** pemeriksaan autentikasi, sehingga instalasi dengan
`RADAR_ENABLED` yang dinonaktifkan tetap identik secara bita (tidak ada permintaan autentikasi hanya untuk mengetahui bahwa permukaan tersebut tidak ada);
setelah flag diaktifkan, permintaan tanpa autentikasi akan mendapatkan `401` sebelum pembacaan atau
penulisan DB apa pun. `GET /api/radar/settings` tidak pernah mengembalikan kunci pendukung mentah terlepas dari
status autentikasi — hanya bentuk tersamarkan dan boolean `hasSupporterKey`.

---

## Penawaran supporter

Penawaran menggunakan artefak bertanda tangan tersendiri, `GET /v1/offers/latest`, dan tidak pernah berbagi cache katalog atau rujukan. Endpoint server memerlukan kunci Bearer supporter live yang valid; tidak ada fallback komunitas. Oleh karena itu, `syncRadarOffers()` berhenti sebelum mengakses jaringan ketika feature flag dinonaktifkan, operator belum memberikan persetujuan, atau tidak ada kunci supporter yang dikonfigurasi.

Setelah GET berhasil, klien memverifikasi tanda tangan Ed25519 terhadap byte respons yang persis sama, memvalidasi `RadarOffersFeedSchema`, mengharuskan isi bertanda tangan dan header `x-omniroute-feed-tier` sama-sama menyatakan `live`, menerapkan versi bertitik yang benar-benar lebih baru, dan baru kemudian mengganti `radar_offers_cache` secara atomik (migrasi `144_radar_offers_cache.sql`). Batas gabungan header dan stream sebesar 10 MB yang digunakan oleh feed lain juga berlaku. Kegagalan tanda tangan, skema, tingkat, replay, ukuran, HTTP, dan jaringan semuanya mempertahankan cache terakhir yang telah diverifikasi.

Struktur penawaran tertutup mendukung tiga jenis manfaat yang dapat dibandingkan: persentase dalam basis poin, kredit dalam unit minor mata uang, atau hari uji coba. Penawaran mitra harus menyertakan baseline publik berjenis sama dan manfaatnya harus benar-benar lebih besar; penawaran resmi tidak memiliki baseline mitra. URL harus menggunakan HTTPS dan bebas kredensial. `getRadarOffers()` secara defensif memvalidasi ulang payload yang di-cache dan memfilter entri kedaluwarsa pada setiap pembacaan lokal; `/dashboard/radar/offers` memfilter lagi masa kedaluwarsa sebelum merender, menggunakan teks bahasa Portugis jika tersedia dengan fallback bahasa Inggris, dan memberi label eksplisit pada penawaran mitra.

Browser hanya memanggil rute lokal: browser membaca snapshot pengaturan yang disamarkan, meminta `POST /api/radar/offers/sync` untuk melakukan penyegaran di sisi server, lalu membaca `GET /api/radar/offers`. Tanpa kunci, browser menampilkan tautan kontribusi/dukungan yang sudah ada alih-alih mencoba membuat permintaan feed. Tautan penawaran eksternal dibuka di tab baru dengan `noopener noreferrer`. Tidak ada alat MCP `radar_offers` yang diekspos dalam rilis ini.

---

## Radar Intel, lencana supporter, dan CLI

Intel adalah artefak bertanda tangan di `GET /v1/intel/latest`. `RadarIntelFeedSchema` tertutup hanya menerima peringkat ELO milik Radar yang diturunkan oleh kurator privat dari perbandingan terkonfirmasi serta delta faktual usia/jumlah katalog yang diturunkan dari snapshot katalog bertanda tangan. Metodologinya ditetapkan pada peringkat awal 1000 dan K=32. Peringkat kosong dianggap valid ketika belum ada perbandingan yang dikonfirmasi; klien tidak pernah membuatnya secara sintetis.

`syncRadarIntel()` menerapkan Bearer sisi server, batas waktu 30 detik, batas stream 10 MiB, verifikasi Ed25519 terhadap byte yang persis sama, skema ketat, persyaratan isi/header `live`, batas bawah versi, dan pemeliharaan cache valid terakhir yang sama seperti pada penawaran. Setelah snapshot live yang terverifikasi disimpan, klien menghasilkan `radar:<sha256(supporter key)>`, hanya menyimpan identitas satu arah tersebut, dan memancarkan peristiwa pengakuan khusus `radar_supporter`. Lencana `radar-supporter` bersifat idempoten dan memberikan nol XP; lencana tersebut tidak pernah memperbarui papan peringkat atau menggunakan kembali `token_share`. `/dashboard/radar/intel` merender lencana hanya berdasarkan metadata cache lokal yang terverifikasi.

CLI menyediakan `omniroute radar status` dan `omniroute radar sync`. Keduanya hanya berkomunikasi dengan API OmniRoute lokal. `status` melakukan `GET /api/radar/status` hanya-baca; `sync` mengirim satu `POST /api/radar/sync-all` dan mencetak hasil untuk setiap feed. Tidak satu pun dari kedua perintah tersebut membaca, menerima, atau mencetak kunci supporter, dan keduanya tidak menghubungi layanan Radar secara langsung.

---

## Tautan referral (kredit gratis)

Tautan referral disajikan dari feed **mandiri yang selalu terkini** —
`GET /v1/referrals/latest` — yang terpisah dari feed katalog. Hal ini disengaja: feed
katalog pada tingkat komunitas merupakan snapshot yang dapat berusia hingga 30 hari, sehingga
tautan referral yang diekstrak darinya sebelumnya tertinggal dari daftar tautan aktual di server
dengan durasi yang sama (referral yang baru ditambahkan tidak akan sampai kepada pengguna
gratis/komunitas hingga satu bulan). Feed referral menghilangkan penundaan tersebut dengan
melakukan sinkronisasi sendiri pada interval yang jauh lebih singkat.

```ts
// Isi respons GET /v1/referrals/latest (ditandatangani dengan Ed25519, menggunakan kunci tersemat
// yang sama dengan feed katalog):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministik: max(updatedAt) di seluruh tautan
                                  // referral, sehingga dua permintaan identik menghasilkan byte
                                  // bertanda tangan/tanda tangan yang persis sama
  referrals: {
    fixed: RadarReferral[],      // tersedia di SETIAP tingkat, termasuk tanpa autentikasi/komunitas
    campaigns: RadarReferral[],  // hanya diisi untuk kunci Bearer aktif (pendukung) yang valid;
                                  // permintaan tanpa autentikasi/dengan kunci kedaluwarsa mendapatkan []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Tidak seperti feed katalog, isi ini sama sekali tidak memiliki field `tier` — server menentukan
apa yang disertakan untuk setiap permintaan berdasarkan kunci `Authorization`, sehingga header
respons `x-omniroute-feed-tier` merupakan SATU-SATUNYA sumber untuk tingkat yang disajikan
(`referralsSync.ts::syncRadarReferrals`); header yang tidak ada/tidak dikenali diturunkan menjadi
`"community"`, yaitu asumsi dengan hak akses paling rendah. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) memvalidasi seluruh isi, dengan menggunakan kembali
`RadarReferralSchema` per-referral yang sama, yang diekspor dari `feedSchema.ts`, sehingga kedua
feed memvalidasi masing-masing referral secara identik. Setiap `RadarReferral.url` harus berupa
`https://` — URL `http://` gagal dalam validasi skema.

Field `referrals` LAMA yang tertanam dalam katalog pada `RadarFeedSchema` (`feedSchema.ts`)
dipertahankan untuk kompatibilitas mundur dengan feed katalog yang sudah di-cache, tetapi
`getRadarReferrals()` tidak lagi membacanya — lihat [Aksesori](#accessor) di bawah.

### Sinkronisasi

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) adalah SATU-SATUNYA modul yang
mengakses jaringan untuk referral, dengan meniru kontrak `syncRadar()` secara persis: flag
nonaktif → `disabled`; keikutsertaan false → `opt_out`; mengunduh
`${RADAR_FEED_URL}/v1/referrals/latest` (override fork `RADAR_FEED_URL`/`RADAR_FEED_PUBKEY`
yang sama seperti katalog), memverifikasi tanda tangan Ed25519 atas byte respons yang persis
(`verifyFeedBytes`), memvalidasinya terhadap `RadarReferralsFeedSchema`, dan menyimpannya
dalam cache di tabel `radar_referrals_cache` (migrasi `142_radar_referrals_cache.sql`) —
tabel yang sepenuhnya terpisah dari `radar_feed_cache` milik katalog. Batas respons 10 MB
dan batas bawah `generatedAt` menolak feed masuk yang lebih lama daripada feed dalam cache,
sehingga melindungi dari pemutaran ulang artefak bertanda tangan yang lebih lama. Timestamp
yang sama diterima: server sengaja memberikan `generatedAt` deterministik yang sama kepada
varian referral komunitas dan aktif, sehingga payload bertanda tangan dan tingkat yang disajikan
dapat berubah setelah perubahan kunci pendukung tanpa perubahan pada kumpulan tautan yang
mendasarinya. Tidak pernah melempar pengecualian — selalu mengembalikan objek status; error
tidak pernah menyertakan stack trace dalam `reason`.

Dua pemicu menjaga cache referral tetap hangat, dan keduanya tidak bergantung pada interval
24 jam milik katalog:

- **Sinkronisasi saat dibaca** — `GET /api/radar/referrals` sendiri memanggil
  `syncRadarReferrals()` secara inline setiap kali cache tidak ada atau lebih lama daripada
  `REFERRALS_STALE_MS` (1 jam, `shouldSyncReferralsOnRead()`), sebelum menyajikan respons.
  Inilah yang membuat tautan tetap "selalu terkini" pada pemuatan dasbor berikutnya, tanpa harus
  menunggu timer latar belakang apa pun.
- **Sinkronisasi samping scheduler** — `radarSchedulerTick()` (`scheduler.ts`) secara independen
  mengevaluasi kedaluwarsa referral pada tick per jam yang sama dengan yang digunakan untuk
  katalog, dengan memanggil `syncRadarReferrals()` saat waktunya tiba. Ini berjalan tanpa
  memedulikan apakah katalog sendiri harus disinkronkan pada tick tersebut, dan tidak pernah
  memengaruhi bentuk `RadarTickResult` (hanya efek samping upaya terbaik, diabaikan jika terjadi
  error).

### Aksesori

`src/lib/radar/index.ts` mengekspor dua aksesori hanya-baca, dan keduanya tidak pernah melempar
pengecualian (kontrak defensif yang sama seperti `getRadarCatalog()` — flag nonaktif, tidak ada
cache, atau payload dalam cache yang rusak semuanya menghasilkan bentuk kosong, bukan error):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  membaca dari `radar_referrals_cache` (melalui `getRadarReferralsCache()`) dan memvalidasi
  melalui `RadarReferralsFeedSchema` — **bukan** cache katalog.
- `getDefaultReferralFor(provider)` → referral `fixed` dengan `isDefault: true` untuk
  penyedia tersebut, atau `null`. Hanya memeriksa `fixed` — kampanye tidak pernah digunakan
  sebagai tautan "default" milik penyedia.

Aturan sebenarnya tentang "referral mana yang menjadi default untuk suatu penyedia" berada di
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), sebuah fungsi murni kecil yang **tidak
mengimpor DB** — fungsi ini aman untuk diimpor ke komponen `"use client"`. `getRadarReferrals`/
`getDefaultReferralFor` (di `index.ts`) mengimpor `@/lib/db/radar` dan oleh karena itu tetap
khusus server; dasbor penyedia mengimpor `referrals.ts` secara langsung alih-alih
`index.ts` (lihat di bawah) untuk menghindari bundling `better-sqlite3` ke browser.

### `GET /api/radar/referrals`

Mengikuti urutan pemeriksaan yang sama persis seperti setiap rute Radar lainnya: `RADAR_ENABLED` nonaktif →
`404` (diperiksa terlebih dahulu, inersia identik per bita); tidak terautentikasi → `401`; jika tidak,
memicu sinkronisasi saat pembacaan (lihat di atas) ketika kedaluwarsa, lalu `200` dengan
`{ fixed, campaigns, tier }` — `tier` berasal langsung dari baris cache (yang mungkin baru saja diperbarui)
dan murni bersifat informatif (mengendalikan teks upsell ringan UI di bawah). Tidak pernah
memproksi server feed secara langsung — sumber rute itu sendiri tidak mengandung pemanggilan `fetch(`;
jaringan hanya pernah diakses di dalam `syncRadarReferrals()`, dengan prinsip hanya-cache-lokal
yang sama seperti `/api/radar/catalog`.

### UI dasbor — tab "Kredit gratis" di `/dashboard/radar`

Menggunakan kembali halaman Radar yang ada (`src/app/(dashboard)/dashboard/radar/page.tsx`) sebagai
tab kedua alih-alih rute baru — mengurangi cakupan perutean/i18n untuk fitur yang merupakan
variasi dari data yang sudah diambil oleh halaman tersebut. Setelah ikut serta, bilah tab menawarkan
**Katalog** (tabel yang sudah ada) dan **Kredit gratis**:

- Tautan tetap dikelompokkan berdasarkan penyedia, masing-masing menampilkan `requiredAction` (jika ada)
  dan tombol `target="_blank" rel="noopener noreferrer"` menuju URL rujukan.
- Kampanye menampilkan hal yang sama, ditambah `validUntil` jika ada.
- Ketika `campaigns` kosong **dan** tingkat yang disajikan adalah `community`, UI menampilkan
  catatan upsell singkat ("kampanye berbatas waktu merupakan fasilitas tambahan bagi pendukung") — ini **tidak pernah**
  menyembunyikan atau membatasi daftar tautan tetap, yang tetap terisi lengkap untuk setiap tingkat. Pesan
  upsell hanya bersifat ringan, tidak pernah menjadi penghalang.

### Tautan rujukan pada nama penyedia (dasbor penyedia)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
sudah menautkan nama penyedia ke `providerInfo.website` jika tersedia, dengan satu
preseden untuk tautan yang dimonetisasi: catatan tautan mitra Kimi (Moonshot AI)
(kunci i18n `providers.kimiPartnerLinkNote`). D28 menggunakan kembali pola catatan tersembunyi
yang sama persis untuk rujukan default Radar alih-alih memperkenalkan kunci baru.

Keterikatan longgar, sesuai desain:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  adalah fungsi **murni** — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — tanpa dependensi pada `@/lib/radar` atau `@/lib/db/*`. `providerPageUtils.ts` secara
  keseluruhan tetap bebas dari impor tersebut (dipastikan oleh
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (komponen `"use client"`) adalah satu-satunya tempat yang diizinkan
  mengambil data Radar — melalui `fetch("/api/radar/referrals")`, pola rute lokal yang sama
  seperti yang digunakan oleh halaman dasbor Radar itu sendiri — dan komponen tersebut menghitung rujukan default
  di sisi klien dengan `findDefaultReferral()` dari `src/lib/radar/referrals.ts` yang bebas DB.
- Saat `RADAR_ENABLED` nonaktif, pengambilan data menghasilkan 404, `referralUrl` tetap `null`, dan
  `resolveProviderHeaderLink()` mengembalikan `website` katalog statis tanpa perubahan — halaman
  penyedia identik per bita dengan sebelum fitur ini ada. Hasilnya sama ketika
  belum ada cache atau tidak ada rujukan default untuk penyedia tertentu tersebut.
- Ketika rujukan default berlaku, `ProviderPageHeader` menerima `isReferralLink`
  dan menampilkan catatan/tooltip tersembunyi yang sama seperti tautan mitra Kimi (menggunakan kembali
  kunci `providers.kimiPartnerLinkNote`) — tidak pernah menggunakan perlakuan visual baru yang terpisah.

---

## Cara meng-host feed secara mandiri

Fork atau pengelola hosting mandiri yang menginginkan kendali penuh atas katalog dapat menjalankan layanan
feed mereka sendiri tanpa mengubah kode klien:

1. Sediakan endpoint `GET /v1/catalog/latest` yang mengembalikan body JSON yang memenuhi
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — dengan `feed:
"omniroute-radar"` pada tingkat teratas, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks`, dan `totals`. Patuhi `x-omniroute-radar-schema: 2`; server yang kompatibel selama transisi
   harus secara default mengarahkan permintaan tanpa header tersebut ke artefak v1 yang ditandatangani secara terpisah.
2. Tandatangani byte respons persisnya dengan pasangan kunci Ed25519 dan kembalikan
   tanda tangan base64 dalam header respons `x-omniroute-feed-signature`.
3. Atur `RADAR_FEED_URL` ke URL dasar baru dan `RADAR_FEED_PUBKEY` ke
   kunci publik yang sesuai (SPKI DER base64 atau PEM) — lihat
   [referensi variabel lingkungan](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Aktifkan `RADAR_ENABLED` dan ikut serta melalui `POST /api/radar/settings`
   (`{ optIn: true }`).

Tidak diperlukan perubahan kode lainnya — `verifyFeedBytes()` mengambil penggantian tersebut
secara otomatis (`getFeedPublicKeys()` di `src/lib/radar/pinnedKeys.ts`), dan perbandingan
versi, validasi skema, serta aturan penggabungan diterapkan secara identik pada feed yang di-host
secara mandiri.

Tautan rujukan (lihat [Tautan rujukan (kredit gratis)](#referral-links-free-credits)
di atas) merupakan artefak opsional yang terpisah: fork yang hanya menyediakan `/v1/catalog/latest`
tetap berfungsi sepenuhnya — `syncRadarReferrals()` menurun secara aman menjadi `{ status: "error" }` saat menerima `404`
dari `/v1/referrals/latest` dan cache tetap kosong, sehingga
`GET /api/radar/referrals` terus mengembalikan `{ fixed: [], campaigns: [], tier: null }`
alih-alih menyebabkan bagian halaman lainnya gagal. Untuk turut menawarkan tautan rujukan, sediakan
`GET /v1/referrals/latest` yang memenuhi `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) dan tandatangani dengan pasangan kunci Ed25519 yang sama seperti
feed katalog.

Penawaran pendukung merupakan artefak opsional lainnya. Untuk menyediakannya, implementasikan
`GET /v1/offers/latest` dengan `RadarOffersFeedSchema` tertutup
(`src/lib/radar/offersFeedSchema.ts`), wajibkan hak akses aktif, kembalikan
`x-omniroute-feed-tier: live`, dan tandatangani byte persisnya dengan kunci yang sama. Fork yang tidak menyediakan
endpoint ini mempertahankan perilaku katalog/rujukan tanpa perubahan; penyegaran penawaran gagal tanpa merusak data dan
cache penawaran lokal terakhir yang telah diverifikasi tetap tersedia.

Intel juga bersifat opsional dengan cara yang sama. Pengelola hosting mandiri dapat menyediakan `GET /v1/intel/latest` menggunakan
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), mewajibkan hak akses aktif, mengembalikan
`x-omniroute-feed-tier: live`, dan menandatangani byte persisnya dengan kunci Ed25519 bersama. Tidak menyediakan
endpoint tersebut tidak mengubah katalog, rujukan, dan penawaran; penyegaran Intel mempertahankan snapshot lokal
terakhir yang telah diverifikasi.

---

## Dokumentasi terkait

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — pola
  respons kesalahan yang diikuti oleh rute `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — referensi `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
