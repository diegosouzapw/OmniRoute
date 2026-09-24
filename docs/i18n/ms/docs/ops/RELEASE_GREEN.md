# Release-Green: keeping the queue and release branch green (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Masalah yang diselesaikan oleh ini

**Gerbang penuh** (`.github/workflows/ci.yml` — serpihan unit, vitest, ratchet,
`package-artifact`, SonarQube, E2E) berjalan **hanya pada PR keluaran** (PR → `main`). PR yang menyasarkan
`release/**` menerima **gerbang pantas** (`quality.yml`: ujian yang terjejas oleh TIA + semakan jenis + lint)
dan, untuk perubahan kod, binaan pengeluaran **berbentuk nasihat**. Akibatnya: kegagalan yang hanya berlaku semasa keluaran masih boleh
terkumpul secara senyap pada cabang keluaran dan **meletup secara berlapis-lapis selama ~40 minit** ketika waktu keluaran,
satu demi satu.

"Keluarga release-green" diwujudkan untuk **menjangkakan** kegagalan tersebut — mengesahkan proses yang setara dengan gerbang penuh
**secara setempat / di luar proses keluaran**, pada bila-bila masa, supaya PR keluaran sudah
lulus pada pelaksanaan CI pertamanya.

> **Prinsip yang tidak boleh dirunding:** tiada satu pun daripada ini menyekat penyumbang. Kami tidak menambahkan semakan wajib
> yang menggagalkan PR mereka. **Hanyutan** (ratchet) adalah untuk penyelenggara menetapkan semula garis dasar semasa keluaran —
> bukan kebimbangan penyumbang. Tiada mana-mana komponen yang **menutup** PR (mencuri kredit) atau
> **melemahkan** ujian agar lulus.

## Keluarga ini (4 komponen) — dan cara setiap satunya berjalan secara bebas

| Komponen                                                                       | Apakah ia                                                                               | Bila perlu dijalankan                                                     | Skop                                  |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------- |
| **`/green-prs`** (Penyelesaian A)                                              | Imbasan atas permintaan oleh penyelenggara terhadap **baris gilir PR terbuka**          | **Secara bebas, berkala** — dan khususnya **sebelum** `/generate-release` | Seluruh baris gilir PR → `release/**` |
| **`/validate-release-green`** (Penyelesaian C — `npm run check:release-green`) | Enjin pengesahan: menghasilkan semula gerbang penuh terhadap cabang ATAU calon gabungan | Secara bebas, pada bila-bila masa                                         | Cabang tertentu atau PR gabungan      |
| **`/babysit <PR#>`**                                                           | Memacu **CI langsung** bagi **satu** PR sehingga lulus                                  | Secara bebas, bagi setiap PR                                              | Satu PR                               |
| **`nightly-release-green.yml`** (Penyelesaian D)                               | Aliran kerja malam automatik; membuka isu apabila berlaku kegagalan KERAS               | Automatik (cron)                                                          | Cabang keluaran aktif                 |

**Jawapan ringkas kepada "adakah ini hanya untuk keluaran?":** **tidak.** `/green-prs` direka untuk
dijalankan **secara berkala, antara keluaran**. Menjalankannya secara bebas ialah penggunaan biasa — keluaran hanyalah
saat apabila pelaksanaannya memberikan nilai paling tinggi.

## Binaan nasihat PR-ke-keluaran

`quality.yml` kini menyertakan `Build (advisory)` untuk PR kod bukan draf dan cabang baris gilir Mergify.
Ia mencerminkan resipi binaan pengeluaran daripada `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime`, dan `npm run build` dengan `OMNIROUTE_USE_TURBOPACK=1`. Ia sengaja
tidak memuat naik artifak binaan kerana tiada kerja kualiti hiliran menggunakan artifak tersebut dalam aliran kerja ini.
Alih keluar `continue-on-error` selepas satu minggu pelaksanaan PR keluaran yang stabil supaya isyarat tersebut menjadi
gerbang PR-ke-keluaran yang menyekat.

## Penyelesaian C — `npm run check:release-green` (enjin)

Menghasilkan semula pengesahan yang setara dengan keluaran terhadap pepohon kerja semasa dan mengelaskan setiap kegagalan:

- **HARD** (semakan jenis, ralat lint, unit, vitest, db-rules, public-creds, pilihan
  `package-artifact`) → **kecacatan sebenar**; `exit 1`. Dibaiki pada cabang sumber (TDD, Peraturan #18).
- **DRIFT** (**amaran** eslint, kerumitan kognitif, saiz fail) → hanyutan takuk yang terkumpul dalam
  kitaran, **bukan kesalahan penyumbang**; ia hanya dilaporkan dan **ditetapkan semula garis dasarnya oleh penyelenggara semasa
  keluaran**. Hanyutan **tidak pernah** mengubah kod keluar — jadi ia tidak pernah menyekat sesiapa.

```bash
npm run check:release-green                 # cabang semasa (pepohon kerja)
node scripts/quality/validate-release-green.mjs --json   # output berstruktur
node scripts/quality/validate-release-green.mjs --quick  # melangkau unit+vitest (hanyutan+semakan jenis+lint sahaja)
node scripts/quality/validate-release-green.mjs --with-build  # menyertakan package-artifact (perlahan)
```

Hanya mendiagnosis dan **melaporkan** (tiada pembaikan automatik). Orkestrasi pembaikan-hingga-lulus terletak dalam
`/green-prs` dan `/review-prs`.

## Penyelesaian A — `/green-prs` (imbasan baris gilir)

Prosedur (ringkasan — lihat kemahiran `green-prs` untuk butiran):

1. **Inventori** baris gilir PR terbuka terhadap cabang keluaran aktif.
2. **Triage** setiap PR (berdaya maju / wajar ditolak / memerlukan pengarang) — yang ditolak/memerlukan pengarang
   **dilaporkan, bukan ditutup** (pengarang yang memutuskan).
3. Bagi setiap PR yang berdaya maju, dalam **pepohon kerja terpencil** (Peraturan #19), selaraskan PR dengan hujung keluaran dan jalankan
   `npm run check:release-green`:
   - **HARD** → baiki **pada cabang penyumbang** melalui pengarang bersama (mengekalkan status "Merged" pengarang),
     jalankan semula sehingga semua HARD diselesaikan.
   - **DRIFT** → biarkannya; garis dasarnya akan ditetapkan semula semasa keluaran.
4. **Laporkan** jadual PR × (keputusan, kegagalan HARD, dibaiki?, DRIFT, kini lulus keluaran?).

Boleh **menyediakan** baris gilir tanpa menggabungkan; hanya menggabungkan apabila diminta secara jelas — dan tidak pernah menutup PR.

## Kekerapan yang disyorkan

- Jalankan **`/green-prs` secara berkala** (contohnya, setiap minggu) dan **sentiasa sebelum
  `/generate-release`**.
- Kekalkan **`nightly-release-green.yml`** (Penyelesaian D) sebagai isyarat berterusan: apabila ia membuka
  isu kegagalan HARD, sudah tiba masanya untuk melakukan imbasan.
- Gunakan **`/validate-release-green`** secara ad hoc untuk menyemak cabang atau calon gabungan tertentu.
- Gunakan **`/babysit <PR#>`** apabila PR tertentu perlu dipastikan lulus pada CI langsung.

## Hubungan dengan keluaran

- `/generate-release` memanggil pengesahan dalam **Fasa 0 (pra-penerbangan)**: menetapkan semula garis dasar DRIFT dan membaiki
  HARD sebelum membuka PR keluaran.
- `/review-prs` menggunakan gerbang lulus-keluaran pada langkah keputusan gabungan (lulus-sebelum-gabung).

Matlamat semua komponen adalah sama: **PR keluaran yang lulus pada pelaksanaan CI pertama**, dan bukannya menangani
kegagalan dalam lapisan 40 minit pada hari keluaran.
