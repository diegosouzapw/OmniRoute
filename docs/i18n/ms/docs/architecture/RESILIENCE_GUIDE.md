# Resilience Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute mempunyai tiga mekanisme daya tahan yang berbeza tetapi saling berkaitan. Setiap satunya mempunyai skop dan tujuan yang berbeza. Pastikan mekanisme ini diasingkan semasa menyahpepijat tingkah laku penghalaan.

![Model daya tahan 3 lapisan](../diagrams/exported/resilience-3layers.svg)

> Sumber: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Pemutus Litar Penyedia

**Skop:** keseluruhan penyedia (cth., `glm`, `openai`, `anthropic`).

**Tujuan:** berhenti menghantar trafik kepada penyedia yang berulang kali gagal pada peringkat huluan/perkhidmatan.

**Pelaksanaan:**

- Kelas teras: `src/shared/utils/circuitBreaker.ts`
- Pendawaian: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status: `GET /api/monitoring/health`
- API tetapan semula: `POST /api/resilience/reset`
- Pembalut: `open-sse/services/accountFallback.ts`
- Jadual DB: `domain_circuit_breakers`

**Keadaan:**

- `CLOSED` — trafik biasa dibenarkan
- `DEGRADED` — trafik masih dibenarkan, tetapi peningkatan kegagalan penyedia sedang dijejaki
- `OPEN` — penyedia disekat buat sementara waktu; penghalaan kombo melangkaunya
- `HALF_OPEN` — tamat masa tetapan semula telah berlalu; permintaan percubaan dibenarkan

**Nilai lalai yang boleh dikonfigurasikan (`open-sse/config/constants.ts`, didedahkan dalam Papan Pemuka → Tetapan → Daya Tahan):**

| Kelas     | Merosot pada | Terbuka pada | Tamat masa tetapan semula |
| --------- | ------------ | ------------ | ------------------------- |
| OAuth     | 5 kegagalan  | 8 kegagalan  | 60s                       |
| Kunci API | 7 kegagalan  | 12 kegagalan | 30s                       |
| Setempat  | diperoleh    | 2 kegagalan  | 15s                       |

`degradationThreshold` mengawal masa penyedia memasuki keadaan `DEGRADED`; `failureThreshold` mengawal masa ia terbuka dan dilangkau. Profil penyedia setempat belum didedahkan pada halaman tetapan Daya Tahan.

**Kod pencetus:** hanya status peringkat penyedia `[408, 500, 502, 503, 504]`. JANGAN cetuskan untuk ralat peringkat akaun (kebanyakan 401/403/429 — ralat tersebut tergolong dalam tempoh bertenang atau penguncian).

**Pemulihan malas:** apabila tempoh `OPEN` tamat, `getStatus()`, `canExecute()`, `getRetryAfterMs()` menyegarkan keadaan kepada `HALF_OPEN`. Tiada pemasa latar belakang diperlukan.

---

### Tempoh Bertenang Penyedia global ikut serta (get tetingkap)

Lapisan keempat yang **memerlukan ikut serta** (`PROVIDER_COOLDOWN_ENABLED`, lalai **dimatikan**) menyimpan
ingatan merentas permintaan tentang penyedia yang gagal dalam
`open-sse/services/providerCooldownTracker.ts`, yang dirujuk oleh penyelesaian sasaran kombo
supaya permintaan kombo berturut-turut berhenti mencuba semula penyedia yang baru sahaja
gagal. Entri peringkat penyedia mematuhi get tetingkap `PROVIDER_PROFILES`:

| Profil    | tercetus selepas (`providerFailureThreshold`) | dalam tempoh (`providerFailureWindowMs`) | bertenang selama (`providerCooldownMs`) |
| --------- | --------------------------------------------: | ---------------------------------------: | --------------------------------------: |
| OAuth     |                                          `10` |                                  `15min` |                                  `5min` |
| Kunci API |                                          `15` |                                  `30min` |                                 `10min` |

Di bawah ambang tersebut, penyedia **tidak** dianggap sedang bertenang; kejayaan mengosongkan
tetingkap. Sebaliknya, entri peringkat sambungan (`provider:connectionId`) mengekalkan
undur eksponen `minRetryCooldownMs → maxRetryCooldownMs`. Gantian:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Pelindung regresi: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Tempoh Bertenang Sambungan

**Skop:** satu sambungan/akaun/kunci penyedia.

**Tujuan:** melangkau satu kunci yang bermasalah sementara sambungan lain untuk penyedia yang sama terus memberikan perkhidmatan.

**Pelaksanaan:**

- Tandakan sebagai tidak tersedia: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pemilihan: `getProviderCredentials*` dalam fail yang sama
- Pengiraan tempoh bertenang: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Tetapan: `src/lib/resilience/settings.ts`

**Medan bagi setiap sambungan:**

- `rateLimitedUntil` — cap masa sehingga tempoh bertenang tamat
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — pembilang undur eksponen

**Tempoh bertenang lalai:**

- Asas OAuth: 5s
- Asas kunci API: 3s
- Kunci API 429: mengutamakan pengepala `Retry-After`/set semula huluan/teks set semula yang boleh dihuraikan
- Undur: `baseCooldownMs * 2 ** failureIndex`

**Perlindungan antikumpulan serentak:** menghalang kegagalan serentak daripada memanjangkan tempoh bertenang secara berlebihan atau menokok `backoffLevel` dua kali.

**Keadaan terminal (BUKAN tempoh bertenang):**

- `banned` — ditetapkan oleh pengesanan kata kunci larangan / larangan akaun (lihat [BAN_DETECTION](../security/BAN_DETECTION.md)), dan oleh tiga penolakan huluan berturut-turut bagi setiap permintaan (`request_rejected`, misalnya Anthropic OAuth 403 "Permintaan tidak dibenarkan" — `open-sse/services/requestRejectedStreak.ts`); satu penolakan sahaja hanya mengenakan tempoh bertenang pada sambungan
- `expired` (beralih kepada keadaan terminal selepas percubaan semula terhad — `EXPIRED_RETRY_MAX = 3` dengan undur eksponen — supaya ralat OAuth sementara boleh pulih sendiri sebelum akaun dinyahaktifkan secara kekal)
- `credits_exhausted`

Keadaan ini kekal sehingga kelayakan berubah atau pengendali menetapkannya semula. Jangan timpa keadaan terminal dengan keadaan tempoh bertenang sementara.

**Pemulihan malas:** apabila `rateLimitedUntil` telah berlalu, sambungan kembali layak digunakan. Selepas penggunaan yang berjaya, `clearAccountError()` mengosongkan semua medan ralat.

### Had penggunaan Claude OAuth: laluan keutamaan lebih rendah + penetapan semula had sesi

**Skop:** satu sambungan langganan Claude (OAuth). Kedua-dua ciri adalah **pilihan ikut serta bagi setiap
sambungan** (Edit sambungan → bahagian Claude → `lowPriorityMode` / `autoLimitReset` dalam
`providerSpecificData`, kedua-duanya dimatikan secara lalai) dan mencerminkan perintah `/low-priority` dan
`/limit-reset` Claude Code (kontrak wayar dirakam daripada Claude Code 2.1.263).

**Pelaksanaan:**

- Mesin keadaan + pengelasan respons: `open-sse/services/claudeLowPriority.ts`
- Klien status/tuntutan penetapan semula: `open-sse/services/claudeLimitReset.ts`
- Cangkuk pelaksana (suntikan pengepala + percubaan semula akaun yang sama): `open-sse/executors/base.ts::execute()`
- Pengekalan pilihan ikut serta: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Pencetus:** had penggunaan 5 jam — `429` dengan pengepala yang mengandungi
`anthropic-ratelimit-unified-status: rejected` dan, apabila akaun layak,
`anthropic-ratelimit-unified-slow-offer: treatment`. Tiada apa-apa dihantar sebelum 429 had
pertama itu; 429 mendadak tanpa pengepala disatukan melalui laluan tempoh bertenang biasa.

**Laluan keutamaan lebih rendah** (`lowPriorityMode`):

- Apabila menerima 429 had, pelaksana menerima tawaran tersebut dan serta-merta mencuba semula akaun yang **sama**
  dengan `anthropic-usage-limit: slow`; laluan kekal aktif sehingga masa
  `anthropic-ratelimit-unified-reset` yang diumumkan (+60s tempoh ihsan) dan setiap permintaan dalam tempoh itu membawa
  pengepala tersebut. 429 yang dipintas tidak pernah sampai kepada `handleChatCore`, maka sambungan
  **tidak** dikenakan tempoh bertenang dan tidak dialihkan kepada sambungan lain.
- `anthropic-ratelimit-unified-slow-status` pada respons berikutnya: `active` / `not_needed`
  mengekalkan laluan; `slot_busy` (429) atau `529` menunggu tempoh
  `anthropic-ratelimit-unified-slow-retry-after` pelayan (lalai 20s, dihadkan kepada 5–600s, hingar rawak ±30%)
  dan mencuba semula, tertakluk pada `anthropic-ratelimit-unified-slow-max-wait` (lalai 20 min, dihadkan kepada
  1 min–6 h) — selepas itu laluan tamat dan tempoh reda 10 minit menyekat penerimaan semula. Tempoh
  menunggu turut dihadkan oleh baki masa tamat permulaan huluan bagi permintaan itu sendiri
  (`resolveFetchStartTimeout`, 10 min secara lalai) ditolak margin 5 s: tanpa had tersebut,
  tempoh tunggu maksimum lalai 20 minit akan melebihi hayat permintaan dan tidur akan dibatalkan
  ketika masih menunggu, lalu memaparkan `TimeoutError` dan bukannya penamatan `max_wait` yang lancar + tempoh reda.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, peralihan tetingkap 5 jam, atau
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (yang menamatkannya sebagai
  `extra_usage` pada sebarang status kerana lebihan berbayar kini meliputi had tersebut) menamatkan laluan;
  respons itu kemudiannya mengalir ke laluan tempoh bertenang biasa. `budget_exhausted` diingati sehingga
  penetapan semula belanjawan yang diumumkan (≤ 8 hari).
- Semakan had dijalankan selepas percubaan semula dalam cubaan oleh pelaksana sendiri yang dicetuskan oleh 400 (penyuntingan
  konteks, had pemikiran/usaha, pembelajaran automatik parameter), maka 429 had yang hanya muncul pada
  salah satu percubaan semula tersebut masih dipintas dan bukannya sampai ke laluan tempoh bertenang.
- Keadaan disimpan dalam memori bagi setiap sambungan (mula semula memerlukan satu lagi 429 had untuk menerima semula).

**Penetapan semula had sesi** (`autoLimitReset`, dicuba sebelum laluan apabila kedua-duanya dihidupkan):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  apabila `arm: "reset"` dan `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` dengan
  `{ "program": "juniper_tide" }` (UUID organisasi daripada
  `providerSpecificData.organizationUUID`, sandaran pemula).
- `result: reset|not_limited` → permintaan dicuba semula pada kelajuan penuh (tanpa pengepala perlahan).
  `already_used` / `not_offered` menyimpan `next_available_at` dalam ingatan (lalai satu minggu); sebarang
  kegagalan mengundur selama 15 minit. Penetapan semula tersedia sekali seminggu dan masih dikira dalam
  had mingguan.

Perlindungan regresi: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afiniti sesi (#7274)

**Skop:** satu sesi klien (pengepala `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) disematkan pada satu sambungan, untuk **mana-mana** penyedia.

**Tujuan:** memastikan ejen berbilang pusingan (Claude Code, aider, ejen tersuai) kekal menggunakan akaun yang sama merentas permintaan, sekali gus mengurangkan kehilangan konteks antara akaun dan ralat 429 permulaan sejuk berulang pada penyedia yang mempunyai keadaan sesi bagi setiap akaun.

**Pelaksanaan:**

- Penentuan TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pemilihan/penciptaan pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Pengekstrakan pengepala (generik, untuk mana-mana penyedia): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Jadual pin tersimpan: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Tetapan: `sessionAffinityTtlMs` (TTL global dalam ms, `0` menyahdayakan) — `src/lib/db/settings.ts`. Dinamakan semula daripada `codexSessionAffinityTtlMs` yang khusus untuk Codex melalui migrasi `124_generic_session_affinity_ttl.sql`, yang memindahkan sebarang TTL Codex yang telah dikonfigurasikan sebelum ini sebagai nilai lalai baharu.

Sebelum #7274, `resolveSessionAffinityTtlMs()` terus mengembalikan `0` bagi setiap penyedia kecuali `codex`, maka tetapan TTL (dan pengepala sesi) tidak memberikan sebarang kesan di tempat lain walaupun mekanisme penyematan dan pengekstrakan pengepala sememangnya sudah tidak bergantung pada penyedia. Pembaikan tersebut telah mengalih keluar pengembalian awal itu; TTL kini digunakan secara seragam untuk setiap penyedia sebaik sahaja ditetapkan secara global kepada nilai melebihi `0`.

Ketiga-tiga pengepala afiniti sesi tidak pernah dimajukan ke huluan — pelaksana membina pengepala huluan mereka sendiri dari awal dan bukannya meneruskan pengepala klien, maka pengepala ini kekal sebagai ID korelasi dalaman sahaja.

### Pajakan sambungan sesi terurus eksklusif

**Skop:** satu klien/sesi HTTP terurus yang aktif memiliki satu sambungan OmniRoute yang layak.

**Tujuan:** menyediakan pemilikan sambungan eksklusif yang tahan lama untuk klien yang memerlukan sempadan penghalaan tegas merentas permintaan. Ini berbeza daripada afiniti sesi, yang merupakan keutamaan kesinambungan secara lembut: pajakan eksklusif mengekalkan keadaan kitar hayat dalam SQLite, menguatkuasakan keunikan global bagi pemilik aktif dan sambungan aktif, serta menolak generasi lapuk sebelum penghantaran kepada penyedia.

Ciri ini perlu didayakan secara khusus bagi setiap kunci API. Kunci terurus mesti mempunyai skop `lease:exclusive` dan senarai `allowedConnections` yang jelas serta tidak kosong. Mana-mana klien HTTP boleh menggunakan titik akhir kitar hayat; nama klien, ejen pengguna, penyedia, kaedah OAuth atau model tidak diperlukan. Pajakan memiliki sambungan, bukannya model, maka perubahan model mengekalkan pengikatan selagi sambungan itu masih layak dalam keadaan biasa. Peraturan biasa berkaitan model, kuota, kesihatan, tempoh bertenang dan senarai yang dibenarkan kekal berkuasa serta boleh mengalihkan generasi yang sama kepada sambungan layak lain yang masih bebas.

Kitar hayat menggunakan `POST /api/v1/session-leases` dengan tindakan JSON `acquire`, `renew` dan `release`. Permintaan inferens terurus menyertakan nilai legap `X-OmniRoute-Lease-Owner` dan nilai tepat `X-OmniRoute-Lease-Generation`. Pemilik menggunakan awalan `vlo_` yang diikuti oleh 43 aksara base64url; hanya cincangan SHA-256 disimpan. Setiap sempadan penghantaran akhir turut mengikat ID kunci API yang telah disahkan dan ID sambungan aktif. Pengepala kawalan pajakan dialih keluar daripada log, petikan permintaan yang disimpan dan pengepala pelaksana huluan.

Jika penghalaan biasa mempunyai calon terurus yang layak tetapi setiap calon bebas telah diduduki oleh pajakan aktif milik pihak lain, OmniRoute mengembalikan HTTP `429`, kod lease-capacity-unavailable, keadaan menunggu kapasiti dan `Retry-After` terhad yang diperoleh daripada tamat tempoh relevan paling awal. Ketiadaan kelayakan biasa bukanlah pertikaian pajakan dan mengekalkan semantik ralat penghalaan sedia ada.

Mekanisme berkaitan kekal berasingan:

- Penghunian sesi OAuth ialah pengagihan lembut setempat kepada proses untuk akaun OAuth.
- Semafor akaun memberikan permit kekonkurenan permintaan dan tamat apabila permintaan selesai.
- Pajakan sambungan sesi terurus eksklusif ialah pemilikan kitar hayat yang tahan lama dengan sempadan generasi.

---

## 3. Penguncian Model

**Skop:** gabungan penyedia + sambungan + model.

**Skop kunci mengikut status:** status kegagalan menentukan kunci yang akan ditulis oleh penguncian
(`resolveLockoutScope()` dalam `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — isyarat kuota atau kelayakan — mengunci **keluarga kuota**:
  untuk codex, seluruh skop `codex` / `spark` (setiap model `gpt-5*` bagi
  sambungan tersebut), manakala untuk penyedia lain, `getQuotaScopedModelForProvider()`.
- `404` mengunci model asas (`getModelLockKey()` mengecilkan skop `not_found`).
- Sebarang status lain — kegagalan pengangkutan/pelayan `5xx` dan `502` tersintesis
  OmniRoute sendiri daripada pengesahan kualiti — hanya mengunci tupel
  penyedia/sambungan/model yang **tepat**. Strim yang bermasalah pada satu model bukan bukti
  tentang kuota akaun; sebelum peraturan ini, satu respons kosong pada
  `codex/gpt-5.6-luna` menyingkirkan setiap model `gpt-5*` bagi sambungan tersebut
  daripada penghalaan selama 2–30 min (meningkat secara berperingkat) walaupun kuotanya tidak terjejas.
- Pilihan `scope` eksplisit pemanggil sentiasa diutamakan (Antigravity menghantar `"exact"`).

**Tujuan:** mengelakkan seluruh sambungan dinyahdayakan apabila hanya satu model tidak tersedia atau dihadkan kuota.

**Contoh:**

- Penyedia dengan kuota per model yang mengembalikan 429
- Penyedia setempat yang mengembalikan 404 untuk satu model yang tiada
- Kegagalan kebenaran mod/model khusus penyedia (contohnya, mod Grok)

**Pelaksanaan:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Papan Pemuka Tempoh Bertenang Model (v3.8.0)

UI: Tetapan → Tempoh Bertenang Model (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Menyenaraikan penguncian aktif dengan: penyedia, sambungan, model, sebab, expiresAt. Pengendali boleh mendayakan semula model secara manual daripada kad tersebut.

**REST API:**

- `GET /api/resilience/model-cooldowns` — senaraikan penguncian aktif
- `DELETE /api/resilience/model-cooldowns` — dayakan semula secara manual. Isi: `{provider, connection, model}`. Pengesahan: pengurusan.

### UI tetapan penguncian + pemulihan susutan kejayaan (v3.8.23)

Penguncian model berubah daripada tingkah laku berkod keras yang sentiasa aktif kepada ciri
ikut serta yang boleh dikonfigurasikan sepenuhnya, dengan kad tetapannya sendiri dan laluan pemulihan yang membaiki kendiri.

**Kad tetapan:** Tetapan → Penguncian Model
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ini **berbeza** daripada `ModelCooldownsCard` baca sahaja di atas (yang hanya
_menyenaraikan_ penguncian aktif) — kad baharu _mengkonfigurasikan parameter_. Nilai lalai
terdapat dalam `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Tetapan                 | Lalai                            | Maksud                                                                     |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Togol utama — penguncian model **dimatikan secara lalai**.                 |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status huluan yang dikira sebagai kegagalan berskop model.                 |
| `baseCooldownMs`        | `120_000` (120 s)                | Tempoh penguncian awal untuk kegagalan pertama.                            |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Had tempoh bertenang yang ditingkatkan.                                    |
| `maxBackoffSteps`       | `10`                             | Bilangan maksimum langkah peningkatan undur eksponen.                      |
| `useExponentialBackoff` | `true`                           | Sama ada kegagalan berulang meningkatkan tempoh bertenang secara eksponen. |

Tetapan disimpan melalui stor tetapan biasa dan disahkan melalui
skema tetapan daya tahan; kad tersebut mengehadkan `baseCooldownMs`/`maxCooldownMs`
(dengan `maxCooldownMs ≥ baseCooldownMs`) dan `maxBackoffSteps`.

**Pemulihan susutan kejayaan:** pemulihan **bukan** semata-mata melalui tamat tempoh pemasa. Respons yang sihat
mengurangkan kiraan kegagalan model secara berperingkat supaya model yang pulih
dalam tetingkap berhenti meningkat (dan dikosongkan) sebelum pemasa tamat. Apabila sasaran
kombo berjaya, `open-sse/services/combo.ts` memanggil `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), yang **membahagikan dua** nilai
`failureCount` yang disimpan (`Math.floor(failureCount / 2)`); apabila nilainya mencapai `0`, entri penguncian
dipadam sepenuhnya. Fungsi pelengkap `recordModelLockoutFailure()`
meningkatkan kiraan (dan tempoh bertenang) apabila berlaku kegagalan dalam
tetingkap peningkatan. Susutan kejayaan ini adalah tambahan kepada tamat tempoh pemasa biasa —
mana-mana laluan boleh mendayakan semula model.

**Keadaan:** penguncian disimpan **dalam memori** (`Map` bagi setiap proses yang mengandungi
`ModelLockoutEntry` dan menggunakan `provider:connectionId:model` sebagai kunci, manakala penguncian skop tepat menggunakan
`provider:connectionId:exact:model`), dan tidak disimpan ke dalam
DB — ia akan hilang apabila dimulakan semula. _Tetapan_ disimpan secara berterusan; _keadaan_
penguncian aktif bersifat sementara.

---

## 4. Kawalan Keserentakan Perkongsian Kuota (v3.8.36)

Akaun langganan (GLM, MiniMax, dll.) biasanya hanya menerima ~1–3 permintaan
serentak; melebihi had tersebut akan mencetuskan 429 dan tempoh bertenang. Hal ini
amat ketara bagi gabungan **quota-share** (`qtSd/…`), apabila beberapa kunci API
berkongsi satu akaun huluan. Tiga lapisan menghalang akaun yang dikongsi daripada
dibanjiri permintaan.

### Had keserentakan setiap sambungan (`max_concurrent`)

Setiap sambungan penyedia boleh menetapkan had maksimum `max_concurrent`
(`provider_connections.max_concurrent`, ditetapkan dalam modal sambungan / API / DB).
Biarkan kosong untuk tiada had. Ini ialah satu-satunya tetapan yang mengawal lapisan
pensirian di bawah — tetapkan kepada keserentakan sebenar akaun tersebut (cth. GLM ~1, MiniMax ~2).

### Pensirian permintaan perkongsian kuota

Apabila penghantaran perkongsian kuota menyasarkan sambungan yang menetapkan nilai
`max_concurrent` positif, permintaan serentak kepada **akaun** tersebut disirikan melalui
semafor setiap sambungan (kunci `qsconn:<connectionId>`): permintaan berlebihan **menunggu dalam
baris gilir** dan bukannya membanjiri akaun. Mekanisme ini bersifat **fail-open** — baris gilir
yang tepu atau tamat masa akan diteruskan tanpa slot dan tidak akan sekali-kali menolak permintaan
yang boleh dihantar. Togol dalam **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, diaktifkan secara
lalai). Tanpa had `max_concurrent`, tingkah laku tidak berubah.

> Get penghalaan perkongsian kuota (`selectQuotaShareTarget`, DRR + P2C) itu sendiri
> bersifat fail-open dan hanya _mengurangkan keutamaan_ sambungan yang telah mencapai had — dengan
> kumpulan satu sambungan, ia tidak dapat mengenakan had mutlak, maka semafor inilah yang sebenarnya
> membendung banjiran tersebut.

### Percubaan semula yang menyedari tempoh bertenang gabungan

Bagi setiap strategi gabungan (apabila diaktifkan), permintaan yang akan menghasilkan 429
secara muktamad untuk tempoh bertenang sementara yang PENDEK akan menunggu sehingga tempoh itu
tamat dan dihantar semula dan bukannya mengembalikan 429 — ini merangkumi tetingkap TPM/RPM
kelas Gemini (~60s retry-after) pada gabungan berbilang model, contohnya kedua-dua sasaran
gabungan 2 model mencapai had kadar setiap model. Dihadkan oleh `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) dalam **Settings → Resilience**.
Ia tidak pernah menunggu bagi `quota_exhausted` (dikunci sehingga tengah malam) atau sebab
pengesahan/tidak ditemui.

---

## 5. Kawalan Kemasukan Baris Gilir Permintaan (v3.8.49 · isu #6593)

**Skop**: baris gilir had kadar setempat bagi setiap penyedia+sambungan (`open-sse/services/rateLimitManager.ts`,
disokong oleh Bottleneck), satu lapisan di bawah tiga mekanisme di atas.

**`maxWaitMs` mengehadkan masa menunggu dalam baris gilir; `executionMaxWaitMs` mengehadkan pelaksanaan.**
Kedua-duanya sengaja diasingkan dan tidak saling mempengaruhi.

`resilienceSettings.requestQueue.maxWaitMs` ialah **bajet menunggu dalam baris gilir**: ia
merangkumi masa menunggu slot penyedia dan kemudian berada dalam keadaan QUEUED, dan pemasa
dipadamkan sebaik sahaja tugas meninggalkan QUEUED dan mula dilaksanakan
(`rateLimitManager.ts`, `wrappedFn`). Permintaan yang melebihinya tidak akan
sampai kepada perkhidmatan huluan. Lalai 30000ms, dibekalkan oleh `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
dalam `src/lib/resilience/settings.ts` dan dikunci oleh
`tests/unit/ratelimit-admission-control-6593.test.ts`, jadi perubahan padanya akan
menyebabkan ujian tersebut gagal dan bukannya membiarkan perenggan ini menjadi lapuk tanpa disedari.

`resilienceSettings.requestQueue.executionMaxWaitMs` ialah nilai yang diterima oleh Bottleneck
sebagai `expiration` tugas, dengan pemasa yang hanya bermula selepas penghantaran. Ia merupakan
perlindungan terakhir bagi pelaksana yang tidak mempunyai tamat masa huluan sendiri, dan nilainya
dinaikkan kepada tamat masa permulaan pengambilan milik pelaksana apabila nilai tersebut lebih panjang, supaya ia
tidak memutuskan respons dalam penerbangan yang sihat. Lalai 600000ms (10 min).

Memasukkan bajet baris gilir ke dalam `expiration` sebelum ini menyebabkan get laluan bukan tokokan
dihentikan semasa sedang berjalan — ia sememangnya berjalan selama beberapa minit sebelum bait pertama —
dan itulah sebabnya tamat tempoh dilaporkan sebagai `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), manakala bajet baris gilir membawa
kod tamat masa baris gilir. Atasi mana-mana nilai melalui `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (persekitaran) atau papan pemuka
(**Tetapan → Ketahanan**). Kedua-duanya dihadkan kepada 1ms–24h apabila dinormalkan.

**Keutamaan, untuk kedua-duanya:** pemboleh ubah persekitaran hanya membekalkan nilai _lalai_. Nilai
yang disimpan dalam `resilienceSettings.requestQueue` (papan pemuka / tampalan API, disimpan
dalam `key_value`) mengatasinya, dan `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` bagi setiap sambungan mengatasi nilai tersebut. Oleh itu, menetapkan
pemboleh ubah persekitaran pada penggunaan yang sudah mempunyai nilai tersimpan tidak akan
mengubah apa-apa — sebaliknya, kosongkan atau kemas kini tetapan tersimpan itu.

Tempoh berada dalam baris gilir dihadkan oleh `maxWaitMs`; `maxQueueDepth` di bawah mengehadkan bilangan
pemanggil yang boleh berada dalam baris gilir pada satu-satu masa.

**`maxQueueDepth` — had kemasukan ikut serta (baharu).** `resilienceSettings.requestQueue.maxQueueDepth`
mengehadkan bilangan permintaan yang boleh berada dalam baris gilir (belum dihantar) untuk satu
penyedia+sambungan pada satu-satu masa. Apabila baris gilir sudah mengandungi `maxQueueDepth`
permintaan, permintaan baharu akan ditolak segera dengan ralat berjenis
`code: "RATE_LIMIT_QUEUE_FULL"` **sebelum** ia sampai ke `limiter.schedule()`
— maka penolakan itu berkos rendah dan berlaku sebelum sebarang kerja
pemampatan / terjemahan gesaan hiliran untuk permintaan tersebut. Lalai `0` =
dinyahdayakan, mengekalkan tingkah laku baris gilir tanpa had yang sedia ada; dihadkan kepada 0–100000.
Atasi melalui `RATE_LIMIT_MAX_QUEUE_DEPTH` (persekitaran) atau
`resilienceSettings.requestQueue.maxQueueDepth` (papan pemuka/tampalan API).

Semakan kemasukan itu sendiri ialah fungsi tulen
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) supaya
ia boleh diuji secara unit tanpa pengehad Bottleneck sebenar.

> RFC yang membuka #6593 turut mencadangkan bendera `bypassCompressionOnRateLimit`.
> Talian paip `open-sse/services/compression/` dalam repositori ini ialah
> pemampatan gesaan/konteks pada permintaan LLM keluar (`chatCore.ts`,
> sekitar blok `resolveCompressionSettings`/`selectCompressionStrategy`),
> bukan pemampatan respons HTTP pada badan 429 yang dijana — tiada
> laluan kod sepadan untuk bendera pintasan secara literal. Langkah pemampatan gesaan itu
> juga pada masa ini berjalan _sebelum_ `withRateLimit()` dalam talian paip permintaan, jadi
> penyusunan semula untuk melangkaunya apabila berlaku penolakan kerana baris gilir penuh ialah perubahan
> yang berasingan dan lebih besar daripada skop isu ini; ia sengaja **tidak** dilaksanakan
> di sini dan dibiarkan sebagai tindakan susulan sekiranya penjimatan CPU berbaloi dengan
> risiko penyusunan semula.

---

## 6. Pemantau daya pemprosesan strim perlahan (#9709)

Pelindung pilihan `resilienceSettings.streamRecovery.throughputWatchdog` mengesan
huluan yang masih menghantar cebisan tetapi menghasilkan output pembantu di bawah
kadar output berguna yang dikonfigurasikan. Ia sengaja diasingkan daripada tamat masa melahu:
denyutan jantung dan metadata tidak menetapkan semula mana-mana pemasa dan tidak dikira sebagai kemajuan. Ia juga
berbeza daripada tarikh akhir mutlak percubaan (#9153), yang kekal sebagai had keselamatan
mutlak tanpa mengira kualiti output.

Pemantau memerlukan tempoh pemanasan yang diikuti oleh tetingkap bergulir lengkap sebelum
ia boleh menghentikan proses. Ia mengira delta teks daripada peristiwa output Chat Completions dan Responses API
(proksi bait UTF-8 yang konservatif), mengabaikan peristiwa penggunaan sahaja dan peristiwa kosong, serta
menangguhkan penilaian semasa peristiwa panggilan alat atau penaakulan sedang berlangsung. Ia dilumpuhkan
secara lalai dan boleh didayakan dengan `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
tetingkap, pemanasan, kadar minimum dan output minimum yang boleh diukur dihadkan oleh
lapisan penormalan tetapan daya tahan biasa.

Apabila didayakan, penghentian oleh pemantau hanya digunakan pada percubaan huluan yang aktif. Sebelum
sebarang bait kelihatan kepada klien, laluan pemulihan awal akaun sama yang sedia ada boleh membuka semula
percubaan tersebut. Selepas komit, strim tidak akan dimainkan semula secara membuta tuli; hanya kontrak
sambungan pertengahan strim selamat yang sedia ada boleh mencantumkan akhiran. Pemuktamadan kekal
sekali sahaja, supaya perakaunan penggunaan dan pelepasan semafor tidak diduplikasi.

---

## 7. Pernyataan Semula Status Huluan (ralat kuota dengan status tersalah nyata)

**Skop:** satu get laluan huluan yang melaporkan kehabisan kuota sementara dengan status HTTP yang salah.

**Tujuan:** membetulkan status yang mengelirukan SEBELUM pengelasan, supaya pengguna hiliran (enjin sandaran, pengagregatan kombo, respons yang ditujukan kepada klien) melihat sifat sebenar kegagalan yang boleh dicuba semula.

Sesetengah get laluan menandakan kehabisan kuota SEMENTARA dengan status HTTP
yang tidak boleh dicuba semula. `agentrouter.org` mengembalikan `403` (kadangkala `400`) dengan isi bahasa Cina
(`用户额度不足` / `额度不足`) dan bukannya `429` standard. Klien seperti Claude
Code menganggap `403` sebagai kekal dan menghentikan sesi, dan tanpa pembetulan
enjin sandaran akan mengelaskannya sebagai `AUTH_ERROR` dan bukannya peristiwa
kuota.

**Pelaksanaan:**

- Daftar + pemadan: `open-sse/config/upstreamStatusRestatement.ts` — satu
  senarai peraturan bagi setiap penyedia (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), dipadankan melalui `applyStatusRestatement()`.
- Lokasi panggilan: blok `providerFailure:` dalam `open-sse/handlers/chatCore.ts`
  (sekitar baris 3654), sejurus selepas `parseUpstreamError()` menghurai respons
  huluan dengan status HTTP ralat (`!providerResponse.ok`), dan sebelum sebarang
  pengelasan dijalankan, supaya setiap pengguna hiliran melihat status yang telah
  dibetulkan. Ralat yang dibenamkan dalam strim SSE `200` mengikuti laluan penghuraian
  strim yang berasingan dan kemudian, serta **tidak** diliputi oleh cangkuk ini pada masa ini — satu
  batasan yang diketahui, namun belum diperlukan untuk status tersalah nyata agentrouter (yang
  muncul sebagai status HTTP ralat).
- Kelayakan cuba semula: `429` terdapat dalam `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), maka ralat yang dinyatakan semula
  membawa tetingkap cuba semula yang sebenar dan bukannya dipaparkan sebagai `403` yang tidak lagi berguna.
- `defaultRetryAfterMs` `60s` sintetik (`upstreamStatusRestatement.ts`)
  hanyalah perkara yang diberitahu oleh respons yang dinyatakan semula kepada **klien**; ia sendiri bukan
  tempoh bertenang/sekatan dalaman sambungan — tempoh itu dikawal
  secara berasingan oleh mekanisme yang benar-benar mengendalikan ralat yang dinyatakan semula
  (pengunduran meningkat Connection Cooldown, §2, asas `3s` untuk penyedia
  kunci API; atau Model Lockout, §3, untuk penyedia kuota setiap model seperti
  agentrouter). Penghala boleh layak untuk mencuba semula secara dalaman lebih awal
  daripada tetingkap 60s yang diiklankan kepada klien — ruang tambahan yang disengajakan,
  bukannya pepijat.

Ralat kekal (`无权访问模型` daripada agentrouter — tiada akses kepada model ini)
TIDAK PERNAH dinyatakan semula: `excludeMarkers` membatalkan peraturan walaupun `textMarkers` sepadan,
maka ralat mengekalkan status asalnya dan tiada apa-apa yang mencubanya semula selama-lamanya. Peraturan
pengelasan penyedia yang sepadan
(`agentrouter-model-access-denied` dalam `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, tempoh bertenang asas `6h` yang diisytiharkan) dirujuk
oleh `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_sebelum_ pengembalian awal `FORBIDDEN` kategori apikey generik, yang dikawal oleh
`honorsRuleLockScope(provider)` (#10334 — pada masa ini eksklusif untuk agentrouter melalui
senarai dibenarkan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dalam
`providerErrorRules.ts`). Tempoh bertenang 6h yang diisytiharkan oleh peraturan disalurkan sebagai
`fallbackResult.baseCooldownMs`, tetapi masih memasuki laluan sekatan
kuota setiap model yang sedia ada (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, tidak diubah oleh #10334 kecuali sumber tempoh bertenang):
ia dihadkan kepada `mlSettings.maxCooldownMs` milik pengendali
(lalai `1_800_000ms` / 30min), seperti setiap sekatan model yang lain, dan
_sebab sekatan yang disimpan_ kekal sebagai `"forbidden"` berkod keras yang sedia ada,
bukannya `"auth_error"` milik peraturan — hanya tempoh bertenang dipatuhi
dari hujung ke hujung, bukan rentetan sebab. Sambungan itu sendiri kekal aktif;
model sekeluarga pada sambungan yang sama tidak terjejas.

Ralat kuota yang dinyatakan semula (`额度不足`) mencapai peraturan penyedia dalam produksi
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, tiada tempoh bertenang tersendiri yang diisytiharkan — lalai
undur berskala lapisan pengekalan digunakan). Sejak #10334, `scope` pada
`ProviderErrorRuleMatch` SEMEMANGNYA digunakan dari hujung ke hujung, tetapi
**hanya** untuk penyedia dalam senarai dibenarkan
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
pada masa ini hanya `"agentrouter"`, dikawal melalui `honorsRuleLockScope()`).
Bagi setiap penyedia lain, `scope` kekal sebagai maklumat sahaja, tepat seperti
sebelum #10334. `checkFallbackError` mendedahkan skop peraturan yang sepadan
sebagai `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ialah pengawal bersama yang mengesahkan bahawa
`ruleScope` benar-benar selamat untuk dipatuhi sebagai isyarat seluruh
sambungan yang pulih sendiri (skop `"connection"`, sebab `quota_exhausted`,
tidak sekali-kali `permanent`, dan tidak sekali-kali `creditsExhausted` —
perlindungan terhadap peraturan masa hadapan yang menggandingkan skop
`"connection"` dengan keadaan akaun kekal). Dua pengguna memanggilnya:

- **Pengekalan** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  daripada jatuh ke dalam cabang penguncian **mengikut model** bagi penyedia
  laluan terus (agentrouter ialah `passthroughModels: true` →
  `hasPerModelQuota()` mengembalikan `true`), ia menggunakan **tempoh bertenang
  sambungan sementara** — `testStatus: "unavailable"` + `rateLimitedUntil`,
  tidak sekali-kali status terminal
  (`credits_exhausted`/`banned`/`expired`) — supaya sambungan pulih sendiri
  selepas tempoh bertenang tamat dan bukannya memerlukan tetapan semula
  kelayakan secara manual. Dilangkau untuk sambungan dengan
  `disableCooling: true` (#2997): pilihan keluar tersebut sebaliknya beralih
  ke penguncian mengikut model (pertukaran yang didokumenkan — lihat ulasan
  kod di atas cabang tersebut).
- **Penghalaan kombo permintaan yang sama** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): pengawal yang sama menandakan
  sambungan dalam set `exhaustedConnections` dalam memori, yang dikunci
  menggunakan `${provider}:${connectionId}`. Ini hanya melangkau sasaran
  PERMINTAAN YANG SAMA yang masih berbaki dan _sasaran itu sendiri sudah
  membawa `connectionId` tepat tersebut_ pada objek sasarannya sendiri
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` sebelum carian `exhaustedConnections`) — kombo senarai model
  biasa, yang sasaran setaranya tidak membawa `connectionId` yang ditetapkan
  sendiri dan satu sambungan hanya diselesaikan bagi setiap penghantaran
  daripada pengepala `X-OmniRoute-Selected-Connection-Id` respons, tidak akan
  mencapai padanan kunci tersebut. Bagi kes lazim itu, perlindungan sebenar
  terhadap peringkat yang masih berbaki daripada menggunakan semula akaun
  yang baru sahaja kehabisan kuota BUKAN Set ini — sebaliknya, perlindungan
  itu ialah lapisan pengekalan di atas (`rateLimitedUntil` sambungan kini
  berada pada masa hadapan) bersama-sama dengan pengawal yang sama ini
  menyekat `transientRateLimitedProviders` bagi kegagalan tersebut (lihat
  "Reka bentuk dua peringkat" dan ulasan kod pada cabang
  `isAgentrouterConnectionQuotaScope` dalam `targetExhaustion.ts`): apabila
  Set itu dibiarkan tanpa ditandakan, benarkan secara paksa melalui
  `allowRateLimitedConnection` dalam `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) TIDAK diaktifkan
  untuk peringkat penyedia yang masih berbaki, maka penapis
  `rateLimitedUntil` bagi pemilihan kelayakan
  (`src/sse/services/auth.ts:1238`) dipatuhi seperti biasa dan peringkat yang
  masih berbaki sama ada memilih sambungan agentrouter lain yang masih layak
  atau gagal kerana tiada kelayakan tersedia — ia tidak memaksa laluan
  kembali ke sambungan yang baru sahaja dikenakan tempoh bertenang oleh
  cabang ini.

### Reka bentuk dua peringkat: pernyataan semula status, kemudian pengelasan

Pernyataan semula status (`upstreamStatusRestatement.ts`) dan peraturan
pengelasan penyedia (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ialah daftar berasingan yang kedua-duanya menggunakan
id penyedia dan penanda teks sebagai kunci, tetapi dijalankan di tempat yang
berbeza dan mempunyai tujuan yang berbeza: pernyataan semula menulis semula
status HTTP lebih awal dalam `chatCore.ts`; peraturan pengelasan memilih
`reason` sandaran dan `scope` penguncian
(`model` / `provider` / `connection`) dalam `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Peraturan pengelasan hanya melihat **teks** ralat penuh (diperlukan untuk
memadankan penanda isi seperti `额度不足`) bagi penyedia yang disenaraikan
dalam senarai dibenarkan `FULL_TEXT_RULE_PROVIDERS` dalam
`providerErrorRules.ts` — pada masa ini hanya `"agentrouter"`. Bagi setiap
penyedia **katalog terbina dalam** yang lain, `checkFallbackError` hanya
menyerahkan ralat berstruktur (`{code, type}`) kepada
`getProviderErrorRuleMatch`, yang mencukupi untuk peraturan berasaskan
pengepala/status/kod tetapi tidak dapat melihat penanda teks isi. Pembantu
`resolveRuleMatchBody()` membuat pemilihan ini: teks ralat penuh untuk
penyedia dalam senarai dibenarkan, dan ralat berstruktur untuk penyedia lain.
Menambahkan penyedia **terbina dalam** kepada `FULL_TEXT_RULE_PROVIDERS` ialah
pilihan ikut serta yang eksplisit bagi setiap penyedia — ia wujud supaya
laluan lalai untuk setiap penyedia yang tiada dalam senarai kekal tidak
berubah, bait demi bait.

`scope` peraturan (`model` / `provider` / `connection`) ialah pilihan ikut
serta yang berasingan daripada `FULL_TEXT_RULE_PROVIDERS`:
`checkFallbackError` hanya mendedahkannya sebagai `fallbackResult.ruleScope`,
dan pengguna hiliran hanya mematuhinya sebagai sesuatu selain label maklumat
bagi penyedia dalam senarai dibenarkan
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` dalam fail yang sama (`dikawal melalui
honorsRuleLockScope()` — pada masa ini hanya `"agentrouter"`). Lihat "Ralat
kuota yang dinyatakan semula" di atas untuk perkara yang sebenarnya dilakukan
oleh padanan `scope: "connection"` selepas penyedia berada dalam senarai
dibenarkan tersebut.

**#11104 — peraturan yang diisytiharkan oleh operator memintas kedua-dua senarai izin.** Operator boleh
mengisytiharkan peraturan khusus bagi setiap penyedia semasa masa jalan melalui `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
tanpa menyunting fail ini. Mengehadkan peraturan operator di sebalik
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — senarai izin
yang bertujuan untuk melindungi tingkah laku **lalai** peraturan katalog terbina dalam — akan
menjadikan mekanisme tetapan tidak berfungsi untuk setiap penyedia kecuali penyedia yang sudah
disenaraikan di situ, kerana pengisytiharan peraturan tersebut sudah pun merupakan
pilihan ikut serta secara jelas oleh operator. `resolveRuleMatchBody()` dan
`honorsRuleLockScope()` kedua-duanya menyemak `hasOperatorRuleForProvider()`
terlebih dahulu: penyedia dengan peraturan operator menerima teks ralat mentah
dan `scope` yang diisytiharkan dihormati, tanpa mengira sama ada penyedia itu turut
terdapat dalam mana-mana senarai izin.

**Jurang yang diketahui — `providerRuleRegistry` tidak pernah dirujuk untuk HTTP 400.**
Cabang `BAD_REQUEST` dalam `checkFallbackError` mengklasifikasikan status 400
sepenuhnya melalui tatasusunan coraknya sendiri (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, dan sebagainya dalam `accountFallback.ts`) dan kembali sebelum
cabang `configuredRule`/`getProviderErrorRuleMatch` di atasnya dicapai.
Peraturan katalog terbina dalam (atau peraturan operator) dengan `status: 400`
adalah sah dari segi sintaks tetapi tidak akan pernah dicetuskan. Tiada peraturan sedia ada yang menyasarkan 400 pada masa ini,
jadi tiada apa-apa dalam pengeluaran yang terjejas — tetapi peraturan 400 pada masa hadapan memerlukan
cabang ini diubah terlebih dahulu, yang merupakan perubahan lebih besar daripada menambah peraturan (ia
mengklasifikasikan semula 400 bagi setiap penyedia yang sudah bergantung pada tingkah laku
tatasusunan corak) dan berada di luar skop penambahan peraturan untuk satu penyedia.

### Menambah gerbang baharu yang menyatakan kuota secara tidak tepat

1. Daftarkan satu tatasusunan peraturan dalam `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Pastikan `textMarkers`
   khusus kepada penyedia; jangan sekali-kali menggunakan semula frasa bahasa Inggeris generik yang bertembung dengan
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Secara pilihan, daftarkan peraturan klasifikasi dalam
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) untuk memilih
   skop kunci yang betul (`connection` untuk kuota seluruh akaun, `model` untuk
   ralat khusus model). Langkah ini hanya berkuat kuasa dalam pengeluaran bagi
   penyedia yang peraturannya memerlukan teks ralat penuh (penanda badan): tambahkan
   id penyedia kepada `FULL_TEXT_RULE_PROVIDERS` dalam fail yang sama — jika tidak,
   `checkFallbackError` hanya akan menyerahkan ralat berstruktur
   `{code, type}` kepada peraturan tersebut dan peraturan berasaskan teks badan tidak akan sepadan dengan trafik langsung.
   Peraturan yang sepadan hanya berdasarkan `status`/`headers` (seperti peraturan Opencode atau
   Minimax) tidak memerlukan pilihan ikut serta ini. Secara berasingan, jika peraturan mengisytiharkan
   `scope: "connection"` dan tujuannya ialah tempoh bertenang seluruh sambungan yang sebenar
   serta pelangkauan kombo bagi permintaan yang sama (bukan sekadar label maklumat), tambahkan
   id penyedia kepada `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dalam fail yang sama — inilah
   yang mengehadkan penggunaan gaya `isAgentrouterConnectionQuotaScope()` dalam
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) dan
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); tanpanya, `scope`
   masih mengalir melalui `fallbackResult.ruleScope` tetapi tiada apa-apa yang bertindak terhadapnya.
3. Tambahkan ujian unit yang mencontohi `tests/unit/upstream-status-restatement.test.ts`
   dan `tests/unit/agentrouter-error-rules.test.ts` (termasuk perlindungan
   bukan-kekal / bukan-creditsExhausted, dan — jika penyedia memerlukan
   senarai izin — ujian yang menegaskan `resolveRuleMatchBody()` mengembalikan
   teks penuh hanya untuk penyedia tersebut).

Tiada perubahan pada `chatCore.ts`, `classifyError`, atau kombo diperlukan.

#### Kunci berkelompok mengikut egress (#10880)

Penyedia dalam `EGRESS_BUCKETED_LOCK_PROVIDERS` (keluarga opencode) dianggap
sebagai huluan berkelompok mengikut IP (peringkat percuma opencode dikelompokkan mengikut IP, bukan
mengikut akaun — lihat #9611): status 429 yang diklasifikasikan sebagai `quota_exhausted`
**atau** `rate_limit_exceeded` mengenakan tempoh bertenang pada setiap sambungan keluarga dalam senarai izin
yang IP egress terakhir diketahuinya sepadan dengan sambungan yang gagal, sebelum
penggiliran sempat mencubanya
— sekali gus mengelakkan N-1 panggilan huluan yang pasti gagal (bentuk yang sama seperti #10460/#10525).
`rate_limit_exceeded` disertakan dengan sengaja: pada laluan `markAccountUnavailable`,
peraturan khusus opencode tidak pernah sepadan (tiada pengepala/badan diserahkan kepada
`checkFallbackError`, opencode tidak berada dalam `FULL_TEXT_RULE_PROVIDERS`), maka 429
yang badannya mengandungi teks kuota langganan ("monthly usage limit
reached") diklasifikasikan sebagai `quota_exhausted` oleh sandaran teks kuota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; tempoh bertenang 1 jam) sebelum
peraturan `status_429` sempat dicapai — manakala 429 tanpa teks kuota (pengehadan
kadar biasa) diklasifikasikan melalui peraturan `status_429` sebagai `rate_limit_exceeded`
dan masih mengenakan tempoh bertenang pada keluarga IP tersebut. Bagi penyedia dalam senarai izin, had kadar
berkelompok mengikut IP merupakan isyarat yang sama seperti kuota yang telah habis. Had sebenar:

- **Usaha terbaik**: kunci menyelesaikan `egress_ip` terakhir yang diketahui bagi sambungan
  daripada `proxy_logs` (tetingkap 24j, segerak, tanpa cache). Cache sejuk (IP egress
  tidak pernah disiasat) atau tiada baris → sambungan yang gagal masih dikenakan tempoh bertenang oleh
  cabang tersebut (direkodkan seperti sekarang), cuma tiada sambungan setara yang dikunci.
- **Tidak pernah terminal**: tempoh bertenang ialah tetingkap kuota yang diperbaharui
  (`testStatus: "unavailable"`); keadaan kekal tidak pernah diterbitkan daripada
  isyarat peringkat IP. Sambungan `disableCooling` melangkau cabang tersebut sepenuhnya.
- **Kejituan kunci berubah untuk keluarga dalam senarai izin**: ini ialah perubahan skop,
  bukan sekadar pengoptimuman sambungan setara. opencode ialah penyedia `passthroughModels`,
  jadi sebelum cabang ini, 429 menghasilkan penguncian per-MODEL; kini ia
  menghasilkan tempoh bertenang sambungan — termasuk bagi pengendali yang menjalankan satu
  sambungan tanpa sebarang sambungan setara. Itulah kejituan yang telah diisytiharkan betul oleh jadual
  peraturan opencode (`scope: "connection"`,
  `providerErrorRules.ts`), tetapi tidak pernah dipatuhi setakat ini kerana opencode tiada dalam
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Cabang tersebut menulis tempoh bertenang
  - `backoffLevel` bagi sambungan yang gagal itu sendiri, mencerminkan cabang agentrouter
    berskop sambungan, kemudian kembali — blok per-model dan
    laluan generik di bawah tidak pernah dicapai.
- **Combo disertakan**: seperti cabang agentrouter, skop tersebut dengan sengaja
  mengabaikan penurunan taraf `persistUnavailableState`/`isCombo` yang digunakan oleh pemanggil combo
  pada 429. Penguncian per-model bukan bentuk yang lebih lemah bagi skop ini, tetapi
  unit yang salah: ia tidak menyatakan apa-apa tentang IP yang telah kehabisan kuota, maka putaran
  combo akan terus membazirkan satu panggilan yang pasti gagal bagi setiap sambungan setara.
- **Keselamatan sambungan setara**: sambungan setara yang sudah terminal (banned/credits_exhausted)
  atau sudah berada dalam tempoh bertenang yang lebih panjang tidak akan ditulis ganti.
- **Senarai izin eksklusif**: memperluas `EGRESS_BUCKETED_LOCK_PROVIDERS` ialah
  keputusan pemilik yang nyata; tiada pendawaian generik (corak #10334/#10419). Pertanyaan
  sambungan setara mengikat senarai izin yang sama dan bukannya mengulanginya sebagai literal SQL,
  maka peluasan senarai itu kekal sebagai perubahan satu baris.
- **Putaran IP egress, kedua-dua arah**: tetingkap carian (24j) jauh
  lebih panjang daripada TTL cache IP egress (5 min), maka "IP terakhir yang diketahui" ialah sejarah,
  bukannya keadaan semasa. Jika proksi sambungan berputar dalam tetingkap tersebut,
  kunci mungkin **terlepas** IP yang benar-benar dikongsi (IP yang direkodkan ialah IP baharu
  yang belum kehabisan kuota) — dan secara simetri, ia mungkin **mengenakan tempoh bertenang pada sambungan setara yang sejak itu
  telah beralih** daripada IP yang kehabisan kuota. Kes kedua menyebabkan sambungan setara itu kehilangan satu
  tetingkap tempoh bertenang; kedua-duanya diterima sebagai batasan usaha terbaik bagi carian
  berasaskan sejarah.
- **Kos**: dua imbasan terbatas terhadap `proxy_logs` (ditapis mengikut tetingkap melalui
  `idx_pl_timestamp`), hanya pada kekerapan 429. Tiada indeks baharu (migrasi 134
  YAGNI). Diukur pada salinan DB trafik sebenar bersaiz sederhana; tika
  berdaya pemprosesan tinggi menyimpan lebih banyak baris secara berkadaran dalam tetingkap yang sama.

---

## Ciri Ketahanan Lain

- **19 strategi penghalaan** (keutamaan, berwajaran, round-robin, geganti konteks, isi dahulu, p2c, rawak, paling kurang digunakan, dioptimumkan kos, peka tetapan semula, tetingkap tetapan semula, ruang lebihan, rawak ketat, auto, lkgp, dioptimumkan konteks, dioptimumkan cache, gabungan, saluran paip) — lihat [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Penghalaan peka tetapan semula** (v3.8.0) — mengutamakan sambungan berdasarkan masa tetapan semula kuota.
- **Degradasi mod latar belakang** — Responses API `background: true` diturunkan kepada mod segerak dengan amaran.
- **Pengesanan had alat secara dinamik** — mengurangkan penggunaan penyedia apabila had bilangan alat dicapai.
- **Sandaran kecemasan** — dikawal oleh `OMNIROUTE_EMERGENCY_FALLBACK`; pengendali boleh mengatasinya daripada halaman Feature Flags tanpa memulakan semula.

---

## Penyahpepijatan

- Jawapan combo berwajaran `503 all_targets_cooling_down` (`Retry-After` ditetapkan, `diagnostics.excluded` menyenaraikan setiap sasaran dengan `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → kumpulan telah dikonfigurasikan dan disambungkan, tetapi setiap sasaran dikecualikan oleh pemasa daya tahan; amaran `[COMBO] Weighted selection: every target excluded before dispatch — …` menyatakan sebab dan baki saat. Respons `404 no_executable_targets` daripada combo yang sama bermaksud tiada pemasa daya tahan yang terlibat (tiada apa-apa untuk dijalankan, atau setiap akaun gagal dalam semakan ketersediaan). Terbina dalam `open-sse/services/combo/pinRecovery.ts` berdasarkan pengecualian yang dikumpulkan dalam `targetResolution.ts`.
- Semua kekunci bagi penyedia dilangkau → semak kedua-dua keadaan pemutus litar DAN `rateLimitedUntil`/`testStatus` bagi setiap sambungan.
- Penyedia dikecualikan secara kekal selepas tetingkap penetapan semula → kod membaca `state` mentah dan bukannya `getStatus()`/`canExecute()`.
- Satu kekunci gagal, yang lain sepatutnya berfungsi → utamakan tempoh bertenang sambungan berbanding pemutus litar.
- Hanya satu model gagal → utamakan sekatan model berbanding tempoh bertenang sambungan.
- Keadaan sepatutnya pulih sendiri tetapi tidak → semak cap masa pada masa hadapan + laluan bacaan yang menyegarkan keadaan yang telah tamat tempoh. Status kekal memerlukan perubahan manual.

---

## Cap Jari TLS & Mod Senyap

Mod senyap khusus penyedia (JA3/JA4, CCH, pengeliruan) didokumenkan secara berasingan — lihat `docs/security/STEALTH_GUIDE.md` (git; tidak dikompil ke dalam `/docs`).

---

## Pengujian ketahanan (Fasa 8 · Blok C)

Selain ujian unit untuk logik ketahanan, tiga ujian menguji masa jalan dalam
keadaan tekanan/kegagalan sebenar (semuanya integrasi/setiap malam — tiada yang menyekat PR):

| Ujian            | Perkara yang diuji                                                                                                                                                                                                  | Jalankan                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Huru-hara        | Nod huluan palsu menyuntik kependaman/tetapan semula/tamat masa/503 sebenar; mengesahkan bahawa pemutus litar terbuka/pulih dan `checkFallbackError` mengklasifikasikan 503 sebagai sandaran yang boleh dipulihkan. | `RUN_CHAOS_INT=1 npm run test:chaos`          |
| Pertumbuhan heap | ~500 strim bagi setiap `createSSEStream` di bawah `--expose-gc`; gagal jika heap berkembang melebihi had maksimum (perlindungan OOM #3069).                                                                         | `npm run test:heap`                           |
| Rendaman k6      | Beban berterusan terhadap `/api/monitoring/health`; ambang p95/ralat.                                                                                                                                               | `k6 run tests/load/k6-soak.js` (setiap malam) |

Diatur oleh `.github/workflows/nightly-resilience.yml` (cron + dispatch). Dalam
`test:integration` lalai, ujian huru-hara dan heap melangkau sendiri (tanpa `RUN_CHAOS_INT`/`--expose-gc`).

---

## Lihat Juga

- [Panduan Seni Bina](./ARCHITECTURE.md) — Seni bina sistem dan komponen dalaman
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Penyedia, kombo, integrasi CLI
- [Enjin Auto-Combo](../routing/AUTO-COMBO.md) — Penskoran 16 faktor, pek mod
