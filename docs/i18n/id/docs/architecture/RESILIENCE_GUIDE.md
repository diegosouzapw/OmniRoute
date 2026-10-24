# Resilience Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute memiliki tiga mekanisme ketahanan yang berbeda tetapi saling terkait. Masing-masing memiliki cakupan dan tujuan yang berbeda. Pisahkan ketiganya saat men-debug perilaku routing.

![Model ketahanan 3 lapis](../diagrams/exported/resilience-3layers.svg)

> Sumber: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker Provider

**Cakupan:** seluruh provider (mis., `glm`, `openai`, `anthropic`).

**Tujuan:** menghentikan pengiriman traffic ke provider yang berulang kali gagal pada tingkat upstream/layanan.

**Implementasi:**

- Kelas inti: `src/shared/utils/circuitBreaker.ts`
- Penyambungan: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status: `GET /api/monitoring/health`
- API reset: `POST /api/resilience/reset`
- Wrapper: `open-sse/services/accountFallback.ts`
- Tabel DB: `domain_circuit_breakers`

**Status:**

- `CLOSED` — traffic normal diizinkan
- `DEGRADED` — traffic masih diizinkan, tetapi kegagalan provider yang meningkat sedang dilacak; kembali ke `CLOSED` setelah cukup banyak keberhasilan, pada uji koneksi yang valid, atau setelah penahanan `OPEN` terlama untuk jenis kegagalan terakhir (nilai `cooldownByKind`-nya, jika tidak ada maka `resetTimeout`, × `maxBackoffMultiplier`, minimal satu cooldown) tanpa kegagalan baru
- `OPEN` — provider diblokir sementara; routing combo melewatinya
- `HALF_OPEN` — timeout reset telah berlalu; permintaan probe diizinkan

**Default yang dapat dikonfigurasi (`open-sse/config/constants.ts`, ditampilkan di Dashboard → Pengaturan → Ketahanan):**

| Kelas   | Degraded pada | Terbuka pada | Timeout reset |
| ------- | ------------- | ------------ | ------------- |
| OAuth   | 5 kegagalan   | 8 kegagalan  | 60s           |
| API-key | 7 kegagalan   | 12 kegagalan | 30s           |
| Local   | diturunkan    | 2 kegagalan  | 15s           |

`degradationThreshold` mengontrol kapan provider masuk ke `DEGRADED`; `failureThreshold` mengontrol kapan provider terbuka dan dilewati. Profil provider Local belum ditampilkan di halaman pengaturan Ketahanan.

**Kode trip:** hanya status tingkat provider `[408, 500, 502, 503, 504]`. JANGAN trip untuk error tingkat akun (sebagian besar 401/403/429 — itu termasuk cooldown atau lockout).

**Pemulihan lazy:** saat `OPEN` kedaluwarsa, `getStatus()`, `canExecute()`, `getRetryAfterMs()` menyegarkan status ke `HALF_OPEN`. Pembacaan yang sama (dan kegagalan berikutnya) menurunkan `DEGRADED` yang usang kembali ke `CLOSED`. Tidak perlu timer latar belakang.

---

### Cooldown Provider global opt-in (gerbang jendela)

Lapisan keempat, **opt-in** (`PROVIDER_COOLDOWN_ENABLED`, default **nonaktif**) menyimpan memori lintas-permintaan tentang provider yang gagal di `open-sse/services/providerCooldownTracker.ts`, yang dikonsultasikan oleh resolusi target combo sehingga permintaan combo berurutan berhenti menjelajahi ulang provider yang baru saja gagal. Entri tingkat provider mematuhi gerbang jendela `PROVIDER_PROFILES`:

| Profil  | trip setelah (`providerFailureThreshold`) | dalam (`providerFailureWindowMs`) | cooldown selama (`providerCooldownMs`) |
| ------- | ----------------------------------------: | --------------------------------: | -------------------------------------: |
| OAuth   |                                      `10` |                           `15min` |                                 `5min` |
| API key |                                      `15` |                           `30min` |                                `10min` |

Di bawah ambang, provider **tidak** dianggap sedang cooldown; keberhasilan menghapus jendela. Entri tingkat koneksi (`provider:connectionId`) tetap memakai backoff eksponensial `minRetryCooldownMs → maxRetryCooldownMs`. Override: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Pengaman regresi: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown Koneksi

**Cakupan:** satu koneksi/akun/kunci provider.

**Tujuan:** melewati satu kunci yang bermasalah sementara koneksi lain untuk provider yang sama tetap melayani.

**Implementasi:**

- Menandai tidak tersedia: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pemilihan: `getProviderCredentials*` di file yang sama
- Perhitungan cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Pengaturan: `src/lib/resilience/settings.ts`

**Field per koneksi:**

- `rateLimitedUntil` — timestamp hingga cooldown berakhir
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — penghitung exponential backoff

**Cooldown default:**

- Dasar OAuth: 5 detik
- Dasar API-key: 3 detik
- API-key 429: memprioritaskan header `Retry-After`/reset dari upstream/teks reset yang dapat di-parse
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Perlindungan anti-thundering-herd:** mencegah kegagalan bersamaan memperpanjang cooldown secara berlebihan atau menambah `backoffLevel` dua kali.

**429 batas konkurensi tidak menaiki tangga backoff.** Sebuah `429` yang body-nya melaporkan
batas konkurensi ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) berarti akun sehat tetapi sibuk.
`checkFallbackError()` mengembalikan alasan `concurrency_limited`: segera fail over ke
koneksi berikutnya, dinginkan koneksi ini selama `CONCURRENCY_LIMIT_COOLDOWN_MS` tetap (1 detik) atau
sesuai petunjuk retry dari upstream, biarkan `backoffLevel` tidak berubah, dan setel `skipProviderBreaker`.
Body kuota eksplisit tetap menang, sehingga body yang juga cocok dengan pola kuota tetap menjadi
verdict kuota. Deteksi: `looksLikeConcurrencyLimit()` di `src/shared/utils/classify429.ts`;
verdict: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind`
milik breaker) tidak berubah dan tetap membaca `rate_limit` untuk body seperti ini.

**Stall konten stream tidak mendinginkan akun.** Ketika watchdog stall konten
(`open-sse/utils/streamHandler.ts`) menyerah pada stream yang tidak mengirim output model tepat
waktu, `markAccountUnavailable()` mencatat error pada koneksi tetapi tidak menetapkan
cooldown: stall tersebut milik request itu, paling sering berupa giliran reasoning panjang tanpa
output. Operator dapat mengaktifkan kembali dengan `resilienceSettings.streamStallCooldown.enabled`
(default `false`).

**Frame reasoning memulai ulang anggaran stall konten.** Model reasoning dapat berpikir selama
beberapa menit sebelum token terlihat pertamanya: Claude melakukan streaming frame `thinking_delta`
yang teks thinking-nya mungkin kosong, dan Responses API melakukan streaming satu item reasoning
demi satu. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) mengenali
frame-frame ini, dan watchdog memulai ulang anggarannya pada setiap frame alih-alih membatalkan
giliran. Frame tersebut tetap bukan output model, sehingga giliran yang berakhir hanya dengan reasoning
tetap dilaporkan kosong, dan giliran yang berhenti melakukan reasoning dan hanya mengirim heartbeat
tetap memicu watchdog.

Frame biner `reasoningContentEvent` milik Kiro dengan signature non-kosong mempertahankan
aktivitas reasoning ini melalui executor sebagai delta `reasoning_content` kosong. Signature
tidak diteruskan. Metadata, frame tidak lengkap, dan signature kosong tidak memulai ulang
anggaran konten; timeout active-stream yang independen dan pembatalan klien tetap
berlaku (`open-sse/executors/kiro/reasoning.ts`).

**Status terminal (BUKAN cooldown):**

- `banned` — disetel oleh deteksi kata kunci terlarang / pemblokiran akun (lihat [BAN_DETECTION](../security/BAN_DETECTION.md)), dan oleh tiga penolakan per-request berturut-turut dari upstream (`request_rejected`, misalnya Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); satu penolakan saja hanya mendinginkan koneksi
- `expired` (bertransisi ke terminal setelah percobaan ulang terbatas — `EXPIRED_RETRY_MAX = 3` dengan exponential backoff — sehingga error OAuth sementara dapat pulih sendiri sebelum akun dinonaktifkan secara permanen)
- `credits_exhausted`

Status ini bertahan hingga kredensial berubah atau operator meresetnya. Jangan menimpa status terminal dengan status cooldown sementara.

**Pemulihan malas (lazy recovery):** ketika `rateLimitedUntil` telah lewat, koneksi menjadi memenuhi syarat lagi. Saat berhasil digunakan, `clearAccountError()` membersihkan semua field error.

### Tembok penggunaan Claude OAuth: jalur prioritas lebih rendah + reset batas sesi

**Cakupan:** satu koneksi langganan Claude (OAuth). Kedua fitur bersifat **opt-in per
koneksi** (Edit koneksi → bagian Claude → `lowPriorityMode` / `autoLimitReset` di
`providerSpecificData`, keduanya default nonaktif) dan mencerminkan perintah `/low-priority` dan
`/limit-reset` milik Claude Code (kontrak wire ditangkap dari Claude Code 2.1.263).

**Implementasi:**

- State machine + klasifikasi respons: `open-sse/services/claudeLowPriority.ts`
- Klien status/klaim reset: `open-sse/services/claudeLimitReset.ts`
- Hook executor (injeksi header + retry akun yang sama): `open-sse/executors/base.ts::execute()`
- Persistensi opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Pemicu:** tembok penggunaan 5 jam — sebuah `429` yang header-nya membawa
`anthropic-ratelimit-unified-status: rejected` dan, ketika akun memenuhi syarat,
`anthropic-ratelimit-unified-slow-offer: treatment`. Tidak ada yang dikirim sebelum 429 tembok
pertama itu; 429 burst tanpa header unified melewati jalur cooldown normal.

**Jalur prioritas lebih rendah** (`lowPriorityMode`):

- Pada wall 429, executor menerima tawaran itu dan langsung mencoba ulang akun yang **sama**
  dengan `anthropic-usage-limit: slow`; jalur tetap aktif hingga `anthropic-ratelimit-unified-reset`
  yang diumumkan (masa tenggang +60 detik) dan setiap permintaan dalam jendela itu membawa
  header tersebut. 429 yang dicegat tidak pernah mencapai `handleChatCore`, sehingga koneksi
  **tidak** dimasukkan ke cooldown dan tidak dirotasi.
- `anthropic-ratelimit-unified-slow-status` pada respons berikutnya: `active` / `not_needed`
  mempertahankan jalur; `slot_busy` (429) atau `529` menunggu
  `anthropic-ratelimit-unified-slow-retry-after` dari server (default 20 detik, clamp 5–600 detik,
  jitter ±30%) lalu mencoba ulang, dibatasi oleh `anthropic-ratelimit-unified-slow-max-wait`
  (default 20 menit, clamp 1 menit–6 jam) — melewati itu jalur berakhir dan jeda pendinginan
  10 menit memblokir penerimaan ulang. Waktu tunggu juga dibatasi oleh sisa timeout
  upstream-start milik permintaan itu sendiri (`resolveFetchStartTimeout`, default 10 menit)
  dikurangi margin 5 detik: tanpa batas itu, max-wait default 20 menit akan hidup lebih lama
  dari permintaan dan sleep akan dibatalkan di tengah penantian, memunculkan `TimeoutError`
  alih-alih akhir `max_wait` yang mulus + jeda pendinginan.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, rollover jendela 5 jam, atau
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (yang mengakhirinya sebagai
  `extra_usage` pada status apa pun, karena overage berbayar kini menanggung wall) mengakhiri
  jalur; respons kemudian mengalir ke jalur cooldown normal. `budget_exhausted` diingat hingga
  reset anggaran yang diumumkan (≤ 8 hari).
- Pemeriksaan wall berjalan setelah percobaan ulang intra-attempt milik executor sendiri yang
  dipicu 400 (penyuntingan konteks, clamp thinking/effort, auto-learn parameter), sehingga wall
  429 yang hanya muncul pada salah satu percobaan ulang itu tetap dicegat alih-alih mencapai
  jalur cooldown.
- State disimpan di memori per koneksi (restart membutuhkan satu wall 429 tambahan untuk
  menerima ulang).

**Reset batas sesi** (`autoLimitReset`, dicoba sebelum jalur ketika keduanya aktif):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  ketika `arm: "reset"` dan `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` dengan
  `{ "program": "juniper_tide" }` (UUID organisasi dari
  `providerSpecificData.organizationUUID`, fallback bootstrap).
- `result: reset|not_limited` → permintaan dicoba ulang dengan kecepatan penuh (tanpa header
  slow). `already_used` / `not_offered` memoisasi `next_available_at` (default satu minggu);
  kegagalan apa pun memicu backoff 15 menit. Reset dilakukan sekali seminggu dan tetap dihitung
  terhadap batas mingguan.

Penjaga regresi: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinitas sesi (#7274)

**Cakupan:** satu sesi klien (header `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) disematkan ke satu koneksi, untuk provider **apa pun**.

**Tujuan:** menjaga agen multi-turn (Claude Code, aider, agen kustom) tetap pada akun yang sama di seluruh permintaan, mengurangi kehilangan konteks lintas akun dan 429 cold-start berulang pada provider dengan state sesi per akun.

**Implementasi:**

- Resolusi TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pemilihan/pembuatan pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ekstraksi header (generik, provider apa pun): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabel pin yang dipersistensikan: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Pengaturan: `sessionAffinityTtlMs` (TTL global dalam ms, `0` menonaktifkan) — `src/lib/db/settings.ts`. Diganti namanya dari `codexSessionAffinityTtlMs` yang khusus Codex oleh migrasi `124_generic_session_affinity_ttl.sql`, yang mewariskan TTL Codex yang dikonfigurasi sebelumnya sebagai default baru.

Sebelum #7274, `resolveSessionAffinityTtlMs()` langsung mengembalikan `0` untuk setiap provider kecuali `codex`, sehingga pengaturan TTL (dan header sesi) tidak berpengaruh di tempat lain meskipun mekanisme penyematan dan ekstraksi header sudah agnostik provider. Perbaikan itu menghapus early-return tersebut; TTL kini berlaku seragam untuk setiap provider setelah diatur secara global di atas `0`.

Ketiga header afinitas sesi tidak pernah diteruskan ke upstream — executor membangun header upstream mereka sendiri dari awal alih-alih meneruskan header klien, sehingga ini tetap menjadi id korelasi internal semata.

### Lease koneksi sesi terkelola eksklusif

**Cakupan:** satu klien/sesi HTTP terkelola yang aktif memiliki satu koneksi OmniRoute yang eligible.

**Tujuan:** menyediakan kepemilikan koneksi eksklusif yang tahan lama bagi klien yang membutuhkan
pagar routing tegas di seluruh permintaan. Ini berbeda dari afinitas sesi, yang merupakan
preferensi kontinuitas lunak: lease eksklusif mempersistensikan state siklus hidup di SQLite,
menegakkan keunikan pemilik aktif dan koneksi aktif secara global, serta menolak generasi basi
sebelum dispatch provider.

Fitur ini opt-in per API key. Kunci terkelola harus memiliki scope `lease:exclusive` dan daftar
`allowedConnections` eksplisit yang tidak kosong. Klien HTTP apa pun dapat menggunakan endpoint
siklus hidup; tidak ada nama klien, user-agent, provider, metode OAuth, atau model yang
diwajibkan. Lease memiliki koneksi, bukan model, sehingga perubahan model mempertahankan ikatan
selama koneksi tetap eligible secara normal. Aturan model, kuota, kesehatan, cooldown, dan
allowlist normal tetap menjadi acuan utama dan dapat mengalihkan generasi yang sama ke koneksi
lain yang bebas dan eligible.

Siklus hidupnya adalah `POST /api/v1/session-leases` dengan aksi JSON `acquire`, `renew`, dan `release`.
Permintaan inferensi terkelola menyertakan nilai opak `X-OmniRoute-Lease-Owner` dan nilai
`X-OmniRoute-Lease-Generation` yang persis. Owner menggunakan `vlo_` diikuti 43 karakter base64url; hanya
hash SHA-256-nya yang disimpan. Setiap fence dispatch akhir juga mengikat ID API key terautentikasi dan
ID koneksi aktif. Header kontrol lease dihapus dari log, snapshot permintaan yang disimpan, dan
header executor upstream.

Jika routing biasa memiliki kandidat terkelola yang memenuhi syarat tetapi setiap kandidat bebas
ditempati oleh lease aktif asing, OmniRoute mengembalikan HTTP `429`, kode
lease-capacity-unavailable, status waiting-for-capacity, dan `Retry-After` terbatas yang diturunkan
dari waktu kedaluwarsa relevan yang paling awal. Eligibilitas kosong biasa bukanlah kontensi lease
dan mempertahankan semantik error routing yang sudah ada.

Mekanisme terkait tetap terpisah:

- Okupansi sesi OAuth adalah distribusi lunak lokal proses untuk akun OAuth.
- Semaphore akun memberikan izin konkurensi permintaan dan berakhir saat permintaan selesai.
- Lease sesi terkelola eksklusif adalah kepemilikan siklus hidup yang tahan lama dengan fence generasi.

---

## 3. Model Lockout

**Cakupan:** tripel provider + koneksi + model.

**Cakupan kunci berdasarkan status:** status yang gagal menentukan kunci mana yang
ditulis oleh lockout (`resolveLockoutScope()` di `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sinyal kuota atau entitlement — mengunci **keluarga kuota**:
  untuk codex seluruh cakupan `codex` / `spark` (setiap model `gpt-5*` milik
  koneksi tersebut), untuk provider lain `getQuotaScopedModelForProvider()`.
- `404` mengunci model tunggal (`getModelLockKey()` mempersempit `not_found`).
- Status lainnya — kegagalan transport/server `5xx` dan `502` hasil sintesis
  OmniRoute sendiri dari validasi kualitas — hanya mengunci tupel
  provider/koneksi/model yang **persis**. Stream yang buruk pada satu model bukanlah
  bukti tentang kuota akun; sebelum aturan ini, satu respons kosong pada
  `codex/gpt-5.6-luna` menghapus setiap model `gpt-5*` milik koneksi tersebut dari
  routing selama 2–30 menit (bertingkat) padahal kuotanya tidak terganggu.
- Opsi `scope` eksplisit dari pemanggil selalu menang (Antigravity meneruskan `"exact"`).

**Tujuan:** menghindari penonaktifan seluruh koneksi ketika hanya satu model yang tidak tersedia atau dibatasi kuotanya.

**Contoh:**

- Provider kuota per-model yang mengembalikan 429
- Provider lokal yang mengembalikan 404 untuk satu model yang hilang
- Kegagalan izin mode/model khusus provider (misalnya mode Grok)

**Implementasi:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dasbor Model Cooldowns (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Menampilkan lockout aktif dengan: provider, koneksi, model, alasan, expiresAt. Operator dapat mengaktifkan kembali model secara manual dari kartu tersebut.

**REST API:**

- `GET /api/resilience/model-cooldowns` — daftar lockout aktif
- `DELETE /api/resilience/model-cooldowns` — pengaktifan ulang manual. Body: `{provider, connection, model}`. Autentikasi: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Satu halaman untuk setiap koneksi yang dikeluarkan dari routing karena alasan sementara, alih-alih
membuka setiap halaman provider satu per satu. Halaman ini menampilkan cooldown koneksi, lockout model, dan
status terminal, membersihkannya per koneksi, untuk satu pilihan, atau untuk semua koneksi milik suatu provider,
serta mengedit aturan cooldown yang paling sering disesuaikan: `streamStallCooldown.enabled` dan
cooldown dasar `connectionCooldown` untuk OAuth / API-key beserta langkah backoff maksimum (disimpan melalui
`PATCH /api/resilience`). Status terminal (`banned`, `expired`, `credits_exhausted`)
ditampilkan tetapi tidak pernah dibersihkan di sini.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentikasi: management):

- `GET /api/resilience/cooldowns[?provider=]` — koneksi dengan status, sisa cooldown,
  level backoff, jenis error terakhir, dan lockout model (tanpa kredensial)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` atau
  `{all: true, provider?}`; mengembalikan `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI pengaturan lockout + pemulihan success-decay (v3.8.23)

Model lockout berubah dari perilaku hardcoded yang selalu aktif menjadi fitur
opt-in yang sepenuhnya dapat dikonfigurasi dengan kartu pengaturan sendiri dan jalur pemulihan self-healing.

**Kartu pengaturan:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Kartu ini **berbeda** dari `ModelCooldownsCard` di atas yang bersifat read-only (yang hanya
_menampilkan_ lockout aktif) — kartu baru ini _mengonfigurasi parameternya_. Nilai default
ada di `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Pengaturan              | Default                          | Arti                                                              |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `enabled`               | `false`                          | Saklar utama — model lockout **nonaktif secara default**.         |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status upstream yang dihitung sebagai kegagalan lingkup model.    |
| `baseCooldownMs`        | `120_000` (120 s)                | Durasi lockout awal untuk kegagalan pertama.                      |
| `maxCooldownMs`         | `1_800_000` (30 menit)           | Batas atas cooldown yang bertingkat.                              |
| `maxBackoffSteps`       | `10`                             | Langkah eskalasi exponential-backoff maksimum.                    |
| `useExponentialBackoff` | `true`                           | Apakah kegagalan berulang menaikkan cooldown secara eksponensial. |

Pengaturan tersimpan melalui penyimpanan pengaturan normal dan divalidasi melalui
skema pengaturan resilience; kartu tersebut membatasi (clamp) `baseCooldownMs`/`maxCooldownMs`
(dengan `maxCooldownMs ≥ baseCooldownMs`) dan `maxBackoffSteps`.

**Pemulihan success-decay:** pemulihan **tidak** murni berdasarkan kedaluwarsa timer. Respons
yang sehat menurunkan kembali jumlah kegagalan model sehingga model yang pulih
di tengah jendela berhenti bertingkat (dan dibersihkan) sebelum timernya berakhir. Pada
target combo yang berhasil, `open-sse/services/combo.ts` memanggil `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), yang **membagi dua**
`failureCount` yang tersimpan (`Math.floor(failureCount / 2)`); ketika mencapai `0`, entri lockout
dihapus sepenuhnya. Pasangannya, `recordModelLockoutFailure()`,
menambah jumlah tersebut (dan menaikkan cooldown) pada kegagalan di dalam
jendela eskalasi. Success-decay ini merupakan tambahan dari kedaluwarsa timer biasa —
kedua jalur dapat mengaktifkan kembali suatu model.

**State:** lockout disimpan **di memori** (`Map` per-proses berisi
`ModelLockoutEntry` dengan kunci `provider:connectionId:model`, kunci lingkup-exact dengan
`provider:connectionId:exact:model`), tidak disimpan ke
DB — hilang saat restart. _Pengaturan_ disimpan secara persisten; _state_ lockout
aktif bersifat ephemeral.

---

## 4. Kendali Konkurensi Quota-Share (v3.8.36)

Akun langganan (GLM, MiniMax, dll.) sering kali hanya menerima ~1–3 permintaan
konkuren; melebihi batas itu memicu 429 dan cooldown. Hal ini sangat krusial pada
kombo **quota-share** (`qtSd/…`), di mana beberapa API key berbagi satu akun
upstream. Tiga lapisan menjaga akun bersama agar tidak kebanjiran.

### Batas konkurensi per koneksi (`max_concurrent`)

Setiap koneksi provider dapat mendeklarasikan batas maksimum `max_concurrent`
(`provider_connections.max_concurrent`, diatur di modal koneksi / API / DB).
Biarkan kosong untuk tanpa batas. Ini adalah satu-satunya pengaturan yang
menggerakkan lapisan serialisasi di bawah — atur sesuai konkurensi nyata akun
(mis. GLM ~1, MiniMax ~2).

### Batas konkurensi per model (`modelConcurrency`)

Sebuah koneksi juga dapat mendeklarasikan batas konkurensi per model yang tepat
di dalam map `rateLimitOverrides`-nya:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Atur di modal koneksi (**Rate limit overrides → Per-model
concurrency caps**, satu `model=cap` per baris) atau melalui
`PATCH /api/providers/[id]` dengan bentuk JSON yang sama. Semantik kunci:

- **Cakupan koneksi vs spesifik model:** `maxConcurrent` tetap menjadi batas
  bersama untuk seluruh koneksi. Ketika keduanya berlaku, kedua gerbang
  diperoleh secara atomik dalam gerbang komposit yang sama
  (`global → provider → account → model`); perilaku efektifnya adalah batas
  yang lebih ketat di antara yang berlaku.
- **Pencocokan kunci model secara persis:** kuncinya adalah string model yang
  diteruskan ke executor setelah resolusi routing — biasanya id model upstream
  apa adanya (`glm-5`), bukan alias `provider/model` sisi klien (`zai/glm-5`
  tidak cocok dengan `glm-5`). Nilainya adalah batas permintaan konkuren
  berupa bilangan bulat positif.
- **Antrean lokal, tanpa discovery:** permintaan berlebih mengantre secara
  lokal dengan semantik antrean/timeout yang sudah ada (error admission bertipe
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute tidak menemukan atau
  menyimpulkan kebijakan upstream — ia menegakkan batas persis yang
  dikonfigurasikan operator. Gerbang model yang jenuh tidak pernah menonaktifkan
  provider dan tidak pernah membuat lockout model permanen; perilaku
  429/cooldown/fallback upstream tetap menjadi pengaman error.
- **Cakupan per koneksi, per proses:** batas berlaku per koneksi database dan
  disimpan di memori, sehingga dua koneksi yang memakai ulang API key upstream
  yang sama tidak saling berkoordinasi.
- **Tidak dikonfigurasi berarti tidak berubah:** menghilangkan map (atau membiarkan
  kolom dashboard kosong) tidak menambahkan gerbang model. Contoh konfigurasi
  tanpa menyatakan batas provider universal apa pun:

```text
glm-5=1
glm-4.7=3
```

### Serialisasi permintaan quota-share

Ketika dispatch quota-share menargetkan koneksi yang mendeklarasikan
`max_concurrent` positif, permintaan konkuren ke **akun** tersebut diserialkan
melalui semaphore per koneksi (kunci `qsconn:<connectionId>`): permintaan berlebih
**menunggu dalam antrean** alih-alih membanjiri akun. Sifatnya **fail-open** —
antrean yang jenuh atau timeout tetap melanjutkan tanpa slot, dan tidak pernah
menolak permintaan yang dapat di-dispatch. Aktif/nonaktifkan di **Settings →
Resilience → Quota-share per-connection concurrency**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, default aktif). Tanpa
batas `max_concurrent`, perilakunya tidak berubah.

> Gerbang routing quota-share (`selectQuotaShareTarget`, DRR + P2C) sendiri
> bersifat fail-open dan hanya _menurunkan prioritas_ koneksi yang mencapai batas
> — dengan pool satu koneksi ia tidak bisa membatasi secara keras, sehingga
> semaphore inilah yang sebenarnya membendung banjir permintaan.

### Retry sadar cooldown pada kombo

Untuk setiap strategi kombo (bila diaktifkan), permintaan yang akan mengkristalkan
429 untuk cooldown transien SINGKAT akan menunggunya lalu melakukan dispatch ulang
alih-alih mengembalikan 429 — ini mencakup jendela TPM/RPM kelas Gemini
(retry-after ~60 detik) pada kombo multi-model, mis. kedua target kombo 2 model
sama-sama terkena rate limit per model. Dibatasi oleh `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) di **Settings → Resilience**.
Ia tidak pernah menunggu pada `quota_exhausted` (terkunci hingga tengah malam)
atau alasan auth/not-found.

Gerbang yang sama mencakup kasus pra-dispatch (#16319): ketika setiap target
kombo dilewati sebelum percobaan apa pun dilakukan karena modelnya berada dalam
lockout transien singkat, jalur tanpa percobaan ini menunggu lockout tersebut
di bawah batas yang sama lalu melakukan dispatch ulang, alih-alih menjawab
`503 ALL_TARGETS_SKIPPED` tanpa petunjuk. Ketika penantian tidak diizinkan
(batas, percobaan, atau bujet habis, atau fitur dimatikan), respons terminal
ditingkatkan menjadi `429 rate_limit_error` yang membawa `retry_after` /
`reset_at` dari kedaluwarsa lock transien paling awal; lock kuota, auth, dan
not-found tetap menghasilkan 503 tanpa petunjuk.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Kontrol Admisi Antrean Permintaan (v3.8.49 · issue #6593)

**Cakupan**: antrean rate-limit lokal per-provider+koneksi (`open-sse/services/rateLimitManager.ts`,
didukung oleh Bottleneck), satu lapisan di bawah tiga mekanisme di atas.

**`maxWaitMs` membatasi waktu tunggu antrean; `executionMaxWaitMs` membatasi eksekusi.**
Keduanya sengaja dipisahkan, dan tidak ada yang mempengaruhi satu sama lain.

`resilienceSettings.requestQueue.maxWaitMs` adalah **anggaran waktu tunggu antrean**: ia
mencakup menunggu slot provider dan kemudian berada dalam status QUEUED, dan timernya
dihapus begitu job meninggalkan QUEUED dan mulai dieksekusi
(`rateLimitManager.ts`, `wrappedFn`). Permintaan yang melampauinya tidak pernah sampai
ke upstream. Default 30000ms, disediakan oleh `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
di `src/lib/resilience/settings.ts` dan dikunci oleh
`tests/unit/ratelimit-admission-control-6593.test.ts`, sehingga perubahan padanya membuat
pengujian tersebut merah daripada membiarkan paragraf ini diam-diam usang.

`resilienceSettings.requestQueue.executionMaxWaitMs` adalah apa yang diterima Bottleneck
sebagai `expiration` job, yang timernya baru dimulai setelah dispatch. Ia
merupakan pengaman bagi executor yang tidak memiliki timeout upstream sendiri, dan ia
dinaikkan ke timeout fetch-start milik executor ketika itu lebih lama, sehingga ia
tidak dapat memutus respons yang sedang berjalan dengan sehat. Default 600000ms (10 menit).

Memasukkan anggaran antrean ke dalam `expiration` adalah hal yang dulu mematikan gateway
non-inkremental di tengah jalan — gateway tersebut memang berjalan selama beberapa menit sebelum byte pertama —
dan itulah mengapa expiration dimunculkan sebagai `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) sementara anggaran antrean membawa
kode queue-timeout. Ganti salah satunya melalui `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) atau dashboard
(**Settings → Resilience**). Keduanya dibatasi ke rentang 1ms–24 jam saat dinormalisasi.

**Prioritas, untuk keduanya:** env var hanya menyediakan _default_. Nilai
yang tersimpan di `resilienceSettings.requestQueue` (dashboard / patch API, disimpan
di `key_value`) mengalahkannya, dan
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` per-koneksi mengalahkan itu. Jadi, mengatur
env var pada deployment yang sudah memiliki nilai tersimpan tidak
mengubah apa pun — bersihkan atau perbarui pengaturan yang tersimpan sebagai gantinya.

Waktu tinggal dalam antrean dibatasi oleh `maxWaitMs`; `maxQueueDepth` di bawah membatasi
berapa banyak pemanggil yang boleh mengantre sekaligus.

**Percobaan ulang yang dinyatakan di body: pacing vs lockout.** Body 429 dapat menyebutkan waktu tunggunya sendiri
(Gemini `RetryInfo.retryDelay`, teks "retry after Ns"), yang
dibaca oleh `updateFromResponseBody`. Waktu tunggu yang sesuai dengan `maxWaitMs`
koneksi adalah pacing: limiter mengosongkan reservoirnya selama itu dan panggilan yang mengantre
dikirim saat reservoir terisi kembali. Waktu tunggu yang lebih lama dari `maxWaitMs` bukanlah sesuatu yang
bisa ditunggu oleh antrean — Gemini menjawab kuota harian yang habis dengan
`retryDelay: "86399s"`. `Retry-After` yang diteruskan pada 429 yang dibangun ulang (#16528)
sudah membuat mesin fallback mengunci model untuk jendela waktu tersebut, tetapi menghentikan sementara
limiter untuk itu juga tetap akan menghentikan panggilan apa pun yang mencapai key lebih awal
(setelah reset resiliensi, misalnya) selama `maxWaitMs` penuh. Ketika waktu tunggu seperti itu berasal dari detail
`RetryInfo` Google yang bertipe (provenance `google_rpc_retry_info`) dan limiter key
sudah terlingkup pada model (lihat `getLimiterKey`), 429 tersebut menjadi
lockout model pada koneksi itu (`lockModelForLongBodyRetry` di
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, dibatasi maksimal 24 jam), dan
limiter dibiarkan tidak dijeda. Pemilihan akun dilewati pada kunci tersebut melalui
`isModelLocked()`, dan begitu juga gerbang pra-dispatch combo untuk target yang dipin ke
koneksi tersebut. Pada antigravity, yang limiternya per keluarga kuota, kuncinya
ada pada model yang tepat, seperti kunci kuota lainnya. Nama yang diminta klien
juga dikunci ketika sebuah alias me-resolve-nya ke model tersebut, karena pemeriksaan tersebut menggunakan
nama yang diminta; ia dikunci secara tepat (`lockExactModel`), sehingga alias yang
melintasi keluarga kuota antigravity atau cakupan codex tidak pernah mengunci miliknya sendiri.
Petunjuk berupa prosa, `retryDelay` yang tidak bertipe, atau
limiter yang dipakai bersama oleh seluruh koneksi tetap mempertahankan jeda. Ketika limiter yang baru saja
dibangun ulang oleh jalur 429 benar-benar dijeda, pemanggil yang sisa waktu antreannya berakhir
sebelum jeda tersebut berakhir langsung ditolak dengan kode queue-timeout
(`checkLimiterPause`) alih-alih menunggu waktu itu habis; waktu akhir yang tercatat
ditambatkan sebelum limiter dibangun, di mana Bottleneck memulai jam refresh-nya,
dan perubahan apa pun kemudian pada reservoir akan melupakannya. Dicakup oleh
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` dan
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — batas admisi opt-in (baru).** `resilienceSettings.requestQueue.maxQueueDepth`
membatasi berapa banyak permintaan yang boleh mengantre (belum dikirim) untuk satu
provider+koneksi sekaligus. Ketika antrean sudah menampung `maxQueueDepth`
permintaan, permintaan baru ditolak dengan cepat (fast-reject) dengan error bertipe
`code: "RATE_LIMIT_QUEUE_FULL"` **sebelum** ia pernah mencapai `limiter.schedule()`
— sehingga penolakan itu murah dan terjadi sebelum pekerjaan
kompresi-prompt / translasi apa pun di hilir untuk permintaan tersebut. Default `0` =
dinonaktifkan, mempertahankan perilaku antrean tak terbatas yang sudah ada; dibatasi 0–100000.
Ganti melalui `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) atau
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/patch API).

Pemeriksaan admisi itu sendiri adalah fungsi murni
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) sehingga
dapat diuji unit tanpa limiter Bottleneck sungguhan.

> RFC yang membuka #6593 juga mengusulkan flag
> `bypassCompressionOnRateLimit`. Pipeline `open-sse/services/compression/`
> di repo ini adalah kompresi prompt/konteks pada request LLM keluar
> (`chatCore.ts`, sekitar blok `resolveCompressionSettings`/`selectCompressionStrategy`),
> bukan kompresi respons HTTP pada body 429 yang disintesis — tidak ada
> code path yang cocok untuk flag bypass literal. Langkah kompresi prompt
> tersebut juga saat ini berjalan _sebelum_ `withRateLimit()` dalam pipeline
> request, sehingga menyusun ulang urutan untuk melewatinya saat penolakan
> antrean-penuh adalah perubahan terpisah yang lebih besar daripada cakupan
> issue ini; perubahan itu sengaja **tidak** diimplementasikan di sini dan
> ditinggalkan sebagai tindak lanjut jika penghematan CPU sepadan dengan
> risiko penyusunan ulang.

### Jaring Pengaman Auto-Enable Rate-Limit & Perlindungan Koneksi (`rateLimitProtection`)

**Jaring pengaman auto-enable** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, default `true`):
Secara default, OmniRoute secara otomatis mengaktifkan perlindungan antrean rate-limit untuk semua koneksi provider API-key yang aktif (`getProviderCategory(provider) === "apikey"`). Ini memastikan request masuk ke API key upstream yang sensitif terhadap rate akan diantrekan dan dibatasi lajunya melalui Bottleneck, alih-alih membanjiri upstream hingga memicu error 429. Jaring pengaman ini dapat ditimpa melalui variabel lingkungan `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` menonaktifkan, `true`/`1`/`on` memaksa aktif), yang lebih diutamakan daripada pengaturan dashboard yang tersimpan (**Pengaturan → Resiliensi** / `PATCH /api/resilience`).

**Semantik `rateLimitProtection` per koneksi:**
Perlindungan rate-limit per koneksi dilacak melalui field boolean `rateLimitProtection` pada koneksi provider (disimpan sebagai `rate_limit_protection` di SQLite):

- **Aktif eksplisit (`rateLimitProtection === true`)**: Perlindungan rate-limit secara eksplisit diaktifkan untuk koneksi ini, terlepas dari kategori provider atau apakah jaring pengaman auto-enable dinyalakan.
- **Nonaktif eksplisit (`rateLimitProtection === false`)**: Menonaktifkan perlindungan eksplisit, tetapi **tidak** mengeluarkan koneksi API-key aktif dari jaring pengaman auto-enable global. Di `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` dan `undefined` setara: hanya `rateLimitProtection === true` yang diperlakukan sebagai override eksplisit. Jika `rateLimitProtection` bernilai `false` (atau tidak diatur), koneksi API-key aktif tetap memenuhi kondisi auto-enable dan tetap dilindungi rate-limit.
- **Tidak ada opt-out per koneksi**: Operator saat ini tidak dapat menyatakan "koneksi API-key aktif tunggal ini harus berjalan tanpa perlindungan antrean rate-limit" sambil tetap menjaga auto-enable aktif untuk koneksi lainnya. Untuk menjalankan koneksi API-key sepenuhnya tanpa antrean rate-limit, jaring pengaman harus dimatikan secara global (`RATE_LIMIT_AUTO_ENABLE=false` atau `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Jalur penulisan yang didukung:**

- **`POST /api/rate-limits`**: Jalur penulisan manajemen yang didukung untuk mengubah `rateLimitProtection` suatu koneksi (`{ connectionId: string, enabled: boolean }`). Memanggil endpoint ini dengan `enabled: true` mengaktifkan perlindungan eksplisit; memanggilnya dengan `enabled: false` menghapus perlindungan eksplisit (meskipun koneksi API-key aktif tetap tercakup oleh jaring pengaman global jika auto-enable aktif).
- **`PUT /api/providers/[id]`**: Dengan sengaja **tidak** menerima atau mengubah `rateLimitProtection` (#11278). Memperbarui metadata koneksi provider melalui `PUT /api/providers/[id]` tidak akan pernah mengubah status perlindungan rate-limit yang tersimpan.

---

## 6. Watchdog throughput aliran lambat (#9709)

Pelindung opsional `resilienceSettings.streamRecovery.throughputWatchdog` mendeteksi
upstream yang masih mengirimkan chunk tetapi menghasilkan output asisten di bawah
laju output berguna yang dikonfigurasi. Ini sengaja dibuat berbeda dari idle timeout:
heartbeat dan metadata tidak mereset kedua timer dan tidak dihitung sebagai kemajuan.
Ini juga berbeda dari batas waktu percobaan keras (#9153), yang tetap menjadi batas
keamanan absolut terlepas dari kualitas output.

Watchdog memerlukan periode pemanasan (warm-up) diikuti oleh jendela bergulir (rolling
window) yang lengkap sebelum dapat membatalkan. Ia menghitung delta teks dari event
output Chat Completions dan Responses API (proksi byte UTF-8 yang konservatif),
mengabaikan event yang hanya berisi usage dan event kosong, serta menunda penilaian
selama event tool-call atau reasoning sedang berlangsung. Fitur ini dinonaktifkan
secara default dan dapat diaktifkan dengan `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
jendela, warm-up, laju minimum, dan output terukur minimum dibatasi oleh lapisan
normalisasi resilience-settings yang biasa.

Saat diaktifkan, pembatalan oleh watchdog hanya diterapkan pada percobaan upstream
yang aktif. Sebelum byte apa pun terlihat oleh klien, jalur pemulihan awal akun-yang-sama
yang sudah ada dapat membuka kembali percobaan tersebut. Setelah commit, aliran tidak
pernah diputar ulang secara membabi buta; hanya kontrak kelanjutan mid-stream aman
yang sudah ada yang dapat menyambung sufiks. Finalisasi tetap bersifat single-shot,
sehingga pencatatan usage dan pelepasan semaphore tidak terduplikasi.

---

## 7. Penyajian Ulang Status Upstream (error kuota dengan status yang keliru)

**Cakupan:** satu gateway upstream yang melaporkan kehabisan kuota sementara dengan status HTTP yang salah.

**Tujuan:** memperbaiki status yang menyesatkan SEBELUM klasifikasi, sehingga konsumen downstream (mesin fallback, agregasi combo, respons yang menghadap klien) melihat sifat kegagalan yang sebenarnya dapat dicoba ulang.

Beberapa gateway menandai kehabisan kuota SEMENTARA dengan status HTTP
yang tidak dapat dicoba ulang. `agentrouter.org` mengembalikan `403` (kadang `400`) dengan body berbahasa Tionghoa
(`用户额度不足` / `额度不足`) alih-alih `429` standar. Klien seperti Claude
Code memperlakukan `403` sebagai permanen dan membatalkan sesi, dan tanpa koreksi
mesin fallback akan mengklasifikasikannya sebagai `AUTH_ERROR` alih-alih peristiwa
kuota.

**Implementasi:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` —
  daftar aturan per penyedia (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), dicocokkan melalui `applyStatusRestatement()`.
- Lokasi pemanggilan: blok `providerFailure:` di `open-sse/handlers/chatCore.ts`
  (sekitar baris 3654), tepat setelah `parseUpstreamError()` mengurai respons
  upstream dengan status HTTP error (`!providerResponse.ok`), dan sebelum
  klasifikasi apa pun dijalankan, sehingga setiap konsumen downstream melihat
  status yang telah dikoreksi. Error yang tertanam di dalam stream SSE `200`
  mengikuti jalur penguraian stream yang terpisah dan terjadi kemudian, serta
  **tidak** dicakup oleh hook ini saat ini — keterbatasan yang diketahui,
  belum diperlukan untuk kesalahan status agentrouter (yang muncul sebagai
  status HTTP error).
- Kelayakan retry: `429` ada di `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), sehingga error yang
  disajikan ulang membawa jendela retry yang nyata alih-alih muncul sebagai
  `403` mati.
- `defaultRetryAfterMs` sintetis `60s` (`upstreamStatusRestatement.ts`)
  hanyalah apa yang diberitahukan respons yang disajikan ulang kepada
  **klien**; itu sendiri bukan durasi cooldown/lockout internal koneksi —
  hal itu diatur secara terpisah oleh mekanisme apa pun yang benar-benar
  menangani error yang disajikan ulang (backoff bertingkat Connection
  Cooldown, §2, dasar `3s` untuk penyedia API-key; atau Model Lockout, §3,
  untuk penyedia kuota per model seperti agentrouter). Router dapat menjadi
  layak untuk mencoba ulang secara internal lebih cepat daripada jendela 60
  detik yang diiklankannya kepada klien — ruang cadangan yang disengaja,
  bukan bug.

Error permanen (`无权访问模型` milik agentrouter — tidak ada akses ke model ini)
TIDAK PERNAH disajikan ulang: `excludeMarkers` memveto aturan bahkan ketika
`textMarkers` cocok, sehingga error mempertahankan status aslinya dan tidak ada
yang mencobanya ulang selamanya. Aturan klasifikasi penyedia yang cocok
(`agentrouter-model-access-denied` di `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown dasar `6h` yang dideklarasikan)
dikonsultasikan oleh `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_sebelum_ early-return `FORBIDDEN` kategori apikey generik, digerbangi oleh
`honorsRuleLockScope(provider)` (#10334 — saat ini eksklusif untuk agentrouter
melalui allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` di
`providerErrorRules.ts`). Cooldown 6 jam yang dideklarasikan aturan mengalir
sebagai `fallbackResult.baseCooldownMs`, tetapi tetap masuk ke jalur lockout
kuota per model yang sudah ada sebelumnya (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, tidak diubah oleh #10334 kecuali untuk sumber
cooldown): dibatasi ke `mlSettings.maxCooldownMs` milik operator
(default `1_800_000ms` / 30 menit), seperti setiap model lockout lainnya, dan
_alasan lockout yang dipersistensi_ tetap `"forbidden"` hardcoded yang sudah ada
sebelumnya, bukan `"auth_error"` milik aturan — hanya durasi cooldown yang
dihormati secara end-to-end, bukan string alasannya. Koneksi itu sendiri tetap
aktif; model-model saudara pada koneksi yang sama tidak terpengaruh.

Error kuota yang disajikan ulang (`额度不足`) mencapai aturan penyedia di
produksi (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, tanpa cooldown yang dideklarasikan sendiri — default backoff
berskala lapisan persistensi yang berlaku). Sejak #10334, `scope` pada
`ProviderErrorRuleMatch` BENAR-BENAR dikonsumsi secara end-to-end, tetapi
**hanya** untuk penyedia dalam allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — hari ini hanya `"agentrouter"`, digerbangi melalui
`honorsRuleLockScope()`). Untuk setiap penyedia lainnya, `scope` tetap bersifat
informasional, persis seperti sebelum #10334.
`checkFallbackError` memunculkan scope aturan yang cocok sebagai
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) adalah guard bersama yang mengonfirmasi bahwa
`ruleScope` benar-benar aman untuk dihormati sebagai sinyal cakupan koneksi
yang dapat pulih sendiri (scope `"connection"`, alasan `quota_exhausted`,
tidak pernah `permanent`, tidak pernah `creditsExhausted` — pertahanan
terhadap kemungkinan aturan di masa depan yang memasangkan scope
`"connection"` dengan status akun permanen). Dua konsumen memanggilnya:

- **Persistensi** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  alih-alih jatuh ke cabang lockout **per-model** passthrough-provider
  (agentrouter adalah `passthroughModels: true` → `hasPerModelQuota()`
  mengembalikan `true`), ia menerapkan **cooldown koneksi sementara** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, tidak pernah status
  terminal (`credits_exhausted`/`banned`/`expired`) — sehingga koneksi pulih
  sendiri begitu cooldown berakhir, alih-alih memerlukan reset kredensial
  manual. Dilewati untuk koneksi dengan `disableCooling: true` (#2997):
  opt-out tersebut justru diteruskan ke lockout per-model (trade-off yang
  terdokumentasi — lihat komentar kode di atas cabang tersebut).
- **Routing combo same-request** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): guard yang sama menandai
  koneksi ke dalam set `exhaustedConnections` di memori, dengan kunci
  `${provider}:${connectionId}`. Ini hanya melewati target SAME-REQUEST
  tersisa yang _dirinya sendiri sudah membawa `connectionId` yang persis
  itu_ pada objek targetnya sendiri (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` sebelum pencarian `exhaustedConnections`) — combo daftar-model
  biasa, di mana target-target selevel tidak membawa `connectionId` ter-pin
  miliknya sendiri dan sebuah `connectionId` hanya diresolusi per-dispatch
  dari header `X-OmniRoute-Selected-Connection-Id` pada respons, tidak pernah
  mencapai kecocokan kunci tersebut. Untuk kasus umum itu, perlindungan
  sesungguhnya terhadap leg tersisa yang memakai ulang akun yang baru saja
  exhausted BUKANlah Set ini — melainkan lapisan persistensi di atas
  (`rateLimitedUntil` koneksi kini berada di masa depan) yang dipadukan dengan
  guard yang sama ini menekan `transientRateLimitedProviders` untuk kegagalan
  tersebut (lihat "Desain dua tahap" dan komentar kode pada cabang
  `isAgentrouterConnectionQuotaScope` di `targetExhaustion.ts`): dengan Set
  itu dibiarkan tidak ditandai, force-allow `allowRateLimitedConnection`
  milik `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`)
  TIDAK ikut berlaku untuk leg-leg tersisa provider tersebut, sehingga filter
  `rateLimitedUntil` milik pemilihan kredensial
  (`src/sse/services/auth.ts:1238`) dipatuhi secara normal dan leg tersisa
  entah memilih koneksi agentrouter lain yang masih eligible atau gagal tanpa
  kredensial yang tersedia — ia tidak memaksa jalannya kembali ke koneksi
  yang baru saja di-cooldown oleh cabang ini.

### Desain dua tahap: restatement status, lalu klasifikasi

Restatement status (`upstreamStatusRestatement.ts`) dan aturan klasifikasi
provider (`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`)
adalah registri terpisah yang keduanya berkunci pada id provider dan penanda
teks, tetapi keduanya berjalan di tempat yang berbeda dan melayani tujuan
yang berbeda: restatement menulis ulang status HTTP lebih awal di
`chatCore.ts`; aturan klasifikasi memilih `reason` fallback dan mengunci
`scope` (`model` / `provider` / `connection`) di dalam `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Aturan klasifikasi hanya melihat **teks** error lengkap (diperlukan untuk
mencocokkan penanda body seperti `额度不足`) untuk provider yang tercantum
dalam allowlist `FULL_TEXT_RULE_PROVIDERS` di `providerErrorRules.ts` — saat
ini hanya `"agentrouter"`. Untuk setiap provider **katalog bawaan** lainnya,
`checkFallbackError` hanya menyerahkan error terstruktur (`{code, type}`) ke
`getProviderErrorRuleMatch`, yang cukup untuk aturan berbasis
header/status/kode tetapi buta terhadap penanda teks body. Helper
`resolveRuleMatchBody()` melakukan pemilihan ini: teks error lengkap untuk
provider yang di-allowlist, error terstruktur untuk selebihnya. Menambahkan
provider **bawaan** ke `FULL_TEXT_RULE_PROVIDERS` adalah opt-in eksplisit
per-provider — mekanisme ini ada agar jalur default untuk setiap provider
yang tidak ada dalam daftar tetap tidak berubah byte demi byte.

`scope` suatu aturan (`model` / `provider` / `connection`) adalah opt-in
yang terpisah dari `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` hanya
menampilkannya sebagai `fallbackResult.ruleScope`, dan konsumen downstream
hanya mematuhinya sebagai lebih dari sekadar label informasional, untuk
provider dalam allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` di file yang sama
(digerbangi melalui `honorsRuleLockScope()` — saat ini hanya
`"agentrouter"`). Lihat "Error kuota yang dinyatakan ulang" di atas untuk apa
yang sebenarnya dilakukan oleh kecocokan `scope: "connection"` setelah sebuah
provider berada di allowlist tersebut.

**#11104 — aturan yang dideklarasikan operator melewati kedua allowlist.**
Operator dapat mendeklarasikan aturan per-provider saat runtime melalui
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
tanpa mengedit file ini. Mengerbangi aturan operator di balik
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlist
yang dimaksudkan untuk melindungi perilaku **default** aturan katalog bawaan —
akan membuat mekanisme pengaturan menjadi inert untuk setiap provider kecuali
yang sudah tercantum di sana, karena mendeklarasikan aturan itu sendiri sudah
merupakan opt-in eksplisit dari operator. `resolveRuleMatchBody()` dan
`honorsRuleLockScope()` sama-sama memeriksa `hasOperatorRuleForProvider()`
terlebih dahulu: provider dengan aturan operator mendapatkan teks error
mentah dan `scope` yang dideklarasikannya dipatuhi, terlepas dari apakah
provider itu juga muncul di salah satu allowlist.

**Celah yang diketahui — `providerRuleRegistry` tidak pernah dikonsultasikan
untuk HTTP 400.** Cabang `BAD_REQUEST` milik `checkFallbackError`
mengklasifikasikan status 400 sepenuhnya melalui array polanya sendiri
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, dll. di
`accountFallback.ts`) dan return sebelum cabang
`configuredRule`/`getProviderErrorRuleMatch` di atasnya tercapai. Aturan
katalog bawaan (atau aturan operator) dengan `status: 400` valid secara
sintaksis tetapi tidak akan pernah terpicu. Belum ada aturan yang menargetkan
400 saat ini, jadi tidak ada apa pun di produksi yang terpengaruh — tetapi
aturan 400 di masa depan mengharuskan cabang ini disentuh terlebih dahulu,
yang merupakan perubahan lebih besar daripada sekadar menambahkan aturan
(perubahan itu mengklasifikasi ulang 400 untuk setiap provider yang sudah
bergantung pada perilaku array pola) dan berada di luar cakupan penambahan
aturan untuk satu provider.

### Menambahkan gateway baru yang salah menyatakan kuota

1. Daftarkan satu array aturan di `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Jaga agar `textMarkers`
   tetap spesifik per provider; jangan pernah memakai ulang frasa bahasa Inggris
   generik yang bertabrakan dengan
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Secara opsional, daftarkan aturan klasifikasi di
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) untuk memilih
   cakupan lock yang tepat (`connection` untuk kuota seluruh akun, `model` untuk
   error per model). Langkah ini hanya berlaku di produksi untuk
   provider yang aturannya memerlukan teks error lengkap (penanda body): tambahkan
   id provider ke `FULL_TEXT_RULE_PROVIDERS` di file yang sama — jika tidak,
   `checkFallbackError` hanya akan meneruskan error terstruktur
   `{code, type}` ke aturan tersebut, dan aturan berbasis teks body tidak akan
   pernah cocok dengan trafik langsung.
   Aturan yang cocok murni berdasarkan `status`/`headers` (seperti milik Opencode
   atau Minimax) tidak memerlukan opt-in ini. Secara terpisah, jika aturan
   mendeklarasikan `scope: "connection"` dan maksudnya adalah cooldown seluruh
   koneksi yang sebenarnya ditambah pelewatan combo pada permintaan yang sama
   (bukan sekadar label informasional), tambahkan id provider ke
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` di file yang sama — inilah yang mengontrol
   konsumsi ala `isAgentrouterConnectionQuotaScope()` di
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) dan
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); tanpanya, `scope`
   tetap mengalir melalui `fallbackResult.ruleScope` tetapi tidak ada yang
   menindaklanjutinya.
3. Tambahkan unit test yang mencerminkan `tests/unit/upstream-status-restatement.test.ts`
   dan `tests/unit/agentrouter-error-rules.test.ts` (termasuk pengaman
   not-permanent / not-creditsExhausted, dan — jika provider memerlukan
   allowlist — sebuah test yang memastikan `resolveRuleMatchBody()` mengembalikan
   teks lengkap hanya untuk provider tersebut).

Tidak diperlukan perubahan pada `chatCore.ts`, `classifyError`, atau combo.

#### Penguncian berbasis bucket egress (#10880)

Provider dalam `EGRESS_BUCKETED_LOCK_PROVIDERS` (keluarga opencode) diperlakukan
sebagai upstream yang ter-bucket per IP (tier gratis opencode ter-bucket per IP,
bukan ter-bucket per akun — lihat #9611): sebuah status-429 yang diklasifikasikan
sebagai `quota_exhausted` **atau** `rate_limit_exceeded` akan mendinginkan setiap
koneksi keluarga yang masuk allowlist yang IP egress terakhirnya yang diketahui
cocok dengan milik koneksi yang gagal, sebelum rotasi sempat mencobanya
— sehingga menghindari N-1 panggilan upstream yang pasti gagal (pola yang sama
seperti #10460/#10525).
`rate_limit_exceeded` disertakan secara sengaja: di jalur `markAccountUnavailable`
aturan spesifik opencode tidak pernah cocok (tidak ada headers/body yang diberikan
ke `checkFallbackError`, opencode tidak ada di `FULL_TEXT_RULE_PROVIDERS`), sehingga
429 yang body-nya memuat teks kuota langganan ("monthly usage limit
reached") diklasifikasikan sebagai `quota_exhausted` oleh fallback teks-kuota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown 1 jam) sebelum
aturan `status_429` pernah tercapai — sementara 429 tanpa teks kuota (rate
limiting biasa) diklasifikasikan melalui aturan `status_429` sebagai
`rate_limit_exceeded` dan tetap mendinginkan keluarga IP tersebut. Untuk provider
yang masuk allowlist, rate limit yang ter-bucket per IP adalah sinyal yang sama
dengan kuota yang habis. Batasan yang jujur:

- **Upaya terbaik (best-effort)**: kunci menyelesaikan `egress_ip` terakhir
  yang diketahui milik koneksi dari `proxy_logs` (jendela 24 jam, sinkron,
  tanpa cache). Cache dingin (IP egress tidak pernah diperiksa) atau tidak ada
  baris → koneksi yang gagal tetap didinginkan oleh cabang ini (dicatat seperti
  biasa), hanya saja tidak ada sibling yang dikunci.
- **Tidak pernah terminal**: cooldown adalah jendela kuota yang terus
  diperbarui (`testStatus: "unavailable"`); status permanen tidak pernah
  diturunkan dari sinyal tingkat IP. Koneksi `disableCooling` melewati cabang
  ini sepenuhnya.
- **Granularitas kunci berubah untuk keluarga yang di-allowlist**: ini adalah
  perubahan cakupan, bukan sekadar optimasi sibling. opencode adalah provider
  `passthroughModels`, jadi sebelum cabang ini kode 429 menghasilkan penguncian
  per-MODEL; kini menghasilkan cooldown koneksi — termasuk untuk operator yang
  menjalankan satu koneksi tanpa sibling sama sekali. Itulah granularitas yang
  sudah dideklarasikan benar oleh tabel aturan opencode
  (`scope: "connection"`, `providerErrorRules.ts`), yang selama ini tidak
  pernah diterapkan karena opencode tidak ada di
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Cabang ini menulis sendiri cooldown
  koneksi yang gagal + `backoffLevel`, meniru cabang agentrouter yang
  bercakupan koneksi, lalu kembali — blok per-model dan jalur generik di bawah
  tidak pernah tercapai.
- **Combo disertakan**: seperti cabang agentrouter, cakupan ini dengan sengaja
  mengabaikan downgrade `persistUnavailableState`/`isCombo` yang diterapkan
  pemanggil combo pada kode 429. Penguncian per-model bukan bentuk yang lebih
  lemah dari cakupan ini, melainkan unit yang salah: ia tidak mengatakan apa
  pun tentang IP yang habis, sehingga rotasi combo akan terus membakar satu
  panggilan yang pasti gagal per sibling.
- **Keamanan sibling**: sibling yang sudah terminal (banned/credits_exhausted)
  atau sudah berada dalam cooldown yang lebih lama tidak pernah ditimpa.
- **Allowlist eksklusif**: memperluas `EGRESS_BUCKETED_LOCK_PROVIDERS` adalah
  keputusan eksplisit pemilik; tanpa wiring generik (pola #10334/#10419).
  Kueri sibling mengikat allowlist yang sama alih-alih mengulanginya sebagai
  literal SQL, sehingga memperluasnya tetap menjadi perubahan satu baris.
- **Rotasi IP egress, dua arah**: jendela pencarian (24 jam) jauh lebih lebar
  daripada TTL cache IP egress (5 menit), jadi "IP terakhir yang diketahui"
  adalah riwayat, bukan keadaan saat ini. Jika proxy sebuah koneksi berotasi
  dalam jendela tersebut, kunci mungkin **melewatkan** IP yang benar-benar
  dipakai bersama (IP yang tercatat adalah IP baru yang belum habis) — dan
  secara simetris ia mungkin **mendinginkan sibling yang sejak itu telah
  berotasi menjauh** dari IP yang habis. Kasus kedua membebankan sibling
  tersebut satu jendela cooldown; keduanya adalah batasan best-effort yang
  diterima dari pencarian berbasis riwayat.
- **Biaya**: dua pemindaian terbatas pada `proxy_logs` (difilter per jendela
  melalui `idx_pl_timestamp`), hanya pada frekuensi 429. Tidak ada indeks baru
  (migrasi 134 YAGNI). Diukur pada salinan DB lalu lintas nyata berukuran
  sedang; instans dengan throughput tinggi menyimpan lebih banyak baris secara
  proporsional dalam jendela yang sama.

---

## Fitur Ketahanan Lainnya

- **21 strategi routing** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — lihat [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-aware routing** (v3.8.0) — memprioritaskan koneksi berdasarkan waktu reset kuota.
- **Degradasi mode background** — Responses API `background: true` didegradasi ke sinkron dengan peringatan.
- **Deteksi batas jumlah tool dinamis** — mundur dari provider saat batas jumlah tool tercapai.
- **Fallback darurat** — dikendalikan oleh `OMNIROUTE_EMERGENCY_FALLBACK`; operator dapat menimpanya dari halaman Feature Flags tanpa restart.

---

## Debugging

- Weighted combo menjawab `503 all_targets_cooling_down` (`Retry-After` diatur, `diagnostics.excluded` mencantumkan setiap target dengan `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool sudah dikonfigurasi dan terhubung, setiap target hanya dikecualikan oleh timer ketahanan; peringatan `[COMBO] Weighted selection: every target excluded before dispatch — …` menyebutkan alasan dan detik yang tersisa. `404 no_executable_targets` dari combo yang sama berarti tidak ada timer ketahanan yang terlibat (tidak ada yang bisa dijalankan, atau setiap akun gagal dalam probe ketersediaan). Dibangun di `open-sse/services/combo/pinRecovery.ts` dari pengecualian yang dikumpulkan di `targetResolution.ts`.
- Semua key untuk suatu provider dilewati → periksa state circuit breaker DAN `rateLimitedUntil`/`testStatus` setiap koneksi.
- Provider dikecualikan secara permanen setelah jendela reset → kode membaca `state` mentah alih-alih `getStatus()`/`canExecute()`.
- Satu key gagal, yang lain seharusnya berfungsi → utamakan cooldown koneksi daripada circuit breaker.
- Hanya satu model yang gagal → utamakan model lockout daripada cooldown koneksi.
- State seharusnya pulih sendiri tetapi tidak → periksa timestamp di masa depan + jalur baca yang menyegarkan state kedaluwarsa. Status permanen memerlukan perubahan manual.

---

## State runtime — referensi cepat agen

> Dipindahkan apa adanya dari `AGENTS.md` → "Resilience Runtime State" (PR #12743) agar
> panduan agen tetap di bawah anggaran konteks 40k. Ini adalah tampilan ringkas yang ditujukan
> untuk agen dari bagian-bagian di atas; bagian bernomor tetap menjadi referensi lengkap.

OmniRoute memiliki tiga mekanisme kegagalan sementara yang saling terkait tetapi berbeda.
Jaga agar cakupannya tetap terpisah saat men-debug perilaku routing. Lihat
[diagram ketahanan 3 lapis](../diagrams/exported/resilience-3layers.svg)
(sumber: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
untuk peta sekilas.

### Circuit Breaker Provider

**Cakupan**: seluruh provider, mis. `glm`, `openai`, `anthropic`.

**Tujuan**: menghentikan pengiriman trafik ke provider yang berulang kali gagal di tingkat
upstream/layanan, sehingga satu provider yang tidak sehat tidak memperlambat setiap permintaan.

**Implementasi**:

- Kelas inti: `src/shared/utils/circuitBreaker.ts`
- Pengkabelan gate/eksekusi chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status runtime: `src/app/api/monitoring/health/route.ts`
- Wrapper bersama: `open-sse/services/accountFallback.ts`
- Tabel state yang dipersistensikan: `domain_circuit_breakers`

**State** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: trafik normal diizinkan.
- `DEGRADED`: pita peringatan dini — kegagalan telah melewati ambang degradasi tetapi belum
  melewati ambang breaker; trafik masih mengalir, dashboard menampilkan peringatan. Uji koneksi
  yang valid atau jendela tenang tanpa kegagalan baru mengembalikannya ke `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` memuat jendelanya).
- `OPEN`: provider diblokir sementara; pemanggil mendapat respons provider-circuit-open
  atau routing combo beralih ke target lain.
- `HALF_OPEN`: timeout reset telah berlalu; izinkan satu permintaan probe. Keberhasilan menutup
  breaker, kegagalan membukanya lagi.

**Default** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, dikonsumsi melalui
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` di `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` di `src/sse/handlers/chatHelpers.ts`). Breaker seluruh
provider berjalan pada `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil  | terdegradasi pada | terbuka pada (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | ----------------: | ---------------------------------------: | ----------------------------: |
| OAuth   |               `5` |                                      `8` |                         `60s` |
| API key |               `7` |                                     `12` |                         `30s` |
| Local   |      (diturunkan) |                                      `2` |                         `15s` |

`PROVIDER_PROFILES` juga mendefinisikan `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 menit) dan `providerCooldownMs` (5/10/1 menit): ketiganya
menggerakkan **window gate dari Provider Cooldown global yang bersifat opt-in**
(`PROVIDER_COOLDOWN_ENABLED`, default nonaktif) — entri tingkat provider di
`open-sse/services/providerCooldownTracker.ts` hanya dihitung sebagai cooling setelah
kegagalan sebanyak `providerFailureThreshold` di dalam `providerFailureWindowMs`, lalu
cooling selama `providerCooldownMs`. Keduanya BUKAN ambang breaker yang aktif — jangan
menyetelnya dengan harapan mengubah perilaku breaker. Setiap default dapat ditimpa melalui
env var `OMNIROUTE_PROVIDER_BREAKER_*` dan `OMNIROUTE_CIRCUIT_BREAKER_*`; tabel referensi
yang akurat sesuai runtime ada di `docs/architecture/RESILIENCE_GUIDE.md`.

Hanya status kegagalan tingkat provider yang boleh memicu breaker provider:

```ts
(408, 500, 502, 503, 504);
```

Jangan memicu breaker seluruh provider untuk kesalahan akun/key/model biasa seperti kebanyakan
kasus `401`, `403`, atau `429`. Biasanya itu termasuk ranah cooldown koneksi atau model
lockout. `403` provider API-key generik seharusnya dapat dipulihkan kecuali jika diklasifikasikan
sebagai kesalahan provider/akun yang terminal.

Breaker menggunakan pemulihan lazy, bukan timer latar belakang. Ketika `OPEN` kedaluwarsa, pembacaan seperti `getStatus()`, `canExecute()`, dan `getRetryAfterMs()` akan menyegarkan state menjadi `HALF_OPEN`, sehingga dashboard dan pembuat kandidat combo tidak terus mengecualikan provider yang sudah kedaluwarsa selamanya.

### Cooldown Koneksi

**Cakupan**: satu koneksi/akun/kunci provider.

**Tujuan**: melewati sementara satu kunci/akun yang bermasalah sambil membiarkan koneksi lain untuk provider yang sama tetap melayani permintaan.

**Implementasi**:

- Jalur penulisan/pembaruan: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pemilihan/penyaringan akun: `src/sse/services/auth.ts::getProviderCredentials...`
- Perhitungan cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Pengaturan: `src/lib/resilience/settings.ts`

Field penting pada koneksi provider:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Selama pemilihan akun, koneksi dilewati ketika:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown juga bersifat lazy: ketika `rateLimitedUntil` sudah berlalu, koneksi menjadi memenuhi syarat lagi. Setelah penggunaan berhasil, `clearAccountError()` membersihkan `testStatus`, `rateLimitedUntil`, field error, dan `backoffLevel`.

Perilaku cooldown koneksi default:

- Cooldown dasar OAuth: `5s`.
- Cooldown dasar API-key: `3s`.
- `429` pada API-key sebaiknya mengutamakan petunjuk retry dari upstream (`Retry-After`, header reset, atau teks reset yang dapat di-parse) bila tersedia.
- Kegagalan berulang yang dapat dipulihkan menggunakan exponential backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Perlindungan anti-thundering-herd mencegah kegagalan konkuren pada koneksi yang sama berulang kali memperpanjang cooldown atau menaikkan `backoffLevel` dua kali.

State terminal bukanlah cooldown. `banned`, `expired` (yang baru menjadi terminal setelah N percobaan ulang terbatas melalui `EXPIRED_RETRY_MAX`), dan `credits_exhausted` dimaksudkan untuk tetap tidak tersedia sampai kredensial/pengaturan berubah atau operator mengatur ulang secara manual. Jangan menimpa state terminal dengan state cooldown sementara.

### Penguncian Model

**Cakupan**: provider + koneksi + model.

**Tujuan**: menghindari penonaktifan seluruh koneksi ketika hanya satu model yang tidak tersedia atau dibatasi kuotanya untuk koneksi tersebut.

Contoh:

- Provider dengan kuota per model yang mengembalikan `429`.
- Provider lokal yang mengembalikan `404` untuk satu model yang tidak ditemukan.
- Kegagalan izin mode/model spesifik provider seperti mode Grok tertentu.

Penguncian model berada di `open-sse/services/accountFallback.ts` dan memungkinkan koneksi yang sama tetap melayani model lain.

### Panduan Debugging

- Jika semua kunci untuk suatu provider dilewati, periksa state breaker provider maupun `rateLimitedUntil`/`testStatus` setiap koneksi.
- Jika provider tampak dikeluarkan secara permanen setelah jendela reset, periksa apakah kode membaca `state` mentah alih-alih menggunakan `getStatus()`/`canExecute()`.
- Jika satu kunci provider gagal tetapi kunci lain seharusnya berfungsi, utamakan cooldown koneksi daripada breaker provider.
- Jika hanya satu model yang gagal, utamakan penguncian model daripada cooldown koneksi.
- Jika suatu state seharusnya pulih sendiri, state tersebut harus memiliki timestamp masa depan/timeout reset dan jalur pembacaan yang menyegarkan state yang kedaluwarsa. Status permanen memerlukan perubahan kredensial atau konfigurasi secara manual.

---

## Fingerprinting TLS & Stealth

Stealth spesifik provider (JA3/JA4, CCH, obfuskasi) didokumentasikan secara terpisah — lihat `docs/security/STEALTH_GUIDE.md` (git; tidak dikompilasi ke dalam `/docs`).

---

## Pengujian resiliensi (Phase 8 · Block C)

Selain unit test untuk logika resiliensi, tiga pengujian menguji runtime dalam kondisi stres/kegagalan nyata (semuanya integration/nightly — tidak ada yang memblokir PR):

| Pengujian   | Apa                                                                                                                                                                                                      | Jalankan                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Node fake-upstream menyuntikkan latensi/reset/timeout/503 nyata; memvalidasi bahwa circuit breaker terbuka/pulih dan `checkFallbackError` mengklasifikasikan 503 sebagai fallback yang dapat dipulihkan. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 stream per `createSSEStream` dengan `--expose-gc`; gagal jika heap tumbuh melampaui batas (pengaman OOM #3069).                                                                                     | `npm run test:heap`                      |
| k6 soak     | Beban berkelanjutan terhadap `/api/monitoring/health`; ambang batas p95/error.                                                                                                                           | `k6 run tests/load/k6-soak.js` (nightly) |

Diorkestrasikan oleh `.github/workflows/nightly-resilience.yml` (cron + dispatch). Pada `test:integration` default, chaos dan heap dilewati secara otomatis (tanpa `RUN_CHAOS_INT`/`--expose-gc`).

---

## Lihat Juga

- [Panduan Arsitektur](./ARCHITECTURE.md) — Arsitektur sistem dan internalnya
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Provider, kombo, integrasi CLI
- [Mesin Auto-Combo](../routing/AUTO-COMBO.md) — Penskoran 16 faktor, paket mode
