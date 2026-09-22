# Homologation Suite (`npm run homolog`) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Validasi E2E di lingkungan nyata untuk deployment OmniRoute yang berjalan pada VPS homologasi
(`HOMOLOG_BASE_URL`, misalnya `http://192.168.0.15:20128`). Satu perintah menggantikan checklist
STOP #2 rilis manual dengan proses otomatis yang menghasilkan bukti.

## Cakupan pemeriksaan

| Lapisan                | Yang diperiksa                                                                                                                                                                                       | Implementasi                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — kesehatan/paritas | `/api/monitoring/health` merespons `200` dengan `status: "healthy"` dan versi yang diharapkan                                                                                                        | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — kunci sementara  | Login admin → `POST /api/keys` membuat kunci API dengan cakupan terbatas untuk proses tersebut, lalu dicabut (`DELETE /api/keys/:id`) dalam blok `finally` apa pun hasilnya                          | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — permukaan API    | Katalog `/v1/models`, penyelesaian chat non-streaming yang nyata (model kritis untuk tier, `max_tokens: 5`), respons `401` untuk kunci tidak valid, dan endpoint publik `/api/monitoring/health`     | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — streaming SSE    | Penyelesaian chat streaming yang nyata; memastikan `text/event-stream`, setidaknya satu delta konten, dan terminator `[DONE]`                                                                        | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — provider nyata    | Satu permintaan chat berbiaya minimal untuk setiap provider kritis yang ada dalam katalog `/v1/models` aktif, dibuat secara dinamis melalui promptfoo                                                | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — autentikasi UI   | Login satu kali melalui formulir login nyata dan menggunakan kembali sesi (`storageState`) di seluruh lapisan UI                                                                                     | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — rute UI          | Setiap `page.tsx` statis di bawah `src/app/(dashboard)/dashboard` (ditemukan dari sistem berkas, rute `[param]` dinamis dilewati) dimuat tanpa error HTTP, error halaman, atau batas error Next.js   | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — alur kritis UI   | Membuat kunci API melalui UI dashboard dan mencabutnya kembali (tidak meninggalkan residu pada VPS)                                                                                                  | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — laporan terpadu   | Menggabungkan httpYac (melalui `junit-to-ctrf`), adaptor promptfoo→CTRF, dan reporter CTRF Playwright ke dalam satu `homolog-ctrf.json`, serta `homolog-report/summary.md` yang mudah dibaca manusia | `scripts/homolog/run.mjs`                                                     |

Tidak ada keterlibatan LLM dalam replay itu sendiri — ini merupakan rangkaian regresi deterministik,
bukan evaluasi. AI hanya digunakan dalam pekerjaan pemeliharaan mendatang (lihat Roadmap di bawah).

## Prasyarat

1. Salin `.env.homolog.example` ke `.env.homolog` (diabaikan oleh git — jangan pernah melakukan commit terhadapnya) dan isi:
   - `HOMOLOG_BASE_URL` — deployment target, misalnya `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — kata sandi pengelolaan dasbor untuk deployment tersebut.
   - `HOMOLOG_CRITICAL_PROVIDERS` — prefiks penyedia yang dipisahkan koma dan akan menerima
     permintaan smoke chat nyata (misalnya `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — biarkan kosong dalam proses normal; suite akan membuat dan mencabut
     kunci temporernya sendiri. Atur ini hanya untuk men-debug satu lapisan secara terpisah.
2. Jalankan `npm install` di repo (dependensi suite — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — merupakan devDependencies biasa).
3. Jalankan `npx playwright install` jika biner browser belum tersedia.

## Cara menjalankan

```bash
npm run homolog
```

Untuk memvalidasi deployment yang versinya tidak cocok dengan `package.json` lokal
(misalnya server homologasi masih menggunakan rilis patch sebelumnya), timpa versi
yang diharapkan secara eksplisit:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Proses akan keluar dengan status bukan nol jika ada lapisan yang gagal, dan selalu mencoba mencabut
kunci API temporer yang dibuatnya, bahkan saat terjadi kegagalan (blok `finally` dalam `scripts/homolog/run.mjs`).

## Membaca laporan

Semua output disimpan di `homolog-report/` (diabaikan oleh git):

- `summary.md` — tabel yang sama dengan yang dicetak ke stdout, satu baris per lapisan (✅/❌ + detail).
- `homolog-ctrf.json` — laporan CTRF terpadu (gabungan hasil API/SSE, smoke penyedia, dan
  UI) — ini adalah artefak yang harus dilampirkan ke daftar periksa STOP #2 rilis.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — laporan
  mentah/perantara per lapisan.
- `promptfooconfig.yaml`, `provider-misses.json` — konfigurasi promptfoo yang dihasilkan untuk
  proses saat ini dan semua penyedia kritis yang tidak ditemukan dalam katalog aktif.

Kegagalan L0 langsung membatalkan proses (tidak ada kunci temporer yang dibuat) karena ketidakcocokan
versi/kesehatan berarti setiap lapisan berikutnya akan memvalidasi deployment yang salah.

## Menetapkan ulang baseline ketika UI berubah secara sah

L4b (smoke rute) dan L4c (alur UI kunci API) digerakkan oleh locator DOM nyata, bukan
snapshot, sehingga sebagian besar perubahan UI yang sah tidak memerlukan pembaruan suite. Ketika suatu perubahan
memang merusak locator (misalnya label tombol yang diubah atau halaman pengaturan yang dipindahkan):

1. Konfirmasikan ulang locator terhadap sumber saat ini (spec sudah mendokumentasikan
   file/baris tempat setiap locator dikonfirmasi — ikuti pola yang sama, jangan menebak).
2. Perbarui spec di `tests/homolog/ui/`.
3. Jalankan kembali `npm run homolog` (atau hanya spec Playwright yang terdampak) terhadap VPS untuk
   mengonfirmasi perbaikan, lalu lakukan commit.

Tidak ada baseline visual/piksel dalam suite ini (F1) — lihat Roadmap untuk hal tersebut.

## Roadmap (F2 / F3)

Desain dan peluncuran bertahap tersedia dalam spec perencanaan internal
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (tidak ditautkan — artefak
internal `_tasks/`, bukan bagian dari dokumentasi repo yang dilacak). Ringkasan:

- **F2** — perekaman panduan lengkap → Playwright Test Agents (`planner`/`generator`)
  mengubahnya menjadi spec alur (membuat combo, menguji penyedia, mengedit pengaturan, alat MCP) +
  baseline regresi visual (Lost Pixel) dengan mask pada data dinamis (metrik,
  stempel waktu, log) + rutinitas pemeliharaan `healer` untuk setiap rilis.
- **F3** — cakupan ketahanan/kontrak/pengintegrasian: toxiproxy + penyedia palsu yang kompatibel dengan OpenAI
  pada devbox, combo `homolog-resilience` pada VPS yang diarahkan ke penyedia tersebut
  (timeout yang diinjeksi → pastikan fallback + circuit breaker membuka/menutup melalui
  `/api/monitoring/health`); pengujian kontrak Schemathesis berpagar terhadap
  `docs/openapi.yaml` (`--max-examples` rendah, seed tetap, hanya endpoint non-LLM); serta
  mengintegrasikan `npm run homolog` + `summary.md`-nya ke fase STOP #2 `/generate-release`.
