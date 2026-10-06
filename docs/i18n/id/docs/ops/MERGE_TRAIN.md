# Merge Queue & Manual Merge-Train Runbook (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Sejak v3.8.49 (WS3.2/WS3.4 dari rencana kualitas/kecepatan), jalur merge default untuk
PR yang telah ditinjau ke `release/vX.Y.Z` adalah **antrean merge Mergify** (`.mergify.yml`);
**merge-train manual** yang didokumentasikan di bawah ini merupakan JALUR CADANGAN — digunakan selama insiden,
pembekuan rilis, atau jika paket Open Source Mergify berubah.

## Jalur default: antrean Mergify

1. PR ditinjau/dinyatakan hijau oleh kampanye dan disetujui melalui gerbang ⭐
   pra-merge milik pemilik (laporan + keputusan per item — lihat `/merge-prs` Langkah 0.75).
2. Pemilik (atau sesi yang bertindak berdasarkan keputusan pemilik) menerapkan label
   **`queue`**. Label tersebut MERUPAKAN persetujuan merge; Mergify hanya mengeksekusinya.
3. Mergify mengelompokkan hingga 10 PR yang diantrekan, memvalidasi batch terhadap fast-gates,
   lalu melakukan merge (squash). Batch merah **dibagi dua secara otomatis** — PR yang bermasalah
   diisolasi dalam ~log2(N) validasi ulang dan dikeluarkan dari antrean; sisanya dilanjutkan.
4. Setelah merge, workflow continuous release-green memvalidasi tip baru saat push
   dan membuka issue atribusi jika kombinasi tersebut mengalami regresi (tidak pernah melakukan auto-revert).

Pagar pengaman (mencerminkan `CLAUDE.md` Hard Rules #21/#22):

- **Pembekuan rilis sedang berlaku** → JANGAN memberi label pada PR yang menargetkan branch yang dibekukan; ubah target ke
  `release/vX+1` yang aktif terlebih dahulu.
- **PR yang sedang dikerjakan oleh sesi lain** → jangan pernah memberinya label; hanya sesi pemilik
  yang memasukkan pekerjaannya sendiri ke antrean.
- Diff khusus pengujian dan PR berlabel `hotfix` sudah menjalankan CI yang dikurangi (lihat
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); kondisi antrean menerima set pemeriksaan apa pun
  yang benar-benar dijalankan (`#check-failure=0` + `#check-pending=0`).

## Jalur cadangan: merge-train manual

Digunakan saat antrean tidak tersedia. Ini membakukan praktik yang menuntaskan 33 PR dalam
satu hari selama siklus v3.8.47:

1. **Susun batch** (~10–30 PR yang telah ditinjau+disetujui). Periksa benturan `linked:`
   (`tap.testFiles` yang sama, bagian CHANGELOG yang sama) dan proses PR tersebut secara berurutan.
2. **Validasi SEKALI**: dalam worktree terisolasi dari tip rilis, merge semua head
   batch secara lokal, lalu jalankan rangkaian pengujian yang setara dengan rilis
   (`npm run check:release-green`, tambahkan `--with-build` sebelum rilis).
   `scripts/release/merge-train.sh <base> <PR#>…` mengotomatiskan langkah 1–2 (PR yang berkonflik
   dikeluarkan, train tetap berlanjut). Mode penuh menjalankan `npm run test:unit` — runner
   yang disesuaikan untuk mesin tersebut (`--test-concurrency=20`), **bukan** dua shard CI 4-core
   berurutan, yang membuat fase dominan hanya menggunakan ~25% dari mesin 16-core (diperbaiki
   2026-07-18). `--fast` (untuk menuntaskan mega-train dalam hari yang sama, disetujui pemilik pada 2026-07-18)
   mempertahankan setiap gerbang statis + vitest, tetapi hanya menjalankan file node:test yang diubah oleh
   PR yang masuk ke train; rangkaian LENGKAP tetap harus dijalankan setidaknya sekali per hari pada
   tip terakumulasi (satu train tanpa `--fast`).
3. **Hijau** → merge PR secara berurutan (periksa ulang `state,headRefOid` sebelum masing-masing merge —
   PR yang head-nya berubah harus ditinjau ulang). Buktikan bahwa diff bersih dari setiap merge adalah
   perubahan milik PR itu sendiri (jangan melakukan revert melalui auto-resolve: audit `git diff --stat` untuk
   penghapusan di luar cakupan).
4. **Merah** → bagi batch menjadi dua bagian (validasi setiap bagian), alih-alih memvalidasi ulang
   satu per satu; kembalikan PR yang bermasalah ke antrean peninjauan beserta buktinya.
5. **Jangan pernah**: melakukan merge ke branch yang dibekukan selama pembekuan; menggunakan `git stash` di mana pun;
   menjalankan ulang CI secara menyeluruh dengan harapan status merah akan hilang (aturan: status merah adalah informasi).

## Tingkatan (mengapa antrean aman hanya dengan fast-gates)

- **Per PR** (fast-gates quality.yml): pengujian yang terdampak TIA + unit lengkap 4-shard +
  vitest + kumpulan lint + typecheck + integritas dokumentasi/changelog.
- **Per batch/tip** (continuous release-green): gerbang KERAS `--quick` pada setiap push ke
  branch rilis; pemeriksaan menyeluruh `--with-build --full-ci` 3×/hari.
- **Per rilis** (ci.yml pada PR rilis): matriks lengkap termasuk E2E ×9,
  package-artifact + boot-smoke tarball, coverage/ratchets.

Tidak ada yang divalidasi lebih sedikit daripada sebelumnya — cakupan berat hanya dijalankan per batch/tip,
bukan per PR, dan inilah yang menghilangkan perjalanan bolak-balik O(N).
