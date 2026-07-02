# Rencana Cakupan Pengujian (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../bn/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../fa/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../gu/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../mr/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../sw/docs/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../ta/docs/COVERAGE_PLAN.md) · 🇮🇳 [te](../../te/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../ur/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md)

---

Terakhir diperbarui: 2026-03-28

## Baseline

Ada beberapa angka cakupan tergantung pada cara laporan dihitung. Untuk keperluan perencanaan, hanya satu yang berguna.

| Metrik               | Ruang Lingkup                                                        | Pernyataan / Garis | Cabang   | Fungsi    | Catatan                                                                  |
| -------------------- | -------------------------------------------------------------------- | -----------------: | -------: | --------: | ------------------------------------------------------------------------ |
| Lama                 | `npm run test:coverage` lama                                         |             79.42% |   75.15% |    67.94% | Diperbesar: menghitung file pengujian dan mengecualikan `open-sse`       |
| Diagnostik           | Hanya sumber, mengecualikan pengujian dan mengecualikan `open-sse`   |             68.16% |   63.55% |    64.06% | Berguna hanya untuk mengisolasi `src/**`                                 |
| Baseline yang disarankan | Hanya sumber, mengecualikan pengujian dan menyertakan `open-sse` |             56.95% |   66.05% |    57.80% | Ini adalah baseline seluruh proyek yang perlu ditingkatkan               |

Baseline yang disarankan adalah angka yang perlu dioptimalkan.

## Aturan

- Target cakupan berlaku untuk file sumber, bukan untuk `tests/**`.
- `open-sse/**` adalah bagian dari produk dan harus tetap dalam cakupan.
- Kode baru tidak boleh mengurangi cakupan di area yang disentuh.
- Utamakan pengujian perilaku dan hasil cabang dibandingkan detail implementasi.
- Utamakan database SQLite sementara dan fixture kecil dibandingkan mock yang luas untuk `src/lib/db/**`.

## Kumpulan perintah saat ini

- `npm run test:coverage`
  - Gerbang cakupan sumber utama untuk suite pengujian unit
  - Menghasilkan `text-summary`, `html`, `json-summary`, dan `lcov`
- `npm run coverage:report`
  - Laporan per-file terperinci dari jalankan terakhir
- `npm run test:coverage:legacy`
  - Hanya untuk perbandingan historis

## Tonggak Pencapaian

| Fase    |                  Target | Fokus                                                              |
| ------- | ----------------------: | ------------------------------------------------------------------ |
| Fase 1  | 60% pernyataan / garis  | Kemenangan cepat dan cakupan utilitas berisiko rendah              |
| Fase 2  | 65% pernyataan / garis  | Fondasi DB dan rute                                                |
| Fase 3  | 70% pernyataan / garis  | Validasi penyedia dan analitik penggunaan                          |
| Fase 4  | 75% pernyataan / garis  | Penerjemah dan pembantu `open-sse`                                 |
| Fase 5  | 80% pernyataan / garis  | Handler dan cabang eksekutor `open-sse`                            |
| Fase 6  | 85% pernyataan / garis  | Kasus tepi yang lebih sulit, utang cabang, suite regresi           |
| Fase 7  | 90% pernyataan / garis  | Pemeriksaan akhir, penutupan celah, ratchet ketat                  |

Cabang dan fungsi harus meningkat secara bertahap di setiap fase, tetapi target keras utama adalah pernyataan / garis.

## Titik panas prioritas

File atau area berikut menawarkan keuntungan terbaik untuk fase selanjutnya:

1. `open-sse/handlers`
   - `chatCore.ts` pada 7.57%
   - Direktori keseluruhan pada 29.07%
2. `open-sse/translator/request`
   - Direktori keseluruhan pada 36.39%
   - Banyak penerjemah masih mendekati cakupan satu digit
3. `open-sse/translator/response`
   - Direktori keseluruhan pada 8.07%
4. `open-sse/executors`
   - Direktori keseluruhan pada 36.62%
5. `src/lib/db`
   - `models.ts` pada 20.66%
   - `registeredKeys.ts` pada 34.46%
   - `modelComboMappings.ts` pada 36.25%
   - `settings.ts` pada 46.40%
   - `webhooks.ts` pada 33.33%
6. `src/lib/usage`
   - `usageHistory.ts` pada 21.12%
   - `usageStats.ts` pada 9.56%
   - `costCalculator.ts` pada 30.00%
7. `src/lib/providers`
   - `validation.ts` pada 41.16%
8. File utilitas dan API berisiko rendah untuk keuntungan awal
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`

## Daftar periksa eksekusi

### Fase 1: 56.95% -> 60%

- [x] Perbaiki metrik cakupan agar mencerminkan kode sumber, bukan file pengujian
- [x] Simpan skrip cakupan lama untuk perbandingan
- [x] Catat baseline dan titik panas di dalam repo
- [ ] Tambahkan pengujian terfokus untuk utilitas berisiko rendah:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Tambahkan pengujian rute untuk:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Fase 2: 60% -> 65%

- [ ] Tambahkan pengujian berbasis DB untuk:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Cakup perilaku cabang dalam:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Fase 3: 65% -> 70%

- [ ] Tambahkan pengujian analitik penggunaan untuk:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Perluas cakupan rute untuk manajemen proxy dan cabang pengaturan

### Fase 4: 70% -> 75%

- [ ] Cakup pembantu penerjemah dan jalur penerjemahan sentral:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Fase 5: 75% -> 80%

- [ ] Tambahkan pengujian tingkat handler untuk:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Tambahkan cakupan cabang eksekutor untuk autentikasi spesifik penyedia, percobaan ulang, dan penggantian endpoint

### Fase 6: 80% -> 85%

- [ ] Gabungkan lebih banyak suite kasus tepi ke dalam jalur cakupan utama
- [ ] Tingkatkan cakupan fungsi untuk modul DB dengan cakupan konstruktor/pembantu yang lemah
- [ ] Tutup celah cabang dalam `settings.ts`, `registeredKeys.ts`, `validation.ts`, dan pembantu penerjemah

### Fase 7: 85% -> 90%

- [ ] Perlakukan file dengan cakupan rendah yang tersisa sebagai pemblokir
- [ ] Tambahkan pengujian regresi untuk setiap bug produksi yang belum tercakup yang diperbaiki selama pendakian ke 90%
- [ ] Naikkan gerbang cakupan di CI hanya setelah baseline lokal stabil selama setidaknya dua jalankan berurutan

## Kebijakan ratchet

Perbarui ambang batas `npm run test:coverage` hanya setelah proyek benar-benar melampaui tonggak berikutnya dengan buffer yang nyaman.

Urutan ratchet yang disarankan:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Urutan adalah `pernyataan-garis / cabang / fungsi`.

## Celah yang diketahui

Perintah cakupan saat ini mengukur suite unit Node utama dan menyertakan sumber yang dapat dijangkau darinya, termasuk `open-sse`. Perintah ini belum menggabungkan cakupan Vitest ke dalam satu laporan terpadu. Penggabungan tersebut layak dilakukan nanti, tetapi bukan pemblokir untuk memulai pendakian 60% -> 80%.
