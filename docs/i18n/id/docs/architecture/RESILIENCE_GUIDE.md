# Resilience Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute memiliki tiga mekanisme ketahanan yang berbeda tetapi saling berkaitan. Masing-masing memiliki cakupan dan tujuan yang berbeda. Pisahkan mekanisme tersebut saat men-debug perilaku perutean.

![Model ketahanan 3 lapisan](../diagrams/exported/resilience-3layers.svg)

> Sumber: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Pemutus Sirkuit Penyedia

**Cakupan:** seluruh penyedia (misalnya, `glm`, `openai`, `anthropic`).

**Tujuan:** berhenti mengirimkan lalu lintas ke penyedia yang berulang kali mengalami kegagalan pada tingkat upstream/layanan.

**Implementasi:**

- Kelas inti: `src/shared/utils/circuitBreaker.ts`
- Pengkabelan: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status: `GET /api/monitoring/health`
- API reset: `POST /api/resilience/reset`
- Pembungkus: `open-sse/services/accountFallback.ts`
- Tabel DB: `domain_circuit_breakers`

**Status:**

- `CLOSED` — lalu lintas normal diizinkan
- `DEGRADED` — lalu lintas masih diizinkan, tetapi peningkatan kegagalan penyedia sedang dilacak
- `OPEN` — penyedia diblokir sementara; perutean kombo melewatinya
- `HALF_OPEN` — batas waktu reset telah berlalu; permintaan probe diizinkan

**Nilai default yang dapat dikonfigurasi (`open-sse/config/constants.ts`, tersedia di Dasbor → Pengaturan → Ketahanan):**

| Kelas   | Terdegradasi pada | Terbuka pada | Batas waktu reset |
| ------- | ----------------- | ------------ | ----------------- |
| OAuth   | 5 kegagalan       | 8 kegagalan  | 60s               |
| API-key | 7 kegagalan       | 12 kegagalan | 30s               |
| Lokal   | diturunkan        | 2 kegagalan  | 15s               |

`degradationThreshold` mengontrol kapan penyedia memasuki status `DEGRADED`; `failureThreshold` mengontrol kapan sirkuit terbuka dan penyedia dilewati. Profil penyedia lokal belum ditampilkan pada halaman pengaturan Ketahanan.

**Kode pemicu:** hanya status tingkat penyedia `[408, 500, 502, 503, 504]`. JANGAN memicu untuk kesalahan tingkat akun (sebagian besar 401/403/429 — kesalahan tersebut ditangani oleh cooldown atau penguncian).

**Pemulihan malas:** saat masa `OPEN` berakhir, `getStatus()`, `canExecute()`, `getRetryAfterMs()` memperbarui status menjadi `HALF_OPEN`. Tidak diperlukan timer latar belakang.

---

### Cooldown Penyedia global opsional (gerbang jendela)

Lapisan keempat yang **opsional** (`PROVIDER_COOLDOWN_ENABLED`, secara default **nonaktif**) menyimpan
ingatan lintas permintaan mengenai penyedia yang gagal di
`open-sse/services/providerCooldownTracker.ts`, yang diperiksa oleh resolusi target
kombo agar permintaan kombo berturut-turut berhenti mencoba kembali penyedia yang baru saja
gagal. Entri tingkat penyedia mengikuti gerbang jendela `PROVIDER_PROFILES`:

| Profil  | dipicu setelah (`providerFailureThreshold`) | dalam (`providerFailureWindowMs`) | cooldown selama (`providerCooldownMs`) |
| ------- | ------------------------------------------: | --------------------------------: | -------------------------------------: |
| OAuth   |                                        `10` |                           `15min` |                                 `5min` |
| API key |                                        `15` |                           `30min` |                                `10min` |

Di bawah ambang batas, penyedia **tidak** dianggap berada dalam cooldown; keberhasilan akan menghapus
jendela tersebut. Sebagai gantinya, entri tingkat koneksi (`provider:connectionId`) mempertahankan
backoff eksponensial `minRetryCooldownMs → maxRetryCooldownMs`. Penimpaan:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Pengaman regresi: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown Koneksi

**Cakupan:** satu koneksi/akun/kunci penyedia.

**Tujuan:** melewati satu kunci yang bermasalah sementara koneksi lain untuk penyedia yang sama tetap melayani permintaan.

**Implementasi:**

- Tandai tidak tersedia: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pemilihan: `getProviderCredentials*` dalam file yang sama
- Perhitungan cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Pengaturan: `src/lib/resilience/settings.ts`

**Kolom per koneksi:**

- `rateLimitedUntil` — stempel waktu hingga cooldown berakhir
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — penghitung backoff eksponensial

**Cooldown default:**

- Basis OAuth: 5 dtk
- Basis kunci API: 3 dtk
- Kunci API 429: mengutamakan header upstream `Retry-After`/reset/teks reset yang dapat diurai
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Pelindung anti-thundering-herd:** mencegah kegagalan serentak memperpanjang cooldown secara berlebihan atau menaikkan `backoffLevel` dua kali.

**Status terminal (BUKAN cooldown):**

- `banned` — ditetapkan oleh deteksi kata kunci terlarang / pemblokiran akun (lihat [BAN_DETECTION](../security/BAN_DETECTION.md)), dan oleh tiga penolakan per permintaan dari upstream secara berturut-turut (`request_rejected`, misalnya Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); satu penolakan hanya membuat koneksi memasuki cooldown
- `expired` (bertransisi menjadi terminal setelah percobaan ulang terbatas — `EXPIRED_RETRY_MAX = 3` dengan backoff eksponensial — sehingga galat OAuth sementara dapat pulih dengan sendirinya sebelum akun dinonaktifkan secara permanen)
- `credits_exhausted`

Status tersebut bertahan hingga kredensial berubah atau operator meresetnya. Jangan menimpa status terminal dengan status cooldown sementara.

**Pemulihan malas:** ketika `rateLimitedUntil` telah berlalu, koneksi kembali memenuhi syarat. Setelah berhasil digunakan, `clearAccountError()` menghapus semua kolom galat.

### Batas penggunaan Claude OAuth: jalur berprioritas lebih rendah + reset batas sesi

**Cakupan:** satu koneksi langganan Claude (OAuth). Kedua fitur bersifat **opsional per
koneksi** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` dalam
`providerSpecificData`, keduanya nonaktif secara default) dan mencerminkan perintah `/low-priority` dan
`/limit-reset` milik Claude Code (kontrak protokol direkam dari Claude Code 2.1.263).

**Implementasi:**

- Mesin status + klasifikasi respons: `open-sse/services/claudeLowPriority.ts`
- Klien status/klaim reset: `open-sse/services/claudeLimitReset.ts`
- Hook eksekutor (injeksi header + percobaan ulang dengan akun yang sama): `open-sse/executors/base.ts::execute()`
- Persistensi keikutsertaan: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Pemicu:** batas penggunaan 5 jam — respons `429` yang header-nya memuat
`anthropic-ratelimit-unified-status: rejected` dan, ketika akun memenuhi syarat,
`anthropic-ratelimit-unified-slow-offer: treatment`. Tidak ada yang dikirim sebelum respons
429 batas pertama tersebut; lonjakan 429 tanpa header terpadu diproses melalui jalur cooldown normal.

**Jalur berprioritas lebih rendah** (`lowPriorityMode`):

- Saat menerima 429 batas tersebut, eksekutor menerima penawaran dan segera mencoba ulang dengan akun yang **sama**
  menggunakan `anthropic-usage-limit: slow`; jalur tetap aktif hingga
  `anthropic-ratelimit-unified-reset` yang diumumkan (+60 dtk masa tenggang), dan setiap permintaan
  dalam rentang waktu tersebut membawa header itu. Respons 429 yang dicegat tidak pernah mencapai
  `handleChatCore`, sehingga koneksi **tidak** dimasukkan ke cooldown dan tidak dialihkan.
- `anthropic-ratelimit-unified-slow-status` pada respons berikutnya: `active` / `not_needed`
  mempertahankan jalur; `slot_busy` (429) atau `529` menunggu selama
  `anthropic-ratelimit-unified-slow-retry-after` dari server (default 20 dtk, dibatasi 5–600 dtk, jitter ±30%)
  lalu mencoba ulang, dengan batas `anthropic-ratelimit-unified-slow-max-wait` (default 20 mnt, dibatasi
  1 mnt–6 j) — setelah itu jalur berakhir dan masa jeda 10 menit memblokir penerimaan ulang. Waktu
  tunggu juga dibatasi oleh sisa waktu timeout mulai-upstream milik permintaan itu sendiri
  (`resolveFetchStartTimeout`, default 10 mnt) dikurangi margin 5 dtk: tanpa batas tersebut,
  waktu tunggu maksimum default 20 menit akan melampaui masa hidup permintaan dan proses tidur akan dibatalkan
  di tengah penantian, sehingga memunculkan `TimeoutError`, bukan akhir `max_wait` yang mulus + masa jeda.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, pergantian jendela 5 jam, atau
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (yang mengakhirinya sebagai
  `extra_usage` pada status apa pun, karena kelebihan penggunaan berbayar kini mencakup batas tersebut) mengakhiri jalur;
  respons kemudian diteruskan ke jalur cooldown normal. `budget_exhausted` diingat hingga
  reset anggaran yang diumumkan (≤ 8 hari).
- Pemeriksaan batas dijalankan setelah percobaan ulang intra-upaya yang dipicu oleh 400 milik eksekutor
  (pengeditan konteks, pembatasan thinking/effort, pembelajaran otomatis parameter), sehingga respons 429 batas
  yang baru muncul pada salah satu percobaan ulang tersebut tetap dicegat alih-alih mencapai jalur cooldown.
- Status disimpan dalam memori per koneksi (setelah dimulai ulang, diperlukan satu respons 429 batas tambahan untuk menerimanya kembali).

**Reset batas sesi** (`autoLimitReset`, dicoba sebelum jalur ketika keduanya aktif):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  ketika `arm: "reset"` dan `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` dengan
  `{ "program": "juniper_tide" }` (UUID organisasi dari
  `providerSpecificData.organizationUUID`, dengan fallback bootstrap).
- `result: reset|not_limited` → permintaan dicoba ulang dengan kecepatan penuh (tanpa header lambat).
  `already_used` / `not_offered` menyimpan `next_available_at` (default satu minggu);
  kegagalan apa pun menerapkan backoff selama 15 menit. Reset hanya dapat dilakukan sekali seminggu dan tetap diperhitungkan
  terhadap batas mingguan.

Pelindung regresi: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinitas sesi (#7274)

**Cakupan:** satu sesi klien (header `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) disematkan ke satu koneksi, untuk **penyedia mana pun**.

**Tujuan:** mempertahankan agen multi-turn (Claude Code, aider, agen kustom) pada akun yang sama di seluruh permintaan, sehingga mengurangi hilangnya konteks lintas akun dan 429 cold-start berulang pada penyedia dengan status sesi per akun.

**Implementasi:**

- Resolusi TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pemilihan/pembuatan pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ekstraksi header (generik, penyedia apa pun): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabel pin persisten: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Pengaturan: `sessionAffinityTtlMs` (TTL global dalam ms, `0` menonaktifkan) — `src/lib/db/settings.ts`. Namanya diubah dari `codexSessionAffinityTtlMs` yang hanya untuk Codex melalui migrasi `124_generic_session_affinity_ttl.sql`, yang membawa TTL Codex yang sebelumnya telah dikonfigurasi sebagai nilai default baru.

Sebelum #7274, `resolveSessionAffinityTtlMs()` langsung berhenti dengan nilai `0` untuk setiap penyedia selain `codex`, sehingga pengaturan TTL (dan header sesi) tidak berpengaruh di tempat lain meskipun mekanisme pinning dan ekstraksi header sudah bersifat agnostik terhadap penyedia. Perbaikan tersebut menghapus penghentian dini itu; TTL kini berlaku secara seragam pada setiap penyedia setelah ditetapkan secara global di atas `0`.

Ketiga header afinitas sesi tidak pernah diteruskan ke upstream — eksekutor membuat header upstream mereka sendiri dari awal alih-alih meneruskan header klien, sehingga header tersebut tetap hanya menjadi ID korelasi internal.

### Lease koneksi sesi terkelola eksklusif

**Cakupan:** satu klien/sesi HTTP terkelola yang aktif memiliki satu koneksi OmniRoute yang memenuhi syarat.

**Tujuan:** menyediakan kepemilikan koneksi eksklusif yang tahan lama bagi klien yang memerlukan batas perutean ketat di seluruh permintaan. Hal ini berbeda dari afinitas sesi, yang merupakan preferensi kontinuitas lunak: lease eksklusif mempertahankan status siklus hidup di SQLite, memberlakukan keunikan global untuk pemilik aktif dan koneksi aktif, serta menolak generasi usang sebelum pengiriman ke penyedia.

Fitur ini bersifat opsional untuk setiap kunci API. Kunci terkelola harus memiliki cakupan `lease:exclusive` dan daftar `allowedConnections` eksplisit yang tidak kosong. Klien HTTP mana pun dapat menggunakan endpoint siklus hidup; nama klien, user-agent, penyedia, metode OAuth, maupun model tidak diperlukan. Lease memiliki koneksi, bukan model, sehingga perubahan model mempertahankan pengikatan selama koneksi tetap memenuhi syarat secara normal. Aturan normal terkait model, kuota, kesehatan, cooldown, dan daftar izin tetap menjadi otoritas utama dan dapat memindahkan generasi yang sama ke koneksi bebas lain yang memenuhi syarat.

Siklus hidupnya adalah `POST /api/v1/session-leases` dengan tindakan JSON `acquire`, `renew`, dan `release`. Permintaan inferensi terkelola menyertakan nilai buram `X-OmniRoute-Lease-Owner` dan `X-OmniRoute-Lease-Generation` yang persis. Pemilik menggunakan `vlo_` diikuti oleh 43 karakter base64url; hanya hash SHA-256-nya yang disimpan. Setiap batas pengiriman akhir juga mengikat ID kunci API yang diautentikasi dan ID koneksi aktif. Header kontrol lease dihapus dari log, snapshot permintaan yang dipertahankan, dan header eksekutor upstream.

Jika perutean biasa memiliki kandidat terkelola yang memenuhi syarat, tetapi setiap kandidat bebas ditempati oleh lease aktif asing, OmniRoute mengembalikan HTTP `429`, kode lease-capacity-unavailable, status menunggu kapasitas, dan `Retry-After` terbatas yang diperoleh dari waktu kedaluwarsa relevan paling awal. Ketiadaan kelayakan biasa bukanlah perebutan lease dan tetap menggunakan semantik kesalahan perutean yang sudah ada.

Mekanisme terkait tetap terpisah:

- Okupansi sesi OAuth adalah distribusi lunak lokal-proses untuk akun OAuth.
- Semaphore akun memberikan izin konkurensi permintaan dan berakhir saat permintaan selesai.
- Lease koneksi sesi terkelola eksklusif adalah kepemilikan siklus hidup yang tahan lama dengan batas generasi.

---

## 3. Penguncian Model

**Cakupan:** kombinasi penyedia + koneksi + model.

**Cakupan kunci berdasarkan status:** status kegagalan menentukan kunci tempat penguncian ditulis
(`resolveLockoutScope()` di `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sinyal kuota atau hak akses — mengunci **keluarga kuota**:
  untuk codex, seluruh cakupan `codex` / `spark` (setiap model `gpt-5*` dari
  koneksi tersebut), sedangkan untuk penyedia lain menggunakan `getQuotaScopedModelForProvider()`.
- `404` mengunci model dasarnya (`getModelLockKey()` mempersempit `not_found`).
- Status lainnya — kegagalan transportasi/server `5xx` dan `502` buatan
  OmniRoute sendiri dari validasi kualitas — hanya mengunci tuple **persis**
  penyedia/koneksi/model. Stream yang buruk pada satu model bukanlah bukti
  adanya masalah pada kuota akun; sebelum aturan ini, satu respons kosong pada
  `codex/gpt-5.6-luna` menghapus setiap model `gpt-5*` dari koneksi tersebut dari
  perutean selama 2–30 menit (meningkat secara bertahap), padahal kuotanya tidak terpengaruh.
- Opsi `scope` eksplisit dari pemanggil selalu diprioritaskan (Antigravity meneruskan `"exact"`).

**Tujuan:** menghindari penonaktifan seluruh koneksi ketika hanya satu model yang tidak tersedia atau dibatasi kuota.

**Contoh:**

- Penyedia dengan kuota per model yang mengembalikan 429
- Penyedia lokal yang mengembalikan 404 untuk satu model yang tidak tersedia
- Kegagalan izin mode/model khusus penyedia (misalnya, mode Grok)

**Implementasi:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dasbor Cooldown Model (v3.8.0)

UI: Pengaturan → Cooldown Model (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Menampilkan daftar penguncian aktif beserta: penyedia, koneksi, model, alasan, expiresAt. Operator dapat mengaktifkan kembali model secara manual dari kartu tersebut.

**REST API:**

- `GET /api/resilience/model-cooldowns` — menampilkan daftar penguncian aktif
- `DELETE /api/resilience/model-cooldowns` — mengaktifkan kembali secara manual. Body: `{provider, connection, model}`. Autentikasi: management.

### UI pengaturan penguncian + pemulihan berbasis penurunan saat berhasil (v3.8.23)

Penguncian model berubah dari perilaku bawaan yang selalu aktif menjadi fitur
opsional yang sepenuhnya dapat dikonfigurasi, dengan kartu pengaturannya sendiri
dan jalur pemulihan mandiri.

**Kartu pengaturan:** Pengaturan → Penguncian Model
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Kartu ini **berbeda** dari `ModelCooldownsCard` hanya-baca di atas (yang hanya
_menampilkan_ penguncian aktif) — kartu baru tersebut _mengonfigurasi parameter_. Nilai default
berada di `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Pengaturan              | Default                          | Arti                                                                 |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | Sakelar utama — penguncian model **nonaktif secara default**.        |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status upstream yang dihitung sebagai kegagalan tingkat model.       |
| `baseCooldownMs`        | `120_000` (120 dtk)              | Durasi penguncian awal untuk kegagalan pertama.                      |
| `maxCooldownMs`         | `1_800_000` (30 mnt)             | Batas cooldown yang telah ditingkatkan.                              |
| `maxBackoffSteps`       | `10`                             | Jumlah maksimum langkah peningkatan backoff eksponensial.            |
| `useExponentialBackoff` | `true`                           | Apakah kegagalan berulang meningkatkan cooldown secara eksponensial. |

Pengaturan disimpan melalui penyimpanan pengaturan biasa dan divalidasi melalui
skema pengaturan ketahanan; kartu tersebut membatasi `baseCooldownMs`/`maxCooldownMs`
(dengan `maxCooldownMs ≥ baseCooldownMs`) dan `maxBackoffSteps`.

**Pemulihan berbasis penurunan saat berhasil:** pemulihan **tidak** hanya bergantung pada berakhirnya timer. Respons
yang sehat menurunkan kembali jumlah kegagalan model sehingga model yang pulih
di tengah periode berhenti mengalami peningkatan (dan pengunciannya dihapus) sebelum timernya berakhir. Pada target
kombinasi yang berhasil, `open-sse/services/combo.ts` memanggil `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), yang **membagi dua** nilai
`failureCount` yang tersimpan (`Math.floor(failureCount / 2)`); ketika nilainya mencapai `0`, entri penguncian
dihapus sepenuhnya. Pasangannya, `recordModelLockoutFailure()`,
menaikkan jumlah tersebut (dan meningkatkan cooldown) ketika terjadi kegagalan dalam
periode eskalasi. Penurunan saat berhasil ini merupakan tambahan terhadap berakhirnya timer biasa —
kedua jalur tersebut dapat mengaktifkan kembali suatu model.

**Status:** penguncian disimpan **dalam memori** (`Map` per proses yang berisi
`ModelLockoutEntry` dengan kunci `provider:connectionId:model`, sedangkan penguncian cakupan persis menggunakan
`provider:connectionId:exact:model`), dan tidak disimpan secara persisten ke
DB — data tersebut hilang saat proses dimulai ulang. _Pengaturan_ disimpan secara persisten; _status_
penguncian aktif bersifat sementara.

---

## 4. Kontrol Konkurensi Quota-Share (v3.8.36)

Akun langganan (GLM, MiniMax, dll.) sering kali hanya menerima ~1–3 permintaan
konkuren; melampaui batas tersebut akan memicu 429 dan cooldown. Masalah ini sangat terasa pada
kombinasi **quota-share** (`qtSd/…`), ketika beberapa kunci API berbagi satu akun
upstream. Tiga lapisan mencegah akun bersama dibanjiri permintaan.

### Batas konkurensi per koneksi (`max_concurrent`)

Setiap koneksi penyedia dapat mendeklarasikan batas maksimum `max_concurrent`
(`provider_connections.max_concurrent`, diatur di modal koneksi / API / DB).
Biarkan kosong agar tidak ada batas. Ini adalah satu-satunya pengaturan yang mengendalikan lapisan
serialisasi di bawah — atur sesuai konkurensi aktual akun (misalnya GLM ~1, MiniMax ~2).

### Serialisasi permintaan quota-share

Ketika dispatch quota-share menargetkan koneksi yang mendeklarasikan
`max_concurrent` positif, permintaan konkuren ke **akun** tersebut diserialisasi melalui
semaphore per koneksi (kunci `qsconn:<connectionId>`): permintaan berlebih **menunggu dalam
antrean** alih-alih membanjiri akun. Mekanisme ini bersifat **fail-open** — antrean yang penuh
atau timeout akan dilanjutkan tanpa slot alih-alih menolak permintaan yang dapat
didispatch. Aktifkan/nonaktifkan di **Pengaturan → Resiliensi → Konkurensi per koneksi
quota-share** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, aktif secara
default). Tanpa batas `max_concurrent`, perilakunya tidak berubah.

> Gerbang perutean quota-share (`selectQuotaShareTarget`, DRR + P2C) juga bersifat
> fail-open dan hanya _menurunkan prioritas_ koneksi yang telah mencapai batas — dengan
> pool berkoneksi tunggal, gerbang tersebut tidak dapat menerapkan batas secara tegas, sehingga semaphore inilah yang benar-benar
> membendung banjir permintaan.

### Percobaan ulang combo yang menyadari cooldown

Untuk setiap strategi combo (ketika diaktifkan), permintaan yang akan menghasilkan 429
akibat cooldown transien SINGKAT akan menunggu hingga cooldown berakhir lalu didispatch ulang, alih-alih
mengembalikan 429 — ini mencakup jendela TPM/RPM kelas Gemini (~60 detik retry-after)
pada combo multi-model, misalnya ketika kedua target dari combo 2-model mencapai batas laju
per model. Dibatasi oleh `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) di **Pengaturan → Resiliensi**. Mekanisme ini tidak pernah menunggu untuk `quota_exhausted`
(terkunci hingga tengah malam) atau alasan autentikasi/tidak ditemukan.

---

## 5. Kontrol Penerimaan Antrean Permintaan (v3.8.49 · isu #6593)

**Cakupan**: antrean pembatasan laju lokal per penyedia+koneksi (`open-sse/services/rateLimitManager.ts`,
yang didukung oleh Bottleneck), satu lapisan di bawah ketiga mekanisme di atas.

**`maxWaitMs` membatasi waktu tunggu antrean; `executionMaxWaitMs` membatasi eksekusi.**
Keduanya sengaja dipisahkan, dan tidak ada yang memengaruhi satu sama lain.

`resilienceSettings.requestQueue.maxWaitMs` adalah **anggaran waktu tunggu antrean**:
ini mencakup waktu menunggu slot penyedia lalu berada dalam status QUEUED, dan pengatur waktunya
dihapus saat pekerjaan meninggalkan status QUEUED dan mulai dieksekusi
(`rateLimitManager.ts`, `wrappedFn`). Permintaan yang melampaui batas ini tidak pernah mencapai
upstream. Nilai default-nya adalah 30000ms, yang disediakan oleh `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
di `src/lib/resilience/settings.ts` dan dipatok oleh
`tests/unit/ratelimit-admission-control-6593.test.ts`, sehingga perubahan terhadapnya akan membuat
pengujian tersebut gagal, alih-alih membiarkan paragraf ini diam-diam menjadi usang.

`resilienceSettings.requestQueue.executionMaxWaitMs` adalah nilai yang diterima Bottleneck
sebagai `expiration` pekerjaan, yang pengatur waktunya baru dimulai setelah dispatch. Ini merupakan
pengaman terakhir bagi eksekutor yang tidak memiliki batas waktu upstream sendiri, dan nilainya
dinaikkan ke batas waktu mulai-fetch milik eksekutor jika batas waktu tersebut lebih lama, sehingga
tidak dapat memutus respons in-flight yang sehat. Nilai default-nya adalah 600000ms (10 menit).

Memasukkan anggaran antrean ke dalam `expiration` sebelumnya menyebabkan gateway non-inkremental
terhenti saat masih berjalan — gateway tersebut secara sah berjalan selama beberapa menit sebelum byte pertama muncul —
dan inilah alasan expiration ditampilkan sebagai `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), sedangkan anggaran antrean menggunakan
kode batas waktu antrean. Timpa salah satunya melalui `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) atau dasbor
(**Settings → Resilience**). Keduanya dibatasi ke 1ms–24j saat dinormalisasi.

**Prioritas, untuk keduanya:** variabel env hanya menyediakan nilai _default_. Nilai yang
disimpan secara persisten di `resilienceSettings.requestQueue` (dasbor / patch API, disimpan
di `key_value`) lebih diprioritaskan, dan `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` per koneksi lebih diprioritaskan lagi. Oleh karena itu, menetapkan
variabel env pada deployment yang sudah memiliki nilai persisten tidak akan
mengubah apa pun — hapus atau perbarui pengaturan persisten tersebut sebagai gantinya.

Waktu berada dalam antrean dibatasi oleh `maxWaitMs`; `maxQueueDepth` di bawah ini membatasi
jumlah pemanggil yang dapat berada dalam antrean secara bersamaan.

**`maxQueueDepth` — batas penerimaan opsional (baru).** `resilienceSettings.requestQueue.maxQueueDepth`
membatasi jumlah permintaan yang dapat berada dalam antrean (belum di-dispatch) untuk satu
penyedia+koneksi secara bersamaan. Ketika antrean sudah menampung `maxQueueDepth`
permintaan, permintaan baru akan segera ditolak dengan error bertipe
`code: "RATE_LIMIT_QUEUE_FULL"` **sebelum** mencapai `limiter.schedule()`
— sehingga penolakan tersebut berbiaya rendah dan terjadi sebelum pekerjaan downstream apa pun
untuk kompresi prompt / penerjemahan permintaan tersebut. Nilai default `0` =
dinonaktifkan, mempertahankan perilaku antrean tak terbatas yang sudah ada; dibatasi pada 0–100000.
Timpa melalui `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) atau
`resilienceSettings.requestQueue.maxQueueDepth` (dasbor/patch API).

Pemeriksaan penerimaan itu sendiri merupakan fungsi murni
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) sehingga
dapat diuji dengan pengujian unit tanpa limiter Bottleneck yang sebenarnya.

> RFC yang membuka #6593 juga mengusulkan flag `bypassCompressionOnRateLimit`.
> Pipeline `open-sse/services/compression/` milik repo ini adalah
> kompresi prompt/konteks pada permintaan LLM keluar (`chatCore.ts`,
> di sekitar blok `resolveCompressionSettings`/`selectCompressionStrategy`),
> bukan kompresi respons HTTP pada body 429 yang disintesis — tidak ada
> jalur kode yang sesuai untuk flag bypass harfiah. Langkah kompresi prompt tersebut
> saat ini juga berjalan _sebelum_ `withRateLimit()` dalam pipeline permintaan, sehingga
> mengubah urutan agar langkah tersebut dilewati saat terjadi penolakan karena antrean penuh merupakan perubahan terpisah yang
> lebih besar daripada cakupan isu ini; perubahan tersebut sengaja **tidak** diimplementasikan
> di sini dan dibiarkan sebagai tindak lanjut jika penghematan CPU sepadan dengan
> risiko perubahan urutan.

---

## 6. Watchdog throughput stream lambat (#9709)

Pelindung opsional `resilienceSettings.streamRecovery.throughputWatchdog` mendeteksi
upstream yang masih mengirim chunk, tetapi menghasilkan output asisten di bawah laju
output berguna yang dikonfigurasi. Pelindung ini sengaja dibedakan dari batas waktu idle:
heartbeat dan metadata tidak mengatur ulang timer mana pun dan tidak dihitung sebagai progres. Pelindung ini juga
berbeda dari tenggat absolut percobaan (#9153), yang tetap menjadi batas keamanan
mutlak terlepas dari kualitas output.

Watchdog memerlukan periode pemanasan yang diikuti oleh satu jendela bergulir lengkap sebelum
dapat membatalkan proses. Watchdog menghitung delta teks dari event output Chat Completions
dan Responses API (proksi byte UTF-8 yang konservatif), mengabaikan event kosong dan yang
hanya berisi penggunaan, serta menangguhkan penilaian saat event pemanggilan alat atau penalaran
sedang berlangsung. Fitur ini dinonaktifkan secara default dan dapat diaktifkan dengan
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; jendela, pemanasan, laju minimum, dan
output minimum yang dapat diukur dibatasi oleh lapisan normalisasi pengaturan
resiliensi standar.

Jika diaktifkan, pembatalan oleh watchdog hanya diterapkan pada percobaan upstream yang aktif. Sebelum
ada byte yang terlihat oleh klien, jalur pemulihan awal akun yang sama dapat membuka kembali
percobaan tersebut. Setelah commit, stream tidak pernah diputar ulang begitu saja; hanya kontrak
kelanjutan aman di tengah stream yang sudah ada yang dapat menyambungkan sufiks. Finalisasi tetap
hanya dilakukan sekali, sehingga pencatatan penggunaan dan pelepasan semaphore tidak diduplikasi.

---

## 7. Penetapan Ulang Status Upstream (kesalahan kuota dengan status yang keliru)

**Cakupan:** satu gateway upstream yang melaporkan kehabisan kuota sementara dengan status HTTP yang salah.

**Tujuan:** memperbaiki status yang menyesatkan SEBELUM klasifikasi, sehingga konsumen downstream (mesin fallback, agregasi combo, respons yang diteruskan ke klien) melihat sifat kegagalan sebenarnya yang dapat dicoba ulang.

Beberapa gateway menandakan kehabisan kuota SEMENTARA dengan status HTTP
yang tidak dapat dicoba ulang. `agentrouter.org` mengembalikan `403` (terkadang `400`) dengan isi berbahasa Mandarin
(`用户额度不足` / `额度不足`), bukan `429` standar. Klien seperti Claude
Code memperlakukan `403` sebagai kegagalan permanen dan membatalkan sesi, dan tanpa koreksi
mesin fallback akan mengklasifikasikannya sebagai `AUTH_ERROR`, bukan sebagai event
kuota.

**Implementasi:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — sebuah
  daftar aturan per penyedia (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), yang dicocokkan melalui `applyStatusRestatement()`.
- Lokasi pemanggilan: blok `providerFailure:` dalam `open-sse/handlers/chatCore.ts`
  (sekitar baris 3654), tepat setelah `parseUpstreamError()` mengurai respons
  upstream dengan status HTTP error (`!providerResponse.ok`), dan sebelum klasifikasi
  apa pun dijalankan, sehingga setiap konsumen downstream melihat status yang telah
  diperbaiki. Error yang disematkan di dalam stream SSE `200` mengikuti jalur
  penguraian stream terpisah yang dijalankan belakangan dan **tidak** dicakup oleh hook ini
  saat ini — ini adalah keterbatasan yang diketahui dan belum diperlukan untuk status keliru
  agentrouter (yang muncul sebagai status HTTP error).
- Kelayakan percobaan ulang: `429` tercantum dalam `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), sehingga error yang statusnya
  ditetapkan ulang membawa jendela percobaan ulang yang nyata, alih-alih muncul sebagai `403`
  yang tidak dapat ditindaklanjuti.
- Nilai sintetis `60s` untuk `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  hanyalah informasi yang disampaikan respons dengan status yang ditetapkan ulang kepada **klien**; nilai ini bukan
  durasi cooldown/lockout internal koneksi — durasi tersebut diatur secara
  terpisah oleh mekanisme apa pun yang benar-benar menangani error yang statusnya ditetapkan ulang
  (backoff bertingkat Connection Cooldown, §2, dengan nilai dasar `3s` untuk penyedia
  berbasis kunci API; atau Model Lockout, §3, untuk penyedia kuota per model seperti
  agentrouter). Router dapat memenuhi syarat untuk mencoba ulang secara internal lebih cepat
  daripada jendela 60s yang diumumkannya kepada klien — ini adalah ruang kelonggaran yang disengaja,
  bukan bug.

Error permanen (`无权访问模型` milik agentrouter — tidak memiliki akses ke model ini)
TIDAK PERNAH ditetapkan ulang: `excludeMarkers` memveto aturan bahkan ketika `textMarkers` cocok,
sehingga error mempertahankan status aslinya dan tidak ada proses yang mencoba ulang tanpa henti. Aturan
klasifikasi penyedia yang sesuai
(`agentrouter-model-access-denied` dalam `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown dasar terdeklarasi sebesar `6h`) akan
diperiksa oleh `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_sebelum_ pengembalian awal `FORBIDDEN` generik untuk kategori apikey, dengan gerbang
`honorsRuleLockScope(provider)` (#10334 — saat ini eksklusif untuk agentrouter melalui
daftar yang diizinkan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dalam
`providerErrorRules.ts`). Cooldown 6h yang dideklarasikan oleh aturan diteruskan sebagai
`fallbackResult.baseCooldownMs`, tetapi tetap memasuki jalur lockout kuota per model
yang sudah ada (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, tidak diubah oleh #10334 kecuali pada sumber cooldown):
nilainya dibatasi turun ke `mlSettings.maxCooldownMs` milik operator
(default `1_800_000ms` / 30min), seperti setiap lockout model lainnya, dan
_alasan lockout yang disimpan_ tetap berupa nilai hardcode `"forbidden"` yang sudah ada,
bukan `"auth_error"` milik aturan — hanya durasi cooldown yang dipertahankan
secara menyeluruh, bukan string alasan. Koneksi itu sendiri tetap aktif;
model lain pada koneksi yang sama tidak terpengaruh.

Error kuota yang dinyatakan ulang (`额度不足`) mencapai aturan penyedia di produksi
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, tanpa cooldown tersendiri yang dideklarasikan — default scaled
backoff dari lapisan persistensi berlaku). Sejak #10334, `scope` pada
`ProviderErrorRuleMatch` digunakan secara menyeluruh, tetapi **hanya** untuk
penyedia dalam allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — saat ini hanya `"agentrouter"`, dibatasi melalui
`honorsRuleLockScope()`). Untuk setiap penyedia lainnya, `scope` tetap bersifat
informatif, persis seperti sebelum #10334. `checkFallbackError` mengekspos scope
aturan yang cocok sebagai `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) adalah guard
bersama yang memastikan bahwa `ruleScope` benar-benar aman untuk diperlakukan
sebagai sinyal di seluruh koneksi yang dapat pulih sendiri (scope
`"connection"`, alasan `quota_exhausted`, tidak pernah `permanent`, tidak pernah
`creditsExhausted` — pertahanan terhadap aturan di masa mendatang yang
memasangkan scope `"connection"` dengan status akun permanen). Dua konsumen
memanggilnya:

- **Persistensi** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  alih-alih masuk ke cabang penguncian **per model** milik penyedia passthrough
  (agentrouter memiliki `passthroughModels: true` → `hasPerModelQuota()`
  mengembalikan `true`), fungsi tersebut menerapkan **cooldown koneksi sementara**
  — `testStatus: "unavailable"` + `rateLimitedUntil`, tidak pernah status terminal
  (`credits_exhausted`/`banned`/`expired`) — sehingga koneksi pulih sendiri
  setelah cooldown berakhir, alih-alih memerlukan pengaturan ulang kredensial
  secara manual. Dilewati untuk koneksi dengan `disableCooling: true` (#2997):
  opsi pengecualian tersebut berlanjut ke penguncian per model (kompromi yang
  didokumentasikan — lihat komentar kode di atas cabang tersebut).
- **Perutean kombinasi dalam permintaan yang sama** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): guard yang sama menandai
  koneksi ke dalam set `exhaustedConnections` di memori, dengan kunci
  `${provider}:${connectionId}`. Ini hanya melewati target tersisa dalam
  PERMINTAAN YANG SAMA yang _pada targetnya sendiri sudah memuat
  `connectionId` persis tersebut_ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` sebelum pencarian `exhaustedConnections`) — kombinasi daftar
  model biasa, yang target-target saudaranya tidak memuat `connectionId`
  tersemat sendiri dan salah satunya hanya di-resolve per pengiriman dari
  header `X-OmniRoute-Selected-Connection-Id` pada respons, tidak pernah
  menghasilkan kecocokan kunci tersebut. Untuk kasus umum itu, perlindungan
  sebenarnya agar leg yang tersisa tidak menggunakan kembali akun yang baru
  saja kehabisan kuota BUKAN Set ini — melainkan lapisan persistensi di atas
  (`rateLimitedUntil` koneksi kini berada di masa mendatang) yang digabungkan
  dengan guard yang sama untuk menekan `transientRateLimitedProviders` bagi
  kegagalan tersebut (lihat "Desain dua tahap" dan komentar kode pada cabang
  `isAgentrouterConnectionQuotaScope` di `targetExhaustion.ts`): karena Set
  tersebut tidak ditandai, izin paksa `allowRateLimitedConnection` milik
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) TIDAK
  diberlakukan untuk leg penyedia yang tersisa, sehingga filter
  `rateLimitedUntil` pada pemilihan kredensial
  (`src/sse/services/auth.ts:1238`) dipatuhi seperti biasa dan leg yang
  tersisa akan memilih koneksi agentrouter lain yang masih memenuhi syarat
  atau gagal karena tidak ada kredensial yang tersedia — leg tersebut tidak
  memaksakan diri kembali ke koneksi yang baru saja diberi cooldown oleh
  cabang ini.

### Desain dua tahap: pernyataan ulang status, lalu klasifikasi

Pernyataan ulang status (`upstreamStatusRestatement.ts`) dan aturan klasifikasi
penyedia (`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`)
merupakan registry terpisah yang keduanya menggunakan id penyedia dan penanda
teks sebagai kunci, tetapi keduanya berjalan di tempat berbeda dan memiliki
tujuan berbeda: pernyataan ulang menulis ulang status HTTP lebih awal di
`chatCore.ts`; aturan klasifikasi memilih `reason` fallback dan `scope`
penguncian (`model` / `provider` / `connection`) di dalam `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Aturan klasifikasi hanya melihat **teks** error lengkap (diperlukan untuk
mencocokkan penanda isi seperti `额度不足`) bagi penyedia yang tercantum dalam
allowlist `FULL_TEXT_RULE_PROVIDERS` di `providerErrorRules.ts` — saat ini hanya
`"agentrouter"`. Untuk setiap penyedia **katalog bawaan** lainnya,
`checkFallbackError` hanya menyerahkan error terstruktur (`{code, type}`) kepada
`getProviderErrorRuleMatch`, yang cukup untuk aturan berbasis
header/status/kode tetapi tidak dapat melihat penanda teks isi. Helper
`resolveRuleMatchBody()` melakukan pemilihan ini: teks error lengkap untuk
penyedia dalam allowlist, dan error terstruktur untuk penyedia lainnya.
Menambahkan penyedia **bawaan** ke `FULL_TEXT_RULE_PROVIDERS` merupakan opt-in
eksplisit per penyedia — mekanisme ini ada agar jalur default bagi setiap
penyedia yang tidak ada dalam daftar tetap sama byte demi byte.

`scope` suatu aturan (`model` / `provider` / `connection`) merupakan opt-in
yang terpisah dari `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` hanya
mengeksposnya sebagai `fallbackResult.ruleScope`, dan konsumen downstream hanya
memperlakukannya sebagai sesuatu selain label informatif bagi penyedia dalam
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` di file yang sama (`dibatasi
melalui honorsRuleLockScope()` — saat ini hanya `"agentrouter"`). Lihat
"Error kuota yang dinyatakan ulang" di atas untuk mengetahui apa yang
sebenarnya dilakukan oleh kecocokan `scope: "connection"` setelah suatu
penyedia berada dalam allowlist tersebut.

**#11104 — aturan yang dideklarasikan operator melewati kedua allowlist.** Operator dapat
mendeklarasikan aturan per penyedia saat runtime melalui `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
tanpa mengedit file ini. Membatasi aturan operator di balik
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlist
yang dimaksudkan untuk melindungi perilaku **default** dari aturan katalog bawaan — akan
membuat mekanisme pengaturan tidak berfungsi untuk setiap penyedia kecuali yang sudah
tercantum di sana, karena mendeklarasikan aturan tersebut sudah merupakan
keikutsertaan eksplisit operator. `resolveRuleMatchBody()` dan `honorsRuleLockScope()`
keduanya memeriksa `hasOperatorRuleForProvider()` terlebih dahulu: penyedia yang memiliki
aturan operator mendapatkan teks kesalahan mentah dan `scope` yang dideklarasikannya
dihormati, terlepas dari apakah penyedia tersebut juga muncul di salah satu allowlist.

**Kesenjangan yang diketahui — `providerRuleRegistry` tidak pernah diperiksa untuk HTTP 400.**
Cabang `BAD_REQUEST` milik `checkFallbackError` mengklasifikasikan status 400 sepenuhnya
melalui array polanya sendiri (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, dan sebagainya di `accountFallback.ts`) dan mengembalikan hasil sebelum
cabang `configuredRule`/`getProviderErrorRuleMatch` di atasnya tercapai.
Aturan katalog bawaan (atau aturan operator) dengan `status: 400` secara
sintaksis valid, tetapi tidak akan pernah dijalankan. Saat ini tidak ada aturan yang menargetkan 400,
jadi tidak ada bagian produksi yang terpengaruh — tetapi aturan 400 di masa mendatang perlu
mengubah cabang ini terlebih dahulu, yang merupakan perubahan lebih besar daripada menambahkan aturan (perubahan tersebut
mengklasifikasikan ulang 400 untuk setiap penyedia yang sudah mengandalkan perilaku
array pola) dan berada di luar cakupan penambahan aturan untuk satu penyedia.

### Menambahkan gateway baru yang salah menyatakan kuota

1. Daftarkan satu array aturan di `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Pertahankan `textMarkers`
   agar spesifik untuk penyedia; jangan pernah menggunakan ulang frasa bahasa Inggris generik yang bertabrakan dengan
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Secara opsional, daftarkan aturan klasifikasi di
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) untuk memilih
   cakupan penguncian yang tepat (`connection` untuk kuota seluruh akun, `model` untuk
   kesalahan per model). Langkah ini hanya berlaku dalam produksi untuk
   penyedia yang aturannya memerlukan teks kesalahan lengkap (penanda body): tambahkan
   id penyedia ke `FULL_TEXT_RULE_PROVIDERS` dalam file yang sama — jika tidak,
   `checkFallbackError` hanya akan memberikan kesalahan terstruktur
   `{code, type}` kepada aturan dan aturan berbasis teks body tidak akan pernah cocok dengan lalu lintas langsung.
   Aturan yang mencocokkan murni berdasarkan `status`/`headers` (seperti milik Opencode atau
   Minimax) tidak memerlukan keikutsertaan ini. Secara terpisah, jika aturan mendeklarasikan
   `scope: "connection"` dan tujuannya adalah cooldown yang benar-benar berlaku di seluruh koneksi
   ditambah melewati kombo pada permintaan yang sama (bukan sekadar label informasional), tambahkan
   id penyedia ke `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dalam file yang sama — inilah
   yang mengendalikan konsumsi bergaya `isAgentrouterConnectionQuotaScope()` di
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) dan
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); tanpanya, `scope`
   tetap diteruskan melalui `fallbackResult.ruleScope`, tetapi tidak ada yang menindaklanjutinya.
3. Tambahkan pengujian unit yang meniru `tests/unit/upstream-status-restatement.test.ts`
   dan `tests/unit/agentrouter-error-rules.test.ts` (termasuk pemeriksaan
   not-permanent / not-creditsExhausted, dan — jika penyedia memerlukan
   allowlist — pengujian yang memastikan `resolveRuleMatchBody()` mengembalikan
   teks lengkap hanya untuk penyedia tersebut).

Tidak diperlukan perubahan pada `chatCore.ts`, `classifyError`, atau kombo.

#### Penguncian berdasarkan bucket egress (#10880)

Penyedia dalam `EGRESS_BUCKETED_LOCK_PROVIDERS` (keluarga opencode) diperlakukan
sebagai upstream berbasis bucket IP (tingkat gratis opencode berbasis bucket IP, bukan
bucket akun — lihat #9611): status-429 yang diklasifikasikan sebagai `quota_exhausted`
**atau** `rate_limit_exceeded` menerapkan cooldown pada setiap koneksi keluarga dalam allowlist
yang IP egress terakhir diketahuinya cocok dengan IP koneksi yang gagal, sebelum
rotasi dapat mencobanya
— menghindari N-1 panggilan upstream yang dijamin gagal (bentuk yang sama seperti #10460/#10525).
`rate_limit_exceeded` disertakan secara sengaja: pada jalur `markAccountUnavailable`,
aturan khusus opencode tidak pernah cocok (tidak ada header/body yang diberikan kepada
`checkFallbackError`, opencode tidak ada dalam `FULL_TEXT_RULE_PROVIDERS`), sehingga 429
yang body-nya memuat teks kuota langganan ("monthly usage limit
reached") diklasifikasikan sebagai `quota_exhausted` oleh fallback teks kuota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown 1 jam) sebelum
aturan `status_429` pernah tercapai — sedangkan 429 tanpa teks kuota (pembatasan
laju biasa) diklasifikasikan melalui aturan `status_429` sebagai `rate_limit_exceeded`
dan tetap menerapkan cooldown pada keluarga IP tersebut. Untuk penyedia dalam allowlist, batas laju
berbasis bucket IP merupakan sinyal yang sama dengan kuota yang habis. Batasan sebenarnya:

- **Upaya terbaik**: penguncian mendapatkan `egress_ip` terakhir yang diketahui
  milik koneksi dari `proxy_logs` (jendela 24 jam, sinkron, tanpa cache). Cache
  dingin (IP egress belum pernah diperiksa) atau tidak ada baris → koneksi yang
  gagal tetap diberi cooldown oleh cabang tersebut (dicatat seperti saat ini),
  hanya saja tidak ada sibling yang dikunci.
- **Tidak pernah terminal**: cooldown merupakan jendela kuota yang terus
  diperbarui (`testStatus: "unavailable"`); status permanen tidak pernah
  diturunkan dari sinyal tingkat IP. Koneksi `disableCooling` melewati cabang
  tersebut sepenuhnya.
- **Granularitas penguncian berubah untuk keluarga dalam daftar yang diizinkan**:
  ini adalah perubahan cakupan, bukan sekadar optimasi sibling. opencode adalah
  penyedia `passthroughModels`, sehingga sebelum cabang ini, 429 menghasilkan
  penguncian per-MODEL; kini menghasilkan cooldown koneksi — termasuk bagi
  operator yang menjalankan satu koneksi tanpa sibling sama sekali. Itulah
  granularitas yang telah dinyatakan benar oleh tabel aturan opencode
  (`scope: "connection"`, `providerErrorRules.ts`), tetapi sejauh ini tidak
  pernah diterapkan karena opencode tidak ada di
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Cabang tersebut menulis cooldown +
  `backoffLevel` milik koneksi yang gagal secara mandiri, mencerminkan cabang
  agentrouter dengan cakupan koneksi, lalu kembali — blok per-model dan jalur
  generik di bawahnya tidak pernah dicapai.
- **Combo disertakan**: seperti cabang agentrouter, cakupan ini sengaja
  mengabaikan penurunan `persistUnavailableState`/`isCombo` yang diterapkan
  pemanggil combo pada 429. Penguncian per-model bukan bentuk yang lebih lemah
  dari cakupan ini, melainkan unit yang salah: hal itu tidak memberikan
  informasi apa pun tentang IP yang kehabisan kuota, sehingga rotasi combo akan
  terus menghabiskan satu panggilan yang pasti gagal untuk setiap sibling.
- **Keamanan sibling**: sibling yang sudah terminal (banned/credits_exhausted)
  atau sudah berada dalam cooldown yang lebih lama tidak pernah ditimpa.
- **Daftar yang diizinkan bersifat eksklusif**: memperluas
  `EGRESS_BUCKETED_LOCK_PROVIDERS` merupakan keputusan pemilik secara eksplisit;
  tidak ada pengawatan generik (pola #10334/#10419). Kueri sibling menggunakan
  daftar yang diizinkan yang sama alih-alih mengulangnya sebagai literal SQL,
  sehingga perluasannya tetap menjadi perubahan satu baris.
- **Rotasi IP egress, dalam kedua arah**: jendela pencarian (24 jam) jauh lebih
  lebar daripada TTL cache IP egress (5 menit), sehingga "IP terakhir yang
  diketahui" merupakan riwayat, bukan status saat ini. Jika proxy suatu koneksi
  berotasi dalam jendela tersebut, penguncian mungkin **melewatkan** IP yang
  benar-benar digunakan bersama (IP yang tercatat adalah IP baru yang belum
  kehabisan kuota) — dan sebaliknya, penguncian mungkin **memberi cooldown pada
  sibling yang sejak saat itu telah berotasi menjauh** dari IP yang kehabisan
  kuota. Kasus kedua membuat sibling tersebut kehilangan satu jendela cooldown;
  keduanya diterima sebagai batasan upaya terbaik dari pencarian berbasis
  riwayat.
- **Biaya**: dua pemindaian terbatas pada `proxy_logs` (difilter berdasarkan
  jendela melalui `idx_pl_timestamp`), hanya pada frekuensi 429. Tidak ada
  indeks baru (migrasi 134 YAGNI). Diukur pada salinan DB lalu lintas nyata
  berukuran sedang; instans dengan throughput tinggi menyimpan lebih banyak
  baris secara proporsional dalam jendela yang sama.

---

## Fitur Ketahanan Lainnya

- **19 strategi perutean** (prioritas, berbobot, round-robin, relai konteks, isi-dahulu, p2c, acak, paling-jarang-digunakan, dioptimalkan untuk biaya, sadar-reset, jendela-reset, ruang-cadangan, acak-ketat, otomatis, lkgp, dioptimalkan untuk konteks, dioptimalkan untuk cache, fusi, pipeline) — lihat [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Perutean sadar-reset** (v3.8.0) — memprioritaskan koneksi berdasarkan waktu reset kuota.
- **Degradasi mode latar belakang** — `background: true` pada Responses API diturunkan menjadi sinkron dengan peringatan.
- **Deteksi batas alat secara dinamis** — mengurangi penggunaan penyedia ketika batas jumlah alat tercapai.
- **Fallback darurat** — dikendalikan oleh `OMNIROUTE_EMERGENCY_FALLBACK`; operator dapat menimpanya dari halaman Feature Flags tanpa memulai ulang.

---

## Debugging

- Kombo berbobot merespons dengan `503 all_targets_cooling_down` (`Retry-After` ditetapkan, `diagnostics.excluded` mencantumkan setiap target dengan `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool telah dikonfigurasi dan terhubung, tetapi setiap target dikecualikan oleh timer ketahanan; peringatan `[COMBO] Weighted selection: every target excluded before dispatch — …` menyebutkan alasan dan jumlah detik yang tersisa. Respons `404 no_executable_targets` dari kombo yang sama berarti tidak ada timer ketahanan yang terlibat (tidak ada yang dapat dijalankan, atau setiap akun gagal dalam pemeriksaan ketersediaan). Dibangun di `open-sse/services/combo/pinRecovery.ts` berdasarkan pengecualian yang dikumpulkan di `targetResolution.ts`.
- Semua kunci untuk suatu penyedia dilewati → periksa status circuit breaker DAN `rateLimitedUntil`/`testStatus` setiap koneksi.
- Penyedia dikecualikan secara permanen setelah jendela reset → kode membaca `state` mentah, bukan `getStatus()`/`canExecute()`.
- Satu kunci gagal, sedangkan yang lain seharusnya berfungsi → utamakan cooldown koneksi daripada circuit breaker.
- Hanya satu model yang gagal → utamakan penguncian model daripada cooldown koneksi.
- Status seharusnya pulih sendiri tetapi tidak → periksa timestamp masa depan + jalur pembacaan yang menyegarkan status kedaluwarsa. Status permanen memerlukan perubahan manual.

---

## Sidik Jari TLS & Penyamaran

Penyamaran khusus penyedia (JA3/JA4, CCH, obfuscation) didokumentasikan secara terpisah — lihat `docs/security/STEALTH_GUIDE.md` (git; tidak dikompilasi ke `/docs`).

---

## Pengujian ketahanan (Fase 8 · Blok C)

Selain pengujian unit untuk logika ketahanan, tiga pengujian menguji runtime dalam
kondisi tekanan/kegagalan nyata (semuanya integrasi/nightly — tidak ada yang memblokir PR):

| Pengujian        | Yang diuji                                                                                                                                                                                                | Jalankan                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos            | Node upstream palsu menyuntikkan latensi/reset/timeout/503 nyata; memvalidasi bahwa circuit breaker membuka/pulih dan `checkFallbackError` mengklasifikasikan 503 sebagai fallback yang dapat dipulihkan. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Pertumbuhan heap | ~500 stream per `createSSEStream` di bawah `--expose-gc`; gagal jika heap tumbuh melampaui batas maksimum (perlindungan OOM #3069).                                                                       | `npm run test:heap`                      |
| Uji soak k6      | Beban berkelanjutan terhadap `/api/monitoring/health`; ambang batas p95/error.                                                                                                                            | `k6 run tests/load/k6-soak.js` (nightly) |

Diorkestrasi oleh `.github/workflows/nightly-resilience.yml` (cron + dispatch). Dalam
`test:integration` default, chaos dan heap melewati pengujian secara otomatis (tanpa `RUN_CHAOS_INT`/`--expose-gc`).

---

## Lihat Juga

- [Panduan Arsitektur](./ARCHITECTURE.md) — Arsitektur sistem dan komponen internal
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Penyedia, kombo, integrasi CLI
- [Mesin Kombo Otomatis](../routing/AUTO-COMBO.md) — Penilaian 16 faktor, paket mode
