# Release-Green: keeping the queue and release branch green (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Masalah yang diselesaikan

**Gate lengkap** (`.github/workflows/ci.yml` — shard unit, vitest, ratchet,
`package-artifact`, SonarQube, E2E) berjalan **hanya pada PR rilis** (PR → `main`). PR yang menargetkan
`release/**` menerima **fast-gates** (`quality.yml`: pengujian yang terdampak TIA + pemeriksaan tipe + lint)
dan, untuk perubahan kode, build produksi yang bersifat **advisori**. Konsekuensinya: kegagalan yang hanya muncul saat rilis masih dapat
terakumulasi secara diam-diam di branch rilis dan **meledak dalam beberapa lapisan berdurasi ~40 menit** pada waktu rilis,
satu per satu.

"Kelompok release-green" hadir untuk **mengantisipasi** kegagalan tersebut — memvalidasi proses yang setara dengan gate lengkap
**secara lokal / di luar rilis**, kapan saja, sehingga PR rilis sudah
hijau pada eksekusi CI pertamanya.

> **Prinsip yang tidak dapat dinegosiasikan:** semua ini tidak menghambat kontributor. Kami tidak menambahkan pemeriksaan wajib
> yang menggagalkan PR mereka. **Drift** (ratchet) harus ditetapkan ulang baseline-nya oleh pengelola saat rilis —
> tidak pernah menjadi urusan kontributor. Tidak ada bagian yang **menutup** PR (pencurian kredit) ataupun
> **memperlemah** pengujian agar lolos.

## Kelompok ini (4 bagian) — dan cara masing-masing berjalan secara independen

| Bagian                                                                   | Pengertiannya                                                                        | Waktu menjalankan                                                             | Cakupan                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | --------------------------------- |
| **`/green-prs`** (Solusi A)                                              | Pemindaian **antrean PR terbuka** sesuai permintaan oleh pengelola                   | **Secara independen, berkala** — dan terutama **sebelum** `/generate-release` | Seluruh antrean PR → `release/**` |
| **`/validate-release-green`** (Solusi C — `npm run check:release-green`) | Mesin validasi: mereproduksi gate lengkap terhadap sebuah branch ATAU kandidat merge | Secara independen, kapan saja                                                 | Branch tertentu atau merge-PR     |
| **`/babysit <PR#>`**                                                     | Mengarahkan **CI langsung** dari **satu** PR hingga hijau                            | Secara independen, per PR                                                     | Satu PR                           |
| **`nightly-release-green.yml`** (Solusi D)                               | Workflow malam otomatis; membuka issue saat terjadi kegagalan KERAS                  | Otomatis (cron)                                                               | Branch rilis aktif                |

**Jawaban singkat untuk "apakah ini hanya untuk rilis?":** **tidak.** `/green-prs` dirancang untuk
dijalankan **secara berkala, di antara rilis**. Menjalankannya secara independen adalah penggunaan normal — rilis hanyalah
momen ketika menjalankannya menghasilkan manfaat terbesar.

## Build advisory PR-ke-rilis

`quality.yml` kini menyertakan `Build (advisory)` untuk PR kode non-draf dan cabang antrean Mergify.
Ini mencerminkan resep build produksi dari `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime`, dan `npm run build` dengan `OMNIROUTE_USE_TURBOPACK=1`. Build ini sengaja
tidak mengunggah artefak build karena tidak ada job kualitas hilir yang menggunakannya dalam alur kerja ini.
Hapus `continue-on-error` setelah satu minggu eksekusi PR rilis yang stabil agar sinyal tersebut menjadi
gerbang PR-ke-rilis yang bersifat memblokir.

## Solusi C — `npm run check:release-green` (mesin)

Mereproduksi validasi yang setara dengan rilis terhadap working tree saat ini dan mengklasifikasikan setiap status merah:

- **HARD** (typecheck, error lint, unit, vitest, db-rules, public-creds, `package-artifact`
  opsional) → **cacat nyata**; `exit 1`. Diperbaiki pada cabang sumber (TDD, Aturan #18).
- **DRIFT** (**peringatan** eslint, cognitive-complexity, file-size) → pergeseran ratchet yang terakumulasi dalam
  siklus, **bukan kesalahan kontributor**; ini hanya dilaporkan dan **ditetapkan ulang baseline-nya oleh maintainer saat
  rilis**. DRIFT **tidak pernah** mengubah kode keluar — sehingga tidak pernah memblokir siapa pun.

```bash
npm run check:release-green                 # cabang saat ini (working tree)
node scripts/quality/validate-release-green.mjs --json   # output terstruktur
node scripts/quality/validate-release-green.mjs --quick  # melewati unit+vitest (hanya drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # menyertakan package-artifact (lambat)
```

Hanya mendiagnosis dan **melaporkan** (tanpa perbaikan otomatis). Orkestrasi perbaikan hingga hijau berada di
`/green-prs` dan `/review-prs`.

## Solusi A — `/green-prs` (pemindaian antrean)

Prosedur (ringkasan — lihat skill `green-prs` untuk detail):

1. **Inventarisasi** antrean PR terbuka terhadap cabang rilis aktif.
2. **Triage** setiap PR (layak / layak-ditolak / perlu-tindakan-penulis) — yang layak-ditolak/perlu-tindakan-penulis
   **dilaporkan, bukan ditutup** (penulis yang memutuskan).
3. Untuk setiap PR yang layak, dalam **worktree terisolasi** (Aturan #19), bawa PR ke ujung cabang rilis dan jalankan
   `npm run check:release-green`:
   - **HARD** → perbaiki **pada cabang kontributor** melalui kepenulisan bersama (mempertahankan status "Merged" milik penulis),
     jalankan ulang hingga semua HARD terselesaikan.
   - **DRIFT** → biarkan; baseline-nya akan ditetapkan ulang saat rilis.
4. **Laporkan** tabel PR × (verdict, status merah HARD, diperbaiki?, DRIFT, release-green sekarang?).

Dapat **mempersiapkan** antrean tanpa melakukan merge; hanya melakukan merge jika diminta secara eksplisit — dan tidak pernah menutup PR.

## Ritme yang direkomendasikan

- Jalankan **`/green-prs` secara berkala** (misalnya, setiap minggu) dan **selalu sebelum
  `/generate-release`**.
- Pertahankan **`nightly-release-green.yml`** (Solusi D) sebagai sinyal berkelanjutan: ketika alur tersebut membuka
  issue merah HARD, saatnya melakukan pemindaian.
- Gunakan **`/validate-release-green`** sesuai kebutuhan untuk memeriksa cabang atau kandidat merge tertentu.
- Gunakan **`/babysit <PR#>`** ketika PR tertentu perlu didorong hingga hijau pada CI aktif.

## Hubungan dengan rilis

- `/generate-release` memanggil validasi dalam **Fase 0 (pra-penerbangan)**: menetapkan ulang baseline DRIFT dan memperbaiki
  HARD sebelum membuka PR rilis.
- `/review-prs` menggunakan gerbang release-green pada langkah keputusan merge (hijau-sebelum-merge).

Tujuan semua bagian ini sama: **PR rilis yang hijau pada eksekusi CI pertama**, alih-alih mengatasi
status merah lapis demi lapis selama 40 menit pada hari rilis.
