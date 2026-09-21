# Homologation Suite (`npm run homolog`) (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Pengesahan E2E persekitaran sebenar bagi pelaksanaan OmniRoute yang berjalan pada VPS homologasi
(`HOMOLOG_BASE_URL`, cth. `http://192.168.0.15:20128`). Satu perintah menggantikan senarai semak
manual STOP #2 keluaran dengan pelaksanaan automatik yang menghasilkan bukti.

## Perkara yang diliputi

| Lapisan                  | Perkara yang diperiksa                                                                                                                                                                                     | Pelaksanaan                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — kesihatan/pariti    | `/api/monitoring/health` memberikan respons `200` dengan `status: "healthy"` dan versi yang dijangkakan                                                                                                    | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — kunci sementara    | Log masuk pentadbir → `POST /api/keys` mencipta kunci API berskop untuk pelaksanaan tersebut, yang dibatalkan (`DELETE /api/keys/:id`) dalam blok `finally` tanpa mengira hasilnya                         | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — permukaan API      | Katalog `/v1/models`, pelengkapan sembang bukan penstriman sebenar (model kritikal peringkat, `max_tokens: 5`), respons `401` untuk kunci tidak sah, dan `/api/monitoring/health` awam                     | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — penstriman SSE     | Pelengkapan sembang penstriman sebenar; mengesahkan `text/event-stream`, sekurang-kurangnya satu delta kandungan dan penamat `[DONE]`                                                                      | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — penyedia sebenar    | Satu permintaan sembang berkos minimum bagi setiap penyedia kritikal yang terdapat dalam katalog `/v1/models` langsung, dijana secara dinamik melalui promptfoo                                            | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — pengesahan UI      | Log masuk sekali melalui borang log masuk sebenar dan menggunakan semula sesi (`storageState`) merentas lapisan UI                                                                                         | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — laluan UI          | Setiap `page.tsx` statik di bawah `src/app/(dashboard)/dashboard` (ditemui daripada sistem fail, laluan `[param]` dinamik dilangkau) dimuatkan tanpa ralat HTTP, ralat halaman atau sempadan ralat Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — aliran kritikal UI | Mencipta kunci API melalui UI papan pemuka dan membatalkannya semula (tidak meninggalkan sebarang sisa pada VPS)                                                                                           | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — laporan bersepadu   | Menggabungkan httpYac (melalui `junit-to-ctrf`), penyesuai promptfoo→CTRF dan pelapor CTRF Playwright ke dalam satu `homolog-ctrf.json`, serta `homolog-report/summary.md` yang mudah dibaca manusia       | `scripts/homolog/run.mjs`                                                     |

Tiada penglibatan LLM dalam ulangan itu sendiri — ini ialah set regresi deterministik,
bukannya penilaian. AI hanya digunakan dalam kerja penyelenggaraan akan datang (lihat Pelan Hala Tuju di bawah).

## Prasyarat

1. Salin `.env.homolog.example` ke `.env.homolog` (diabaikan oleh git — jangan sekali-kali mengkomitnya) dan isikan:
   - `HOMOLOG_BASE_URL` — sasaran pelaksanaan, contohnya `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — kata laluan pengurusan papan pemuka untuk pelaksanaan tersebut.
   - `HOMOLOG_CRITICAL_PROVIDERS` — awalan penyedia dipisahkan dengan koma yang menerima
     permintaan sembang semakan ringkas sebenar (contohnya `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — biarkan kosong untuk pelaksanaan biasa; suit ini mencipta dan membatalkan
     kunci sementaranya sendiri. Tetapkan ini hanya untuk menyahpepijat satu lapisan secara berasingan.
2. Jalankan `npm install` dalam repo (kebergantungan suit — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — ialah devDependencies biasa).
3. Jalankan `npx playwright install` jika binari pelayar belum tersedia.

## Cara menjalankan

```bash
npm run homolog
```

Untuk mengesahkan terhadap pelaksanaan yang versinya tidak sepadan dengan `package.json`
setempat (contohnya kotak homologasi yang masih menggunakan keluaran tampalan terdahulu), tindih
versi yang dijangkakan secara eksplisit:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Pelaksanaan tamat dengan kod bukan sifar jika mana-mana lapisan gagal, dan sentiasa cuba membatalkan kunci
API sementara yang diciptanya, walaupun berlaku kegagalan (blok `finally` dalam `scripts/homolog/run.mjs`).

## Membaca laporan

Semua output disimpan dalam `homolog-report/` (diabaikan oleh git):

- `summary.md` — jadual yang sama dicetak ke stdout, satu baris bagi setiap lapisan (✅/❌ + butiran).
- `homolog-ctrf.json` — laporan CTRF bersepadu (gabungan hasil API/SSE, semakan ringkas penyedia dan
  UI) — ini ialah artifak untuk dilampirkan pada senarai semak STOP #2 keluaran.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — laporan
  mentah/perantaraan bagi setiap lapisan.
- `promptfooconfig.yaml`, `provider-misses.json` — konfigurasi promptfoo yang dijana untuk
  pelaksanaan semasa dan mana-mana penyedia kritikal yang tiada dalam katalog aktif.

Kegagalan L0 membatalkan proses serta-merta (tiada kunci sementara dicipta) kerana ketidakpadanan
versi/kesihatan bermakna setiap lapisan seterusnya akan mengesahkan pelaksanaan yang salah.

## Menetapkan semula garis dasar apabila UI berubah secara sah

L4b (semakan ringkas laluan) dan L4c (aliran UI kunci API) dipacu oleh pencari DOM sebenar, bukannya
syot kilat, jadi kebanyakan perubahan UI yang sah tidak memerlukan sebarang kemas kini suit. Apabila sesuatu perubahan
menyebabkan pencari tidak lagi berfungsi (contohnya label butang yang dinamakan semula atau halaman tetapan yang dipindahkan):

1. Sahkan semula pencari berbanding sumber semasa (spesifikasi telah mendokumenkan
   fail/baris yang digunakan untuk mengesahkan setiap pencari — ikuti corak yang sama, jangan meneka).
2. Kemas kini spesifikasi dalam `tests/homolog/ui/`.
3. Jalankan semula `npm run homolog` (atau hanya spesifikasi Playwright yang terjejas) terhadap VPS untuk
   mengesahkan pembaikan, kemudian komit.

Tiada garis dasar visual/piksel dalam suit ini (F1) — lihat Pelan Hala Tuju untuk perkara tersebut.

## Pelan Hala Tuju (F2 / F3)

Reka bentuk dan pelaksanaan berfasa tersedia dalam spesifikasi perancangan dalaman
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (tidak dipautkan — artifak
`_tasks/` dalaman, bukan sebahagian daripada dokumentasi dijejak repo ini). Ringkasan:

- **F2** — rakaman panduan penuh → Playwright Test Agents (`planner`/`generator`)
  menukarkannya kepada spesifikasi aliran (cipta kombo, uji penyedia, edit tetapan, alat MCP) +
  garis dasar regresi visual (Lost Pixel) dengan topeng pada data dinamik (metrik,
  cap masa, log) + rutin penyelenggaraan `healer` bagi setiap keluaran.
- **F3** — liputan daya tahan/kontrak/pendawaian: toxiproxy + penyedia palsu serasi OpenAI
  pada devbox, kombo `homolog-resilience` pada VPS yang menghala kepadanya
  (suntikan tamat masa → sahkan sandaran + pemutus litar dibuka/ditutup melalui
  `/api/monitoring/health`); ujian kontrak Schemathesis berpagar terhadap
  `docs/openapi.yaml` (`--max-examples` rendah, benih tetap, titik akhir bukan LLM sahaja); dan
  menyepadukan `npm run homolog` + `summary.md` miliknya ke dalam fasa STOP #2 `/generate-release`.
