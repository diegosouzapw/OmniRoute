# Merge Queue & Manual Merge-Train Runbook (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Sejak v3.8.49 (WS3.2/WS3.4 dalam pelan quality/velocity), laluan gabungan lalai bagi
PR yang telah disemak ke dalam `release/vX.Y.Z` ialah **baris gilir gabungan Mergify** (`.mergify.yml`);
**tren gabungan manual** yang didokumenkan di bawah ialah PILIHAN SANDARAN — digunakan semasa insiden,
pembekuan keluaran, atau jika pelan Sumber Terbuka Mergify berubah.

## Laluan lalai: baris gilir Mergify

1. PR disemak/diluluskan oleh kempen dan diluluskan oleh gerbang ⭐ prapenggabungan
   pemilik (laporan + keputusan setiap item — lihat `/merge-prs` Langkah 0.75).
2. Pemilik (atau sesi yang bertindak berdasarkan keputusan pemilik) menggunakan label
   **`queue`**. Label tersebut MERUPAKAN kelulusan penggabungan; Mergify hanya
   melaksanakannya.
3. Mergify mengesahkan PR dalam baris gilir **secara bersiri** (satu demi satu)
   berdasarkan gerbang pantas dan menggabungkannya (squash). Pengelompokan + pembahagian
   dua automatik ialah ciri peringkat Mergify berbayar ("Cannot use Merge Queue batch"
   pada pelan percuma, #7220), maka `.mergify.yml` tidak menetapkan `batch_size`;
   pengelompokan kekal sebagai tugas tren penggabungan manual di bawah. PR yang
   semakannya masih belum selesai selepas `checks_timeout` (240 min = 2× p95 terukur
   bagi `quality.yml`) dikeluarkan daripada baris gilir dan bukannya menyekat baris
   gilir.
4. Selepas penggabungan, aliran kerja hijau keluaran berterusan mengesahkan tip baharu
   ketika push dan membuka isu atribusi jika gabungan tersebut mengalami regresi
   (tidak sekali-kali membuat pembalikan automatik).

Langkah perlindungan (mencerminkan Peraturan Tegas #21/#22 dalam `CLAUDE.md`):

- **Pembekuan keluaran sedang berkuat kuasa** → JANGAN labelkan PR yang menyasarkan
  cabang beku; sasarkan semula kepada `release/vX+1` yang aktif terlebih dahulu.
- **PR sedang diproses milik sesi lain** → jangan sekali-kali melabelkannya; hanya sesi
  pemilik boleh memasukkan kerjanya sendiri ke dalam baris gilir.
- Perbezaan yang melibatkan ujian sahaja dan PR berlabel `hotfix` telah pun menjalankan
  CI terhad (lihat `RELEASE_CHECKLIST.md` → Laluan Pantas Hotfix); syarat baris gilir
  menerima apa-apa set semakan yang benar-benar dijalankan (`#check-failure=0` +
  `#check-pending=0`).

## Pilihan sandaran: tren gabungan manual

Digunakan apabila baris gilir tidak tersedia. Ini memformalkan amalan yang menyelesaikan 33 PR dalam
satu hari semasa kitaran v3.8.47:

1. **Himpunkan kelompok** (~10–30 PR yang telah disemak+diluluskan). Semak pertembungan `linked:`
   (`tap.testFiles` yang sama, bahagian CHANGELOG yang sama) dan proseskan perkara tersebut secara bersiri.
2. **Sahkan SEKALI**: dalam worktree terpencil daripada tip keluaran, gabungkan semua head kelompok
   secara setempat, kemudian jalankan suite yang setara dengan keluaran
   (`npm run check:release-green`, tambah `--with-build` sebelum keluaran).
   `scripts/release/merge-train.sh <base> <PR#>…` mengautomatikkan langkah 1–2 (PR yang bercanggah
   dikeluarkan, tren diteruskan). Mod penuh menjalankan `npm run test:unit` — pelaksana yang
   ditala untuk mesin (`--test-concurrency=20`), **bukan** dua serpihan CI 4-teras berjujukan,
   yang menyebabkan fasa dominan menggunakan ~25% daripada mesin 16-teras (dibetulkan pada
   2026-07-18). `--fast` (pengosongan tren mega dalam hari yang sama, diluluskan pemilik pada 2026-07-18)
   mengekalkan setiap get statik + vitest tetapi hanya menjalankan fail node:test yang diubah oleh
   PR yang menaiki tren; suite PENUH masih mesti dijalankan sekurang-kurangnya sekali sehari pada
   tip terkumpul (satu tren tanpa `--fast`).
3. **Hijau** → gabungkan PR secara berurutan (semak semula `state,headRefOid` sebelum setiap satu —
   PR yang head-nya berubah akan kembali ke baris gilir semakan). Buktikan perbezaan bersih bagi setiap gabungan ialah
   perubahan PR itu sendiri (tiada pengembalian auto-resolve: audit `git diff --stat` untuk
   pemadaman di luar skop).
4. **Merah** → bahagi dua kelompok tersebut (sahkan setiap separuh) dan bukannya mengesahkan semula
   satu demi satu; kembalikan PR yang bermasalah ke baris gilir semakan berserta bukti.
5. **Jangan sekali-kali**: gabungkan ke dalam cabang beku semasa pembekuan; gunakan `git stash` di mana-mana;
   jalankan semula CI secara menyeluruh dengan harapan status merah hilang (peraturan: merah ialah maklumat).

## Penentuan peringkat (sebab baris gilir selamat dengan get pantas sahaja)

- **Setiap PR** (get pantas quality.yml): ujian yang terjejas oleh TIA + unit penuh 4 serpihan +
  vitest + himpunan lint + typecheck + integriti dokumentasi/changelog.
- **Setiap kelompok/tip** (release-green berterusan): get KERAS `--quick` pada setiap tolakan ke
  cabang keluaran; sapuan penuh `--with-build --full-ci` 3×/hari.
- **Setiap keluaran** (ci.yml pada PR keluaran): matriks lengkap termasuk E2E ×9,
  artifak pakej + boot-smoke tarball, coverage/ratchets.

Tiada apa-apa yang kurang disahkan berbanding sebelum ini — permukaan berat hanya dijalankan bagi setiap kelompok/tip
dan bukannya bagi setiap PR, dan inilah yang menghapuskan perjalanan ulang-alik O(N).

## Prasyarat checkout baharu untuk `merge-train.sh`

Skrip menjalankan **prapenerbangan** gagal-pantas pada checkout akar (sebelum sebarang kerja worktree)
supaya pemasangan yang rosak tidak sekali-kali boleh menyamar sebagai tren merah:

1. `npm ci`, kemudian jalankan postinstall `bun` yang disekat oleh npm:
   `(cd node_modules/bun && node install.js)` — jika tidak, `check:provider-consistency`
   dan `check:known-symbols` (kedua-duanya `bun scripts/…`) gagal pada tren DAN pangkalan tanpa
   baris pelanggaran.
2. Tiada `node_modules/node_modules` yang tidak sepatutnya (pepohon kebergantungan pendua; React dimuatkan dua kali
   dan suite vitest UI gagal serta-merta).
3. `node_modules/.bin/tsc` wujud dan boleh dilaksanakan (pemasangan separa tidak memilikinya).

Tren menjalankan `npm run check:cycles:ratchet` yang menyekat; `npm run check:cycles`
semata-mata bersifat nasihat (ia menyenaraikan SCC dan keluar dengan kod bukan sifar walaupun pada pangkalan yang sihat).
