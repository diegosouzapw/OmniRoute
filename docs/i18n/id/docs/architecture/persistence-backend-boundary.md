# ADR: Pluggable persistence boundary (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Status:** Diusulkan — memerlukan persetujuan pengelola sebelum pekerjaan runtime dimulai
- **Isu pelacakan:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Cakupan:** Hanya arsitektur persistensi; keputusan ini tidak menambahkan atau memilih basis data eksternal

## Konteks

OmniRoute saat ini menyediakan fungsi persistensi berorientasi domain dari `src/lib/db/`, sementara
koneksi bersama yang dikembalikan oleh `src/lib/db/core.ts` mengimplementasikan kontrak sinkron
`SqliteAdapter` dalam `src/lib/db/adapters/types.ts`. Adaptor tersebut mendukung beberapa runtime SQLite, tetapi
antarmukanya tetap berbentuk SQLite: prepared statement sinkron, `pragma`, transaksi tertunda dan langsung,
pencadangan native/penyalinan file, checkpoint, serta handle basis data lokal.

Jalur startup dan pemulihan saat ini juga mengelola siklus hidup file SQLite. `src/lib/db/core.ts`
menentukan lokasi `storage.sqlite`, mempertahankan satu adaptor global untuk setiap proses, melakukan checkpoint WAL, mempertahankan
tabel tertentu selama pemulihan, dan menghapus file pendamping SQLite saat membangun ulang basis data. Pemilihan
driver dalam `src/lib/db/adapters/driverFactory.ts` memilih di antara runtime SQLite yang didukung;
ini bukan abstraksi backend eksternal.

Evolusi skema juga terikat dengan cara serupa. `src/lib/db/migrationRunner.ts` menerapkan file SQL bernomor,
memeriksa `sqlite_master` dan `PRAGMA table_info`, mendeteksi dukungan FTS5 opsional, serta menjalankan
pekerjaan migrasi dalam transaksi SQLite. Modul operasional seperti `src/lib/db/backup.ts` dan
`src/lib/db/optimizationSettings.ts` secara langsung menggunakan semantik pencadangan, `PRAGMA`, WAL, ukuran halaman, auto-vacuum, dan `VACUUM`.

Hal-hal tersebut merupakan karakteristik yang valid dari penerapan SQLite tertanam. Semua itu harus tetap tersedia tanpa
memaksa PostgreSQL atau MySQL untuk meniru API SQLite.

## Keputusan

Mengadopsi batas persistensi dua tingkat untuk status persisten yang portabel:

1. **Kontrak repositori domain** mendefinisikan operasi persistensi yang dibutuhkan oleh kode bisnis dan perutean.
   Pemanggil bergantung pada perilaku domain dan data domain, bukan pada teks SQL, prepared statement,
   file basis data, atau objek dialek.
2. **Kontrak backend asinkron internal** mendukung implementasi repositori dengan
   konteks transaksi, kesehatan/kesiapan, koordinasi migrasi, kapabilitas backend, dan
   kesalahan yang diklasifikasikan. Antarmuka TypeScript yang tepat akan diusulkan bersama PR implementasi pertama
   dan dibuktikan melalui pengujian kesesuaian; ADR ini sengaja tidak menetapkan API spekulatif.

SQLite tetap menjadi implementasi default. Rangkaian pemilihan driver SQLite yang ada dan
`SqliteAdapter` sinkron tetap berada di balik implementasi repositori SQLite sementara domain dimigrasikan
dalam irisan vertikal kecil. Tidak ada pengguna yang diwajibkan mengonfigurasi layanan eksternal.

PostgreSQL adalah implementasi eksternal pertama yang diusulkan setelah batas repositori terbukti
berfungsi dengan SQLite. MySQL menyusul sebagai implementasi sejawat berdasarkan rangkaian pengujian kesesuaian yang sama,
bukan sebagai percabangan logika bisnis kedua.

## Aturan batas

### Antarmuka repositori portabel

Repositori portabel dapat mengekspos:

- pembacaan dan penulisan domain;
- operasi atomik eksplisit dan akses repositori dalam cakupan transaksi;
- operasi pembandingan/pembaruan atau penyewaan ketika semantik konkurensi merupakan bagian dari domain;
- paginasi, pengurutan, dan kesalahan constraint yang netral terhadap backend.

Kesehatan backend, kesiapan, dan koordinasi migrasi merupakan bagian dari kontrak backend/operasional internal,
bukan bagian dari repositori domain individual.

Repositori portabel tidak boleh mengekspos:

- `prepare`, `get`, `all`, `run`, atau handle driver mentah;
- `PRAGMA`, mode checkpoint WAL, `VACUUM`, atau penyetelan halaman/cache;
- path file SQLite, file pendamping, atau pencadangan melalui penyalinan file;
- `lastInsertRowid` sebagai kontrak domain lintas backend;
- sintaks FTS5 atau `sqlite-vec`;
- jalur pintas dialek generik yang digunakan oleh kode bisnis normal.

### Antarmuka kapabilitas backend

Perilaku khusus backend tetap eksplisit dan dapat ditemukan. Pemeliharaan khusus SQLite tetap berada di balik
implementasi dan antarmuka operasionalnya sendiri, termasuk:

- pemilihan driver runtime;
- checkpoint WAL dan perilaku penghentian SQLite;
- pengaturan ukuran halaman, ukuran cache, dan auto-vacuum;
- pencadangan, pemulihan, dan recovery file basis data;
- introspeksi skema SQLite;
- integrasi FTS5 dan `sqlite-vec`.

Backend eksternal tidak diwajibkan meniru fitur-fitur tersebut. Repositori harus menggunakan
kapabilitas portabel, menyediakan implementasi khusus backend dengan perilaku yang terdokumentasi, atau melaporkan
bahwa suatu kapabilitas tidak tersedia.

## Model transaksi dan migrasi

API repositori mendefinisikan operasi bisnis atomik; pemanggil tidak memilih mode transaksi SQL.
Setiap operasi harus mendefinisikan jaminan konkurensi yang dapat diamati: invarian yang dilindungi, deteksi konflik, klasifikasi percobaan ulang, ekspektasi idempotensi, dan propagasi konteks transaksi.
Implementasi dapat menggunakan mekanisme transaksi dan isolasi yang berbeda hanya jika jaminan yang dapat diamati tersebut tetap ekuivalen. SQLite dapat terus menggunakan perilaku transaksi deferred atau immediate saat ini secara internal selama memenuhi kontrak operasi.

Backend eksternal memerlukan kepemilikan migrasi yang eksplisit agar beberapa replika aplikasi tidak mengalami kondisi balapan saat menerapkan perubahan skema yang sama. Riwayat migrasi backend dapat memiliki tonggak logis yang sama, tetapi file SQL SQLite tidak diasumsikan portabel atau dapat digunakan kembali untuk dialek lain.

## Semantik kesesuaian lintas backend

Pengujian kesesuaian harus mencakup perilaku, bukan hanya tanda tangan metode repositori. Setiap domain yang dimigrasikan harus mendefinisikan dan memverifikasi:

- zona waktu, presisi, dan serialisasi timestamp;
- ekspektasi pengurutan `NULL`, kolasi, dan sensitivitas huruf besar-kecil;
- representasi JSON dan perilaku perbandingan;
- presisi bilangan bulat, desimal, dan nilai moneter;
- pengurutan stabil dan kriteria pemutus seri yang deterministik untuk paginasi;
- pembuatan ID tanpa bergantung pada ID baris SQLite;
- klasifikasi pelanggaran keunikan dan foreign key;
- perilaku jumlah baris terdampak untuk operasi no-op, perbandingan/pembaruan, dan penghapusan;
- hasil penulisan konkuren, konflik yang dapat dicoba ulang, dan percobaan ulang yang idempoten.

Jika suatu domain tidak dapat menyatakan semantik teramati yang ekuivalen, domain tersebut belum portabel dan harus tetap khusus untuk backend tertentu sampai kontrak tersebut dirancang.

## Persyaratan kompatibilitas

Setiap implementasi yang mengikuti ADR ini harus mempertahankan properti berikut:

- SQLite tetap menjadi opsi default tanpa konfigurasi.
- File SQLite dan riwayat migrasi yang sudah ada tetap dapat dibaca.
- Fallback SQLite untuk npm, Electron, Docker, dan runtime terbatas tetap menggunakan jalur startup saat ini.
- Kredensial penyedia yang tersimpan tetap menggunakan perilaku enkripsi aplikasi yang sudah ada.
- Migrasi repositori tidak secara diam-diam mengubah semantik perutean, kuota, API key, atau audit.
- Perilaku pencadangan dan pemulihan didokumentasikan per backend, bukan disajikan sebagai perilaku universal.
- Instalasi bersih yang hanya menggunakan SQLite tidak memuat atau memerlukan driver database eksternal.

## Urutan penyampaian

1. Publikasikan inventaris keterikatan SQLite yang dapat direproduksi sebagai artefak peninjauan terpisah.
2. Perkenalkan kontrak repositori domain pertama dan pengujian kesesuaian.
3. Adaptasikan implementasi SQLite yang ada di balik kontrak tersebut tanpa mengubah opsi default.
4. Dengan persetujuan pengelola, tambahkan PostgreSQL sebagai implementasi eksternal pertama untuk satu
   bagian control plane yang dibatasi.
5. Perluas status bersama hanya setelah pengujian penulisan konkuren dan kepemilikan migrasi tersedia.
6. Tambahkan jalur migrasi SQLite-ke-eksternal yang offline dan tervalidasi sebelum mengiklankan peralihan database.
7. Tambahkan MySQL berdasarkan kontrak repositori dan backend yang telah terbukti.

Setiap langkah runtime merupakan PR terpisah yang dapat ditinjau. Langkah berikutnya tidak boleh digunakan untuk membenarkan penggabungan abstraksi yang belum terbukti pada langkah sebelumnya.

## Bagian implementasi pertama

Bagian runtime pertama harus dipilih setelah inventarisasi keterkaitan ditinjau. Koneksi penyedia, API key, combo, dan konfigurasi routing merupakan kandidat karena tabel dasarnya terlihat di `src/lib/db/core.ts`, tetapi ADR ini tidak menyetujui daftar tabel atau PR migrasi. Bagian tersebut harus mencakup:

- pengujian untuk mempertahankan perilaku SQLite;
- pengujian kesesuaian repositori;
- batas transaksi yang eksplisit;
- verifikasi enkripsi dan redaksi untuk kredensial yang disimpan;
- tidak ada perubahan pada konfigurasi startup default.

## Alternatif yang dipertimbangkan

### Menambahkan PostgreSQL di bawah `SqliteAdapter`

Ditolak. `SqliteAdapter` adalah lapisan kompatibilitas untuk runtime SQLite dan mengekspos operasi khusus SQLite. Mengemulasikan antarmuka tersebut akan membocorkan asumsi sinkron dan khusus dialek ke backend baru.

### Mengekspos API query/execute generik ke semua domain

Ditolak sebagai batas utama. Pendekatan ini akan memusatkan penanganan koneksi, tetapi membiarkan keterkaitan dialek SQL, transaksi, dan tabel tetap berada di modul bisnis. Primitif backend tingkat rendah dapat tersedia di dalam implementasi repositori, bukan sebagai API persistensi yang digunakan aplikasi.

### Menulis ulang seluruh persistensi sebelum memvalidasi satu bagian

Ditolak. Cakupan persistensi saat ini luas dan mencakup siklus hidup file, pemulihan, pencarian, serta pengaturan operasional. Bagian vertikal menyediakan batas perilaku dan rollback yang dapat ditinjau.

### Mengganti SQLite sebagai default

Ditolak. Deployment embedded dan desktop bergantung pada model startup tanpa layanan seperti saat ini. Backend eksternal bersifat opt-in.

### Menggunakan Redis sebagai otoritas durabel

Ditolak. Redis dapat mendukung koordinasi, cache, atau penghitung yang secara eksplisit bersifat sementara, tetapi tidak menggantikan kontrak repositori durabel yang dijelaskan di sini.

## Konsekuensi

### Positif

- Kode bisnis memperoleh lapisan persistensi stabil yang independen dari dialek database.
- Perilaku SQLite diuji sebelum backend eksternal menentukan abstraksinya.
- PostgreSQL dan MySQL berbagi kontrak dan pengujian, alih-alih menduplikasi logika domain.
- Kapabilitas khusus SQLite tetap menjadi kapabilitas utama, bukan shim kompatibilitas yang membocorkan detail implementasi.
- Perilaku migrasi dan transaksi multi-replika menjadi pertimbangan desain yang eksplisit.

### Biaya dan risiko

- Ekstraksi repositori memerlukan migrasi call site secara bertahap.
- Batas async dapat merambat ke kode layanan yang saat ini sinkron.
- Semantik lintas backend memerlukan pengujian kesesuaian yang melampaui kompatibilitas sintaks SQL.
- Backup, pencarian, penyimpanan vektor, dan pemeliharaan tetap bersifat khusus kapabilitas.
- Menjalankan lebih dari satu implementasi persistensi meningkatkan biaya CI dan dukungan operasional.

## Bukan tujuan

ADR ini tidak:

- menambahkan dependensi database, environment variable, skema, atau migrasi;
- mengubah singleton SQLite aktif atau rangkaian fallback driver;
- menjanjikan dukungan PostgreSQL atau MySQL dalam rilis tertentu;
- menjadikan FTS5, `sqlite-vec`, file backup, atau pemeliharaan SQLite portabel;
- menetapkan kesiapan active-active sebelum tersedia pengujian shared-state dan koordinasi;
- menyetujui penulisan ulang sekaligus atas `src/lib/db/`.

## Pertanyaan terbuka untuk persetujuan pengelola

1. Apakah repositori beserta batas backend async internal merupakan arah yang diutamakan, atau haruskah
   persistensi eksternal ditempatkan di balik layanan control-plane terpisah?
2. Apakah PostgreSQL dapat diterima sebagai implementasi eksternal pertama setelah konformitas SQLite?
3. Domain mana yang harus menjadi bagian repositori terbatas pertama?
4. State mana yang harus dibagikan untuk milestone multi-replika pertama, dan mana yang tetap bersifat lokal pada node?
5. Rentang kompatibilitas apa yang diperlukan untuk migrasi repositori yang terhenti atau dibatalkan?

Hingga pertanyaan-pertanyaan ini diselesaikan, dokumen ini merupakan proposal dan tidak menyiratkan refaktorisasi runtime apa pun.
