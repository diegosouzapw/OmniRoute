# ADR: Pluggable persistence boundary (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Status:** Dicadangkan — memerlukan kelulusan penyelenggara sebelum kerja masa jalan bermula
- **Isu penjejakan:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Skop:** Seni bina pengekalan sahaja; keputusan ini tidak menambah atau memilih pangkalan data luaran

## Konteks

OmniRoute kini menyediakan fungsi pengekalan berorientasikan domain daripada `src/lib/db/`, manakala
sambungan dikongsi yang dikembalikan oleh `src/lib/db/core.ts` melaksanakan kontrak segerak `SqliteAdapter`
dalam `src/lib/db/adapters/types.ts`. Penyesuai tersebut menyokong beberapa masa jalan SQLite, tetapi
antara mukanya kekal berbentuk SQLite: pernyataan disediakan yang segerak, `pragma`, transaksi tertunda
dan serta-merta, sandaran asli/salinan fail, titik semak, dan pemegang pangkalan data setempat.

Laluan permulaan dan pemulihan semasa juga menguruskan kitaran hayat fail SQLite. `src/lib/db/core.ts`
menyelesaikan `storage.sqlite`, menyelenggara satu penyesuai global proses, menjalankan titik semak WAL,
mengekalkan jadual terpilih semasa pemulihan, dan mengalih keluar fail pendamping SQLite apabila membina
semula pangkalan data. Pemilihan pemacu dalam `src/lib/db/adapters/driverFactory.ts` memilih antara masa
jalan SQLite yang disokong; ia bukan abstraksi bahagian belakang luaran.

Evolusi skema juga terikat dengan cara yang sama. `src/lib/db/migrationRunner.ts` menggunakan fail SQL
bernombor, memeriksa `sqlite_master` dan `PRAGMA table_info`, mengesan sokongan FTS5 pilihan, dan menjalankan
kerja migrasi dalam transaksi SQLite. Modul operasi seperti `src/lib/db/backup.ts` dan
`src/lib/db/optimizationSettings.ts` menggunakan semantik sandaran, `PRAGMA`, WAL, saiz halaman,
auto-vakum, dan `VACUUM` secara langsung.

Ini merupakan sifat yang sah bagi penggunaan SQLite terbenam. Sifat tersebut harus terus tersedia tanpa
memaksa PostgreSQL atau MySQL meniru API SQLite.

## Keputusan

Gunakan sempadan pengekalan dua peringkat untuk keadaan tahan lama yang mudah alih:

1. **Kontrak repositori domain** mentakrifkan operasi pengekalan yang diperlukan oleh kod perniagaan dan
   penghalaan. Pemanggil bergantung pada tingkah laku domain dan data domain, bukannya teks SQL, pernyataan
   disediakan, fail pangkalan data, atau objek dialek.
2. **Kontrak bahagian belakang tak segerak dalaman** menyokong pelaksanaan repositori dengan konteks
   transaksi, kesihatan/kesediaan, penyelarasan migrasi, keupayaan bahagian belakang, dan ralat terkelas.
   Antara muka TypeScript yang tepat akan dicadangkan bersama PR pelaksanaan pertama dan dibuktikan melalui
   ujian pematuhan; ADR ini sengaja tidak memuktamadkan API spekulatif.

SQLite kekal sebagai pelaksanaan lalai. Turutan sandaran pemacu SQLite sedia ada dan `SqliteAdapter`
segerak kekal di sebalik pelaksanaan repositori SQLite sementara domain dimigrasikan dalam hirisan
menegak kecil. Tiada pengguna yang diwajibkan untuk mengkonfigurasi perkhidmatan luaran.

PostgreSQL ialah pelaksanaan luaran pertama yang dicadangkan selepas sempadan repositori dibuktikan
terhadap SQLite. MySQL menyusul sebagai pelaksanaan setara berdasarkan set ujian pematuhan yang sama,
bukannya sebagai cabang logik perniagaan kedua.

## Peraturan sempadan

### Antara muka repositori mudah alih

Repositori mudah alih boleh mendedahkan:

- pembacaan dan penulisan domain;
- operasi atomik eksplisit dan akses repositori berskop transaksi;
- operasi perbandingan/kemas kini atau pajakan apabila semantik keserentakan merupakan sebahagian daripada domain;
- penomboran halaman, pengisihan, dan ralat kekangan yang neutral terhadap bahagian belakang.

Kesihatan bahagian belakang, kesediaan, dan penyelarasan migrasi tergolong dalam kontrak bahagian
belakang/operasi dalaman dan bukannya dalam repositori domain individu.

Repositori mudah alih tidak boleh mendedahkan:

- `prepare`, `get`, `all`, `run`, atau pemegang pemacu mentah;
- `PRAGMA`, mod titik semak WAL, `VACUUM`, atau penalaan halaman/cache;
- laluan fail SQLite, fail pendamping, atau sandaran salinan fail;
- `lastInsertRowid` sebagai kontrak domain merentas bahagian belakang;
- sintaks FTS5 atau `sqlite-vec`;
- jalan keluar dialek generik yang digunakan oleh kod perniagaan biasa.

### Antara muka keupayaan bahagian belakang

Tingkah laku khusus bahagian belakang kekal eksplisit dan mudah ditemukan. Penyelenggaraan khusus SQLite
kekal di sebalik pelaksanaan dan antara muka operasinya sendiri, termasuk:

- pemilihan pemacu masa jalan;
- titik semak WAL dan tingkah laku penutupan SQLite;
- tetapan saiz halaman, saiz cache, dan auto-vakum;
- sandaran, pemulihan, dan pemulihan bencana fail pangkalan data;
- pemeriksaan kendiri skema SQLite;
- integrasi FTS5 dan `sqlite-vec`.

Bahagian belakang luaran tidak diwajibkan untuk meniru ciri tersebut. Repositori mesti sama ada menggunakan
keupayaan mudah alih, menyediakan pelaksanaan khusus bahagian belakang dengan tingkah laku yang
didokumenkan, atau melaporkan bahawa sesuatu keupayaan tidak tersedia.

## Model transaksi dan migrasi

API repositori mentakrifkan operasi perniagaan atomik; pemanggil tidak memilih mod transaksi SQL.
Setiap operasi mesti mentakrifkan jaminan keserentakan yang boleh diperhatikan: invarian yang dilindungi, pengesanan konflik, pengelasan percubaan semula, jangkaan idempotensi dan perambatan konteks transaksi.
Pelaksanaan boleh menggunakan mekanisme transaksi dan pengasingan yang berbeza hanya apabila jaminan yang boleh diperhatikan tersebut kekal setara. SQLite boleh terus menggunakan tingkah laku transaksi tertangguh atau serta-merta semasanya secara dalaman apabila ia memenuhi kontrak operasi.

Bahagian belakang luaran memerlukan pemilikan migrasi yang eksplisit supaya berbilang replika aplikasi tidak berlumba untuk melaksanakan perubahan skema yang sama. Sejarah migrasi bahagian belakang boleh berkongsi pencapaian logik, tetapi fail SQL SQLite tidak dianggap mudah alih atau boleh digunakan semula sebagai dialek lain.

## Semantik pematuhan rentas bahagian belakang

Ujian pematuhan mesti merangkumi tingkah laku, bukan hanya tandatangan kaedah repositori. Setiap domain yang dimigrasikan mesti mentakrifkan dan mengesahkan:

- zon waktu, ketepatan dan pensirian cap masa;
- jangkaan pengisihan `NULL`, kolasi dan kepekaan huruf besar-kecil;
- perwakilan JSON dan tingkah laku perbandingan;
- ketepatan integer, perpuluhan dan kewangan;
- pengisihan stabil dan pemutus seri deterministik untuk penomboran halaman;
- penjanaan ID tanpa bergantung pada ID baris SQLite;
- pengelasan pelanggaran keunikan dan kunci asing;
- tingkah laku baris terjejas untuk operasi tanpa perubahan, banding/kemas kini dan pemadaman;
- hasil penulisan serentak, konflik yang boleh dicuba semula dan percubaan semula idempoten.

Jika sesuatu domain tidak dapat menyatakan semantik boleh diperhatikan yang setara, domain tersebut belum mudah alih dan mesti kekal khusus kepada bahagian belakang sehingga kontrak itu direka bentuk.

## Keperluan keserasian

Sebarang pelaksanaan yang mengikuti ADR ini mesti mengekalkan sifat berikut:

- SQLite kekal sebagai lalai tanpa konfigurasi.
- Fail SQLite dan sejarah migrasi sedia ada kekal boleh dibaca.
- npm, Electron, Docker dan sandaran SQLite untuk persekitaran masa jalan terhad mengekalkan laluan permulaan semasa masing-masing.
- Bukti kelayakan penyedia yang disimpan terus menggunakan tingkah laku penyulitan aplikasi sedia ada.
- Migrasi repositori tidak mengubah semantik penghalaan, kuota, kunci API atau audit secara senyap.
- Tingkah laku sandaran dan pemulihan didokumentasikan bagi setiap bahagian belakang dan bukannya dibentangkan sebagai universal.
- Pemasangan SQLite sahaja yang bersih tidak memuatkan atau memerlukan pemacu pangkalan data luaran.

## Urutan penyampaian

1. Terbitkan inventori pergantungan SQLite yang boleh dihasilkan semula sebagai artifak semakan berasingan.
2. Perkenalkan kontrak repositori domain pertama dan ujian pematuhan.
3. Sesuaikan pelaksanaan SQLite sedia ada di sebalik kontrak tersebut tanpa mengubah lalai.
4. Tertakluk pada kelulusan penyelenggara, tambahkan PostgreSQL sebagai pelaksanaan luaran pertama untuk satu
   bahagian satah kawalan yang terbatas.
5. Luaskan keadaan dikongsi hanya selepas ujian penulisan serentak dan pemilikan migrasi tersedia.
6. Tambahkan laluan migrasi SQLite-ke-luaran yang luar talian dan disahkan sebelum mengiklankan penukaran pangkalan data.
7. Tambahkan MySQL berdasarkan kontrak repositori dan bahagian belakang yang telah terbukti.

Setiap langkah masa jalan ialah PR berasingan yang boleh disemak. Langkah kemudian tidak boleh digunakan untuk mewajarkan penggabungan abstraksi yang belum terbukti dalam langkah lebih awal.

## Bahagian pelaksanaan pertama

Bahagian runtime pertama hendaklah dipilih selepas inventori gandingan disemak. Sambungan
penyedia, kunci API, kombo dan konfigurasi penghalaan merupakan calon kerana jadual asasnya
kelihatan dalam `src/lib/db/core.ts`, tetapi ADR ini tidak meluluskan senarai jadual atau PR migrasi.
Bahagian tersebut mesti merangkumi:

- ujian pengekalan tingkah laku SQLite;
- ujian pematuhan repositori;
- sempadan transaksi yang dinyatakan secara eksplisit;
- pengesahan penyulitan dan penyuntingan untuk kelayakan yang disimpan;
- tiada perubahan pada konfigurasi permulaan lalai.

## Alternatif yang dipertimbangkan

### Tambahkan PostgreSQL di bawah `SqliteAdapter`

Ditolak. `SqliteAdapter` ialah lapisan keserasian untuk runtime SQLite dan mendedahkan operasi
khusus SQLite. Meniru antara muka tersebut akan menyebabkan andaian segerak dan khusus dialek
terbawa ke dalam backend baharu.

### Dedahkan API pertanyaan/pelaksanaan generik kepada semua domain

Ditolak sebagai sempadan utama. Pendekatan ini akan memusatkan pengendalian sambungan tetapi
membiarkan gandingan dialek SQL, transaksi dan jadual dalam modul perniagaan. Primitif backend
peringkat rendah boleh wujud dalam pelaksanaan repositori, bukan sebagai API pengekalan yang
dihadapkan kepada aplikasi.

### Tulis semula semua pengekalan sebelum mengesahkan satu bahagian

Ditolak. Permukaan pengekalan semasa adalah luas dan merangkumi kitar hayat fail, pemulihan,
carian dan tetapan operasi. Bahagian menegak menyediakan tingkah laku yang boleh disemak serta
sempadan pengembalian semula.

### Gantikan SQLite sebagai lalai

Ditolak. Penggunaan terbenam dan desktop bergantung pada model permulaan sifar perkhidmatan
semasa. Backend luaran ialah pilihan ikut serta.

### Gunakan Redis sebagai autoriti tahan lama

Ditolak. Redis boleh menyokong penyelarasan sementara yang dinyatakan secara eksplisit, cache atau
pembilang, tetapi tidak menggantikan kontrak repositori tahan lama yang diterangkan di sini.

## Akibat

### Positif

- Kod perniagaan memperoleh lapisan pemisah pengekalan yang stabil dan bebas daripada dialek pangkalan data.
- Tingkah laku SQLite diuji sebelum backend luaran menentukan abstraksi.
- PostgreSQL dan MySQL berkongsi kontrak dan ujian dan bukannya menduplikasi logik domain.
- Keupayaan khusus SQLite kekal sebagai ciri kelas pertama dan bukannya menjadi penyesuai keserasian yang membocorkan butiran pelaksanaan.
- Tingkah laku migrasi dan transaksi berbilang replika menjadi pertimbangan reka bentuk yang eksplisit.

### Kos dan risiko

- Pengekstrakan repositori memerlukan migrasi tapak panggilan secara berperingkat.
- Sempadan tak segerak mungkin merebak melalui kod perkhidmatan yang kini segerak.
- Semantik merentas backend memerlukan ujian pematuhan yang melangkaui keserasian sintaks SQL.
- Sandaran, carian, storan vektor dan penyelenggaraan kekal khusus kepada keupayaan masing-masing.
- Menjalankan lebih daripada satu pelaksanaan pengekalan meningkatkan kos CI dan sokongan operasi.

## Bukan matlamat

ADR ini tidak:

- menambahkan kebergantungan pangkalan data, pemboleh ubah persekitaran, skema atau migrasi;
- mengubah singleton SQLite aktif atau lata pemacu;
- menjanjikan sokongan PostgreSQL atau MySQL dalam keluaran tertentu;
- menjadikan FTS5, `sqlite-vec`, fail sandaran atau penyelenggaraan SQLite mudah alih;
- mentakrifkan kesiapsiagaan aktif-aktif sebelum ujian keadaan dikongsi dan penyelarasan tersedia;
- meluluskan penulisan semula sekali gus bagi `src/lib/db/`.

## Soalan terbuka untuk kelulusan penyelenggara

1. Adakah repositori serta sempadan backend tak segerak dalaman merupakan arah yang diutamakan, atau patutkah
   kegigihan luaran ditempatkan di belakang perkhidmatan satah kawalan yang berasingan?
2. Adakah PostgreSQL boleh diterima sebagai pelaksanaan luaran pertama selepas pematuhan SQLite?
3. Domain manakah yang patut menjadi skop repositori terbatas yang pertama?
4. Keadaan manakah yang mesti dikongsi untuk pencapaian berbilang replika yang pertama, dan yang manakah kekal setempat pada nod?
5. Tempoh keserasian apakah yang diperlukan untuk migrasi repositori yang terganggu atau dikembalikan kepada keadaan sebelumnya?

Sehingga soalan-soalan ini diselesaikan, dokumen ini merupakan cadangan dan tiada pemfaktoran semula masa jalan tersirat.
