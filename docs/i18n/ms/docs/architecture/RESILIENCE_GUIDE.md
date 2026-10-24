# Resilience Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute mempunyai tiga mekanisme daya tahan yang berbeza tetapi saling berkaitan. Setiap satu mempunyai skop dan tujuan yang berbeza. Pastikan ia berasingan semasa menyahpepijat tingkah laku penghalaan.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Sumber: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Pemutus Litar Pembekal

**Skop:** keseluruhan pembekal (cth., `glm`, `openai`, `anthropic`).

**Tujuan:** menghentikan penghantaran trafik ke pembekal yang gagal berulang kali pada peringkat huluan/perkhidmatan.

**Pelaksanaan:**

- Kelas teras: `src/shared/utils/circuitBreaker.ts`
- Pendawaian: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status: `GET /api/monitoring/health`
- API set semula: `POST /api/resilience/reset`
- Pembalut: `open-sse/services/accountFallback.ts`
- Jadual DB: `domain_circuit_breakers`

**Keadaan:**

- `CLOSED` — trafik normal dibenarkan
- `DEGRADED` — trafik masih dibenarkan, tetapi kegagalan pembekal yang meningkat sedang dijejaki; kembali kepada `CLOSED` apabila terdapat kejayaan yang mencukupi, apabila ujian sambungan sah, atau selepas tempoh pegangan `OPEN` yang paling lama bagi jenis kegagalan terakhir (nilai `cooldownByKind` miliknya, jika tiada `resetTimeout`, × `maxBackoffMultiplier`, sekurang-kurangnya satu tempoh bertenang) tanpa kegagalan baharu
- `OPEN` — pembekal disekat buat sementara; penghalaan kombo melangkauinya
- `HALF_OPEN` — tamat tempoh set semula telah berlalu; permintaan siasatan dibenarkan

**Nilai lalai boleh konfigurasi (`open-sse/config/constants.ts`, didedahkan dalam Dashboard → Settings → Resilience):**

| Kelas    | Merosot pada | Terbuka pada | Tempoh set semula |
| -------- | ------------ | ------------ | ----------------- |
| OAuth    | 5 kegagalan  | 8 kegagalan  | 60s               |
| API-key  | 7 kegagalan  | 12 kegagalan | 30s               |
| Tempatan | diterbitkan  | 2 kegagalan  | 15s               |

`degradationThreshold` mengawal bila sesebuah pembekal memasuki `DEGRADED`; `failureThreshold` mengawal bila ia terbuka dan dilangkau. Profil pembekal tempatan belum didedahkan pada halaman tetapan Resilience lagi.

**Kod pencetus:** hanya status peringkat pembekal `[408, 500, 502, 503, 504]`. JANGAN cetuskan untuk ralat peringkat akaun (kebanyakan 401/403/429 — itu tergolong dalam tempoh bertenang atau sekatan akaun).

**Pemulihan malas:** apabila `OPEN` tamat tempoh, `getStatus()`, `canExecute()`, `getRetryAfterMs()` menyegarkan keadaan kepada `HALF_OPEN`. Bacaan yang sama (dan kegagalan seterusnya) menyusutkan `DEGRADED` yang lapuk kembali kepada `CLOSED`. Tiada pemasa latar belakang diperlukan.

---

### Provider Cooldown global opt-in (pintu tetingkap)

Lapisan keempat yang bersifat **opt-in** (`PROVIDER_COOLDOWN_ENABLED`, lalai **mati**) menyimpan ingatan merentas permintaan bagi pembekal yang gagal dalam
`open-sse/services/providerCooldownTracker.ts`, dirujuk oleh penentuan sasaran kombo supaya permintaan kombo berturut-turut berhenti menjejaki semula pembekal yang baru sahaja gagal. Entri peringkat pembekal mematuhi pintu tetingkap `PROVIDER_PROFILES`:

| Profil  | tercetus selepas (`providerFailureThreshold`) | dalam (`providerFailureWindowMs`) | bertenang selama (`providerCooldownMs`) |
| ------- | --------------------------------------------: | --------------------------------: | --------------------------------------: |
| OAuth   |                                          `10` |                           `15min` |                                  `5min` |
| API key |                                          `15` |                           `30min` |                                 `10min` |

Di bawah ambang, pembekal **tidak** dianggap sedang bertenang; kejayaan mengosongkan tetingkap. Entri peringkat sambungan (`provider:connectionId`) mengekalkan peningkatan eksponen `minRetryCooldownMs → maxRetryCooldownMs` sebaliknya. Penggantian:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Pengawal regresi: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown Sambungan

**Skop:** sambungan/akaun/kunci pembekal tunggal.

**Tujuan:** langkau satu kunci yang bermasalah manakala sambungan lain untuk pembekal yang sama terus melayani.

**Pelaksanaan:**

- Tanda sebagai tidak tersedia: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pemilihan: `getProviderCredentials*` dalam fail yang sama
- Pengiraan cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Tetapan: `src/lib/resilience/settings.ts`

**Medan bagi setiap sambungan:**

- `rateLimitedUntil` — cap masa sehingga cooldown tamat
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — pembilang backoff eksponen

**Cooldown lalai:**

- Asas OAuth: 5s
- Asas kunci API: 3s
- 429 kunci API: mengutamakan `Retry-After` huluan/pengepala reset/teks reset yang boleh dihurai
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Perlindungan anti-thundering-herd:** menghalang kegagalan serentak daripada melanjutkan cooldown secara berlebihan atau menambah nilai `backoffLevel` dua kali.

**429 had keserentakan tidak menaiki tangga backoff.** `429` yang badannya melaporkan had keserentakan ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) bermakna akaun itu sihat tetapi sibuk. `checkFallbackError()` mengembalikan sebab `concurrency_limited`: fail over ke sambungan seterusnya dengan serta-merta, sejukkan sambungan ini untuk tempoh tetap `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) atau petunjuk cuba semula huluan, kekalkan `backoffLevel` tidak berubah, dan tetapkan `skipProviderBreaker`. Badan kuota eksplisit tetap diutamakan, jadi badan yang turut sepadan dengan corak kuota kekal sebagai keputusan kuota. Pengesanan: `looksLikeConcurrencyLimit()` dalam `src/shared/utils/classify429.ts`; keputusan: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` breaker) tidak berubah dan masih membaca `rate_limit` untuk badan-badan ini.

**Stall kandungan strim tidak menyejukkan akaun.** Apabila watchdog stall kandungan (`open-sse/utils/streamHandler.ts`) berputus asa terhadap strim yang tidak menghantar output model dalam masa yang ditetapkan, `markAccountUnavailable()` merekodkan ralat pada sambungan tetapi tidak menetapkan cooldown: stall itu kepunyaan permintaan tersebut, selalunya giliran penaakulan yang panjang dan belum menghasilkan output. Operator boleh memilih untuk mengaktifkannya semula dengan `resilienceSettings.streamStallCooldown.enabled` (lalai `false`).

**Bingkai penaakulan memulakan semula bajet stall kandungan.** Model penaakulan boleh berfikir selama beberapa minit sebelum token ketara pertamanya: Claude menstrimkan bingkai `thinking_delta` yang teks pemikirannya mungkin kosong, dan Responses API menstrimkan satu item penaakulan demi satu. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) mengenali bingkai-bingkai ini, dan watchdog memulakan semula bajetnya pada setiap bingkai dan bukannya membatalkan giliran. Bingkai-bingkai ini masih bukan output model, jadi giliran yang berakhir dengan penaakulan sahaja masih dilaporkan sebagai kosong, dan giliran yang berhenti menaakul serta hanya menghantar heartbeat masih mencetuskan watchdog.

Bingkai binari `reasoningContentEvent` Kiro dengan tandatangan tidak kosong mengekalkan aktiviti penaakulan ini merentasi pelaksana sebagai delta `reasoning_content` kosong. Tandatangan tidak diteruskan. Metadata, bingkai tidak lengkap dan tandatangan kosong tidak memulakan semula bajet kandungan; tamat masa strim aktif yang bebas dan pembatalan klien masih terpakai (`open-sse/executors/kiro/reasoning.ts`).

**Keadaan terminal (BUKAN cooldown):**

- `banned` — ditetapkan oleh pengesanan kata kunci terharam / sekatan akaun (lihat [BAN_DETECTION](../security/BAN_DETECTION.md)), dan oleh tiga penolakan per permintaan huluan berturut-turut (`request_rejected`, cth. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); satu penolakan sahaja hanya menyejukkan sambungan
- `expired` (beralih ke terminal selepas percubaan semula yang terhad — `EXPIRED_RETRY_MAX = 3` dengan backoff eksponen — supaya ralat OAuth sementara boleh pulih sendiri sebelum akaun dinyahaktifkan secara kekal)
- `credits_exhausted`

Keadaan ini berkekalan sehingga kelayakan berubah atau operator menetapkannya semula. Jangan tulis ganti keadaan terminal dengan keadaan cooldown sementara.

**Pemulihan malas:** apabila `rateLimitedUntil` telah berlalu, sambungan menjadi layak semula. Selepas penggunaan yang berjaya, `clearAccountError()` mengosongkan semua medan ralat.

### Tembok penggunaan Claude OAuth: lorong keutamaan lebih rendah + penetapan semula had sesi

**Skop:** satu sambungan langganan Claude (OAuth). Kedua-dua ciri adalah **opt-in bagi setiap sambungan** (Sunting sambungan → bahagian Claude → `lowPriorityMode` / `autoLimitReset` dalam `providerSpecificData`, kedua-duanya lalai mati) dan mencerminkan perintah `/low-priority` dan `/limit-reset` Claude Code (kontrak wayar dirakam daripada Claude Code 2.1.263).

**Pelaksanaan:**

- Mesin keadaan + pengelasan respons: `open-sse/services/claudeLowPriority.ts`
- Klien status/tuntutan reset: `open-sse/services/claudeLimitReset.ts`
- Cangkuk pelaksana (suntikan pengepala + percubaan semula akaun yang sama): `open-sse/executors/base.ts::execute()`
- Kekekalan opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Pencetus:** tembok penggunaan 5 jam — `429` yang pengepalanya membawa `anthropic-ratelimit-unified-status: rejected` dan, apabila akaun layak, `anthropic-ratelimit-unified-slow-offer: treatment`. Tiada apa yang dihantar sebelum 429 tembok pertama itu; 429 ledakan tanpa pengepala unified mengikut laluan cooldown biasa.

**Lorong keutamaan lebih rendah** (`lowPriorityMode`):

- Pada dinding 429, pelaksana menerima tawaran itu dan serta-merta mencuba semula akaun yang **sama**
  dengan `anthropic-usage-limit: slow`; lorong kekal aktif sehingga
  `anthropic-ratelimit-unified-reset` yang diumumkan (+60s tempoh ihsan) dan setiap permintaan dalam
  tetingkap itu membawa pengepala tersebut. 429 yang dipintas tidak pernah sampai ke `handleChatCore`,
  jadi sambungan **tidak** diletakkan dalam penyejukan dan tidak dialih keluar.
- `anthropic-ratelimit-unified-slow-status` pada respons berikutnya: `active` / `not_needed`
  mengekalkan lorong; `slot_busy` (429) atau `529` menunggu
  `anthropic-ratelimit-unified-slow-retry-after` pelayan (lalai 20s, terhad 5–600s, jitter ±30%)
  dan mencuba semula, dihadkan oleh `anthropic-ratelimit-unified-slow-max-wait` (lalai 20 minit,
  terhad 1 minit–6 jam) — selepas itu lorong tamat dan tempoh bertenang 10 minit menyekat
  penerimaan semula. Penantian turut dihadkan oleh baki tamat masa permulaan huluan milik
  permintaan itu sendiri (`resolveFetchStartTimeout`, 10 minit secara lalai) ditolak margin 5 s:
  tanpa had itu, max-wait lalai 20 minit akan hidup lebih lama daripada permintaan dan tidur akan
  dibatalkan di tengah penantian, memunculkan `TimeoutError` dan bukannya pengakhiran `max_wait`
  yang teratur + tempoh bertenang.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, rollover tetingkap 5 jam, atau
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (yang menamatkannya sebagai
  `extra_usage` pada mana-mana status, kerana lebihan berbayar kini meliputi dinding) menamatkan
  lorong; respons kemudian mengalir ke laluan penyejukan biasa. `budget_exhausted` diingati sehingga
  tetapan semula bajet yang diumumkan (≤ 8 hari).
- Semakan dinding dijalankan selepas cubaan semula intra-cubaan berpunca 400 milik pelaksana sendiri
  (penyuntingan konteks, had thinking/effort, pembelajaran auto param), jadi dinding 429 yang hanya
  muncul pada salah satu cubaan semula itu masih dipintas dan bukannya sampai ke laluan penyejukan.
- Keadaan berada dalam ingatan bagi setiap sambungan (mula semula memerlukan satu dinding 429
  tambahan untuk menerima semula).

**Tetapan semula had sesi** (`autoLimitReset`, dicuba sebelum lorong apabila kedua-duanya aktif):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  apabila `arm: "reset"` dan `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` dengan
  `{ "program": "juniper_tide" }` (UUID organisasi daripada
  `providerSpecificData.organizationUUID`, sandaran bootstrap).
- `result: reset|not_limited` → permintaan dicuba semula pada kelajuan penuh (tiada pengepala slow).
  `already_used` / `not_offered` menyimpan `next_available_at` (lalai satu minggu); sebarang
  kegagalan menangguhkan 15 minit. Tetapan semula ialah sekali seminggu dan masih dikira ke arah
  had mingguan.

Pengawal regresi: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afiniti sesi (#7274)

**Skop:** satu sesi klien (pengepala `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) dipautkan pada satu sambungan, untuk **mana-mana** pembekal.

**Tujuan:** mengekalkan ejen berbilang pusingan (Claude Code, aider, ejen tersuai) pada akaun yang sama merentasi permintaan, mengurangkan kehilangan konteks rentas akaun dan 429 permulaan sejuk yang berulang pada pembekal dengan keadaan sesi setiap akaun.

**Pelaksanaan:**

- Resolusi TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pemilihan/penciptaan pautan: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Pengekstrakan pengepala (generik, mana-mana pembekal): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Jadual pautan kekal: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Tetapan: `sessionAffinityTtlMs` (TTL global dalam ms, `0` menyahaktifkan) — `src/lib/db/settings.ts`. Dinamakan semula daripada `codexSessionAffinityTtlMs` khusus Codex melalui migrasi `124_generic_session_affinity_ttl.sql`, yang membawa mana-mana TTL Codex yang dikonfigurasikan sebelum ini sebagai lalai baharu.

Sebelum #7274, `resolveSessionAffinityTtlMs()` terus keluar dengan `0` untuk setiap pembekal kecuali `codex`, jadi tetapan TTL (dan pengepala sesi) tidak mempunyai sebarang kesan di tempat lain walaupun mekanisme pemautan dan pengekstrakan pengepala sudah bersifat agnostik-pembekal. Pembetulan itu membuang pulangan awal tersebut; TTL kini terpakai secara seragam kepada setiap pembekal sebaik sahaja ditetapkan secara global melebihi `0`.

Ketiga-tiga pengepala afiniti sesi tidak pernah dimajukan ke huluan — pelaksana membina pengepala huluan mereka sendiri dari awal dan bukannya meneruskan pengepala klien, jadi ini kekal sebagai id korelasi dalaman sahaja.

### Pajakan sambungan sesi terurus eksklusif

**Skop:** satu klien/sesi HTTP terurus aktif memiliki satu sambungan OmniRoute yang layak.

**Tujuan:** menyediakan pemilikan sambungan eksklusif yang teguh untuk klien yang memerlukan pagar
penghalaan tegas merentasi permintaan. Ini berbeza daripada afiniti sesi, yang merupakan keutamaan
kesinambungan yang lembut: pajakan eksklusif mengekalkan keadaan kitar hayat dalam SQLite,
menguatkuasakan keunikan pemilik-aktif dan sambungan-aktif global, serta menolak generasi lapuk
sebelum penghantaran pembekal.

Ciri ini bersifat opt-in bagi setiap kunci API. Kunci terurus mesti mempunyai skop `lease:exclusive`
dan senarai `allowedConnections` yang eksplisit dan tidak kosong. Mana-mana klien HTTP boleh
menggunakan titik akhir kitar hayat; tiada nama klien, user-agent, pembekal, kaedah OAuth, atau
model diperlukan. Pajakan memiliki sambungan, bukan model, jadi pertukaran model mengekalkan ikatan
selagi sambungan itu kekal layak seperti biasa. Peraturan model, kuota, kesihatan, penyejukan dan
senarai benar biasa kekal muktamad dan boleh mengalihkan generasi yang sama kepada sambungan layak
bebas yang lain.

Kitar hayat ialah `POST /api/v1/session-leases` dengan tindakan JSON `acquire`, `renew`, dan `release`.
Permintaan inferens terurus menyerahkan nilai legap `X-OmniRoute-Lease-Owner` dan
`X-OmniRoute-Lease-Generation` yang tepat. Pemilik menggunakan `vlo_` diikuti oleh 43 aksara
base64url; hanya cincangan SHA-256nya yang disimpan. Setiap pagar penghantaran akhir juga
mengikat ID kunci API yang disahkan dan ID sambungan aktif. Pengepala kawalan pajakan dikeluarkan
daripada log, snapshot permintaan yang dikekalkan, dan pengepala pelaksana huluan.

Jika penghalaan biasa mempunyai calon terurus yang layak tetapi setiap calon bebas diduduki oleh
pajakan aktif asing, OmniRoute mengembalikan HTTP `429`, kod kapasiti-pajakan-tidak-tersedia,
keadaan menunggu-kapasiti, dan `Retry-After` terhad yang diterbitkan daripada tamat tempoh
berkaitan yang paling awal. Kelayakan kosong biasa bukan pertikaian pajakan dan mengekalkan
semantik ralat penghalaannya yang sedia ada.

Mekanisme berkaitan kekal berasingan:

- Penghunian sesi OAuth ialah pengedaran lembut setempat proses untuk akaun OAuth.
- Semafor akaun memberikan permit keserentakan permintaan dan berakhir apabila permintaan selesai.
- Pajakan sesi terurus eksklusif ialah pemilikan kitar hayat berdaya tahan dengan pagar generasi.

---

## 3. Sekatan Model

**Skop:** kombinasi tiga pembekal + sambungan + model.

**Skop kunci mengikut status:** status yang gagal menentukan kunci mana yang ditulis oleh sekatan (`resolveLockoutScope()` dalam `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — isyarat kuota atau kelayakan — sekat **keluarga kuota**:
  untuk codex, keseluruhan skop `codex` / `spark` (setiap model `gpt-5*` bagi
  sambungan itu), untuk pembekal lain `getQuotaScopedModelForProvider()`.
- `404` menyekat model itu sahaja (`getModelLockKey()` menyempitkan `not_found`).
- Mana-mana status lain — kegagalan pengangkutan/pelayan `5xx` dan `502` sintetis
  OmniRoute sendiri daripada pengesahan kualiti — hanya menyekat tuple pembekal/sambungan/model
  yang **tepat** sahaja. Strim yang rosak pada satu model bukan bukti
  tentang kuota akaun; sebelum peraturan ini, satu respons kosong pada
  `codex/gpt-5.6-luna` mengeluarkan setiap model `gpt-5*` sambungan itu daripada
  penghalaan selama 2–30 min (meningkat) sedangkan kuotanya tidak tersentuh.
- Pilihan `scope` eksplisit pemanggil sentiasa menang (Antigravity menghantar `"exact"`).

**Tujuan:** mengelakkan penyahdayaan keseluruhan sambungan apabila hanya satu model tidak tersedia atau dihadkan kuota.

**Contoh:**

- Pembekal kuota setiap model yang mengembalikan 429
- Pembekal tempatan yang mengembalikan 404 untuk satu model yang tiada
- Kegagalan kebenaran mod/model khusus pembekal (cth., mod Grok)

**Implementasi:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Papan Pemuka Cooldown Model (v3.8.0)

UI: Tetapan → Cooldown Model (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Menyenaraikan sekatan aktif dengan: pembekal, sambungan, model, sebab, expiresAt. Operator boleh mendayakan semula model secara manual daripada kad tersebut.

**REST API:**

- `GET /api/resilience/model-cooldowns` — senaraikan sekatan aktif
- `DELETE /api/resilience/model-cooldowns` — dayakan semula secara manual. Badan: `{provider, connection, model}`. Pengesahan: management.

### Pengurus Cooldown

UI: Pemantauan → Pengurus Cooldown (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Satu halaman untuk setiap sambungan yang berada di luar penghalaan atas sebab sementara,
tanpa perlu membuka setiap halaman pembekal. Ia menyenaraikan cooldown sambungan, sekatan model
dan keadaan terminal, mengosongkannya bagi setiap sambungan, bagi satu pilihan, atau bagi semua
sambungan sesebuah pembekal, serta mengedit peraturan cooldown yang paling kerap ditala:
`streamStallCooldown.enabled` dan cooldown asas `connectionCooldown` OAuth / kunci API
serta langkah backoff maksimum (disimpan melalui `PATCH /api/resilience`). Keadaan terminal
(`banned`, `expired`, `credits_exhausted`) disenaraikan tetapi tidak pernah dikosongkan di sini.

**REST API** (`src/lib/resilience/cooldownManager.ts`, pengesahan: management):

- `GET /api/resilience/cooldowns[?provider=]` — sambungan dengan status, baki cooldown,
  tahap backoff, jenis ralat terakhir dan sekatan model (tanpa kredential)
- `POST /api/resilience/cooldowns` — badan `{connectionIds: string[]}` atau
  `{all: true, provider?}`; mengembalikan `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI tetapan sekatan + pemulihan pereputan kejayaan (v3.8.23)

Sekatan model beralih daripada tingkah laku hardcoded yang sentiasa aktif kepada ciri opt-in
yang boleh dikonfigurasi sepenuhnya, dengan kad tetapannya sendiri dan laluan pemulihan penyembuhan diri.

**Kad tetapan:** Tetapan → Sekatan Model
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Kad ini **berbeza** daripada `ModelCooldownsCard` baca-sahaja di atas (yang hanya
_menyenaraikan_ sekatan aktif) — kad baharu ini _mengkonfigurasi parameter_. Nilai lalai
berada dalam `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Tetapan                 | Lalai                            | Maksud                                                             |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `enabled`               | `false`                          | Togol utama — sekatan model **dimatikan secara lalai**.            |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status hulu yang dikira sebagai kegagalan berskop model.           |
| `baseCooldownMs`        | `120_000` (120 s)                | Tempoh sekatan awal untuk kegagalan pertama.                       |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Had maksimum cooldown yang meningkat.                              |
| `maxBackoffSteps`       | `10`                             | Langkah peningkatan backoff eksponen maksimum.                     |
| `useExponentialBackoff` | `true`                           | Sama ada kegagalan berulang meningkatkan cooldown secara eksponen. |

Tetapan berterusan melalui stor tetapan biasa dan disahkan melalui skema tetapan
ketahanan; kad tersebut mengapit `baseCooldownMs`/`maxCooldownMs`
(dengan `maxCooldownMs ≥ baseCooldownMs`) dan `maxBackoffSteps`.

**Pemulihan pereputan kejayaan:** pemulihan **bukan** semata-mata tamatnya pemasa.
Respons yang sihat menurunkan semula kiraan kegagalan model supaya model yang pulih
di pertengahan tempoh berhenti meningkat (dan dikosongkan) sebelum pemasanya tamat.
Pada sasaran kombo yang berjaya, `open-sse/services/combo.ts` memanggil
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), yang **mengurangkan separuh**
`failureCount` yang tersimpan (`Math.floor(failureCount / 2)`); apabila ia mencapai `0`, entri sekatan
dipadam sepenuhnya. Pasangan sepadannya `recordModelLockoutFailure()`
menambah kiraan (dan meningkatkan cooldown) pada kegagalan dalam tempoh
peningkatan. Pereputan kejayaan ini adalah tambahan kepada tamat pemasa biasa —
mana-mana satu laluan boleh mendayakan semula model.

**Keadaan:** sekatan disimpan **dalam ingatan** (`Map` setiap proses bagi
`ModelLockoutEntry` berkunci `provider:connectionId:model`, kunci berskop tepat dengan
`provider:connectionId:exact:model`), tidak disimpan berterusan ke
pangkalan data — ia hilang apabila dimulakan semula. _Tetapan_ disimpan berterusan;
_keadaan_ sekatan aktif bersifat efemeral.

---

## 4. Kawalan Keserentakan Quota-Share (v3.8.36)

Akaun langganan (GLM, MiniMax, dll.) selalunya hanya menerima ~1–3 permintaan
serentak; melebihi had itu akan mencetuskan 429 dan tempoh cooldown. Keadaan ini
amat ketara dalam kombo **quota-share** (`qtSd/…`), di mana beberapa kunci API
berkongsi satu akaun huluan. Tiga lapisan menghalang akaun kongsi daripada
dibanjiri.

### Had keserentakan setiap sambungan (`max_concurrent`)

Setiap sambungan penyedia boleh mengisytiharkan siling `max_concurrent`
(`provider_connections.max_concurrent`, ditetapkan dalam modal sambungan / API /
pangkalan data). Biarkan kosong untuk tiada had. Ini ialah satu-satunya tombol
yang menggerakkan lapisan penyirian di bawah — tetapkannya kepada keserentakan
sebenar akaun (cth. GLM ~1, MiniMax ~2).

### Had keserentakan setiap model (`modelConcurrency`)

Sesebuah sambungan juga boleh mengisytiharkan siling keserentakan tepat setiap
model di dalam peta `rateLimitOverrides` miliknya:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Tetapkannya dalam modal sambungan (**Pintasan had kadar → Had keserentakan
setiap model**, satu `model=cap` setiap baris) atau melalui
`PATCH /api/providers/[id]` dengan bentuk JSON yang sama. Semantik utama:

- **Seluruh sambungan lwn khusus model:** `maxConcurrent` kekal sebagai siling
  kongsi seluruh sambungan. Apabila kedua-duanya terpakai, kedua-dua pintu
  diperoleh secara atomik dalam pintu komposit yang sama
  (`global → provider → account → model`); tingkah laku efektifnya ialah had
  yang lebih ketat di kalangan yang terpakai.
- **Padanan tepat kunci model:** kuncinya ialah rentetan model yang diserahkan
  kepada pelaksana selepas penyelesaian penghalaan — biasanya ID model huluan
  asal (`glm-5`), bukan alias `provider/model` di sisi klien (`zai/glm-5` tidak
  sepadan dengan `glm-5`). Nilainya ialah siling permintaan serentak berbentuk
  integer positif.
- **Giliran setempat, tiada penemuan:** permintaan berlebihan beratur secara
  setempat dengan semantik baris gilir/tamat masa sedia ada (ralat kemasukan
  bertaip `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute tidak
  mengesan atau menyimpulkan dasar huluan — ia menguatkuasakan siling tepat
  yang dikonfigurasikan oleh pengendali. Pintu model yang tepu tidak pernah
  melumpuhkan penyedia mahupun mewujudkan sekatan model yang kekal; tingkah
  laku 429/cooldown/fallback huluan kekal sebagai benteng terakhir untuk ralat.
- **Skop setiap sambungan, setiap proses:** had adalah mengikut sambungan
  pangkalan data dan dipegang dalam ingatan, jadi dua sambungan yang
  menggunakan semula kunci API huluan yang sama tidak berkoordinasi antara satu
  sama lain.
- **Tidak dikonfigurasi bermakna tidak berubah:** mengabaikan peta (atau
  membiarkan medan papan pemuka kosong) tidak menambah sebarang pintu model.
  Contoh konfigurasi tanpa menetapkan sebarang had penyedia universal:

```text
glm-5=1
glm-4.7=3
```

### Penyirian permintaan quota-share

Apabila penghantaran quota-share menyasarkan sambungan yang mengisytiharkan
`max_concurrent` positif, permintaan serentak ke **akaun** itu disirikan melalui
semafor setiap sambungan (kunci `qsconn:<connectionId>`): permintaan berlebihan
**menunggu dalam baris gilir** dan bukannya membanjiri akaun. Ia bersifat
**fail-open** — baris gilir yang tepu atau tamat masa akan diteruskan tanpa
slot, dan tidak sekali-kali menolak permintaan yang boleh dihantar. Togol dalam
**Tetapan → Resiliensi → Keserentakan setiap sambungan quota-share**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, lalai aktif). Tanpa
had `max_concurrent`, tingkah laku kekal tidak berubah.

> Pintu penghalaan quota-share (`selectQuotaShareTarget`, DRR + P2C) itu
> sendiri bersifat fail-open dan hanya _menyahutamakan_ sambungan yang telah
> mencapai had — dengan kumpulan sambungan tunggal ia tidak dapat mengehadkan
> secara mutlak, jadi semafor inilah yang sebenarnya membendung banjir itu.

### Cubaan semula peka cooldown kombo

Untuk setiap strategi kombo (apabila didayakan), permintaan yang sepatutnya
menghasilkan 429 untuk cooldown sementara yang SINGKAT akan menunggu sehingga
tamat dan menghantar semula, dan bukannya memulangkan 429 — ini merangkumi
tetingkap TPM/RPM kelas Gemini (~60s retry-after) pada kombo berbilang model,
cth. apabila kedua-dua sasaran kombo 2 model terkena had kadar setiap model.
Dibatasi oleh `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) dalam **Tetapan → Resiliensi**. Ia tidak pernah menunggu untuk
`quota_exhausted` (dikunci sehingga tengah malam) atau sebab pengesahan/tidak
dijumpai.

Pintu yang sama merangkumi kes pra-penghantaran (#16319): apabila setiap
sasaran kombo dilangkau sebelum sebarang percubaan dibuat kerana modelnya
berada dalam sekatan sementara singkat, laluan sifar percubaan akan menunggu
sekatan itu tamat di bawah siling yang sama dan menghantar semula, dan bukannya
menjawab `503 ALL_TARGETS_SKIPPED` tanpa petunjuk. Apabila tiada penantian
dibenarkan (siling, percubaan atau bajet telah habis, atau ciri dimatikan),
respons terminal dinaik taraf kepada `429 rate_limit_error` yang membawa
`retry_after` / `reset_at` daripada waktu tamat sekatan sementara paling awal;
sekatan kuota, pengesahan dan tidak dijumpai mengekalkan 503 tanpa petunjuk.

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

## 5. Kawalan Kemasukan Giliran Permintaan (v3.8.49 · isu #6593)

**Skop**: giliran had kadar setiap pembekal+sambungan setempat (`open-sse/services/rateLimitManager.ts`, disokong oleh Bottleneck), satu lapisan di bawah tiga mekanisme di atas.

**`maxWaitMs` menghadkan masa menunggu giliran; `executionMaxWaitMs` menghadkan pelaksanaan.**
Kedua-duanya sengaja dipisahkan, dan tidak ada satu pun yang memberi masukan kepada yang lain.

`resilienceSettings.requestQueue.maxWaitMs` ialah **bajet menunggu giliran**: ia meliputi menunggu slot pembekal dan kemudian berada dalam keadaan QUEUED, dan pemasanya dikosongkan sebaik sahaja tugas meninggalkan QUEUED dan mula dilaksanakan (`rateLimitManager.ts`, `wrappedFn`). Permintaan yang melebihinya tidak akan sampai ke hulu. Lalai 30000ms, dibekalkan oleh `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` dalam `src/lib/resilience/settings.ts` dan dipaut oleh `tests/unit/ratelimit-admission-control-6593.test.ts`, jadi perubahan kepadanya menjadikan ujian itu merah dan bukannya membiarkan perenggan ini lapuk secara senyap.

`resilienceSettings.requestQueue.executionMaxWaitMs` ialah apa yang diterima Bottleneck sebagai `expiration` tugas, yang pemasanya bermula hanya selepas penghantaran. Ia adalah sandaran untuk pelaksana yang tiada tamat masa hulu tersendiri, dan ia dinaikkan kepada tamat masa permulaan fetch pelaksana itu sendiri apabila ia lebih panjang, supaya ia tidak dapat memutuskan respons sihat yang sedang berjalan. Lalai 600000ms (10 min).

Memberi bajet giliran ke dalam `expiration` adalah apa yang dahulu membunuh gerbang tidak berperingkat di tengah jalan — ia sah berjalan selama beberapa minit sebelum bait pertama — dan itulah sebabnya tamat tempoh ditunjukkan sebagai `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) manakala bajet giliran membawa kod tamat masa giliran. Tindih mana-mana satu melalui `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) atau papan pemuka (**Tetapan → Ketahanan**). Kedua-duanya diapit kepada 1ms–24j apabila dinormalkan.

**Keutamaan, untuk kedua-duanya:** pemboleh ubah env hanya membekalkan _lalai_. Nilai yang dikekalkan dalam `resilienceSettings.requestQueue` (papan pemuka / tampalan API, disimpan dalam `key_value`) mengatasinya, dan `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` setiap sambungan pula mengatasi itu. Menetapkan pemboleh ubah env pada penggelaran yang sudah mempunyai nilai berterusan oleh itu tidak mengubah apa-apa — kosongkan atau kemas kini tetapan berterusan itu sebaliknya.

Masa berada dalam giliran dihadkan oleh `maxWaitMs`; `maxQueueDepth` di bawah menghadkan berapa ramai pemanggil boleh beratur pada satu masa.

**Cubaan semula yang dinyatakan dalam badan: pengaturan rentak vs penguncian.** Badan 429 boleh menyatakan masa tunggunya sendiri (Gemini `RetryInfo.retryDelay`, teks "retry after Ns"), yang dibaca oleh `updateFromResponseBody`. Masa tunggu yang muat dalam `maxWaitMs` sambungan ialah pengaturan rentak: pengehad mengosongkan takungannya selama itu dan panggilan beratur dihantar apabila ia diisi semula. Masa tunggu yang lebih panjang daripada `maxWaitMs` bukan sesuatu yang boleh ditunggui habis oleh giliran — Gemini menjawab kuota harian yang kehabisan dengan `retryDelay: "86399s"`. `Retry-After` yang disampaikan pada 429 yang dibina semula (#16528) sudah menyebabkan enjin sandaran mengunci model untuk tempoh itu, tetapi menjeda pengehad untuknya juga masih akan menyekat mana-mana panggilan yang sampai ke kunci lebih awal (selepas set semula ketahanan, sebagai contoh) untuk keseluruhan `maxWaitMs`. Apabila masa tunggu sedemikian datang daripada butiran Google `RetryInfo` bertaip (provenans `google_rpc_retry_info`) dan pengehad kunci sudah berskop kepada model (lihat `getLimiterKey`), 429 itu menjadi penguncian model pada sambungan tersebut sebaliknya (`lockModelForLongBodyRetry` dalam `open-sse/services/rateLimitManager/bodyRetryPause.ts`, dihadkan kepada 24j), dan pengehad dibiarkan tidak dijeda. Pemilihan akaun melangkau kunci itu melalui `isModelLocked()`, dan begitu juga pintu pra-penghantaran kombo untuk sasaran yang dipaut pada sambungan. Pada antigravity, yang pengehadnya mengikut keluarga kuota, kunci itu adalah pada model tepat, seperti kunci kuotanya yang lain. Nama yang diminta klien turut dikunci apabila alias menyelesaikannya kepada model itu, kerana semakan tersebut menggunakan nama yang diminta; ia dikunci secara tepat (`lockExactModel`), supaya alias yang merentasi keluarga kuota antigravity atau skop codex tidak pernah mengunci miliknya sendiri. Petunjuk prosa, `retryDelay` tidak bertaip, atau pengehad yang dikongsi oleh keseluruhan sambungan mengekalkan jeda. Apabila pengehad yang baru dibina semula oleh laluan 429 memang menjeda, pemanggil yang baki masa gilirannya berakhir sebelum jeda itu ditolak serta-merta dengan kod tamat masa giliran (`checkLimiterPause`) dan bukannya menunggu masa itu tamat; penghujung yang direkodkan ditambatkan sebelum pengehad dibina, di mana Bottleneck memulakan jam muat semulanya, dan sebarang perubahan kemudian pada takungan melupakannya. Diliputi oleh `tests/unit/rate-limit-long-body-retry-lockout.test.ts` dan `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — had kemasukan pilihan (baharu).** `resilienceSettings.requestQueue.maxQueueDepth` menghadkan bilangan permintaan yang boleh berada dalam giliran (belum dihantar) untuk satu pembekal+sambungan pada satu masa. Apabila giliran sudah memegang `maxQueueDepth` permintaan, permintaan baharu ditolak pantas dengan ralat bertaip `code: "RATE_LIMIT_QUEUE_FULL"` **sebelum** ia sampai ke `limiter.schedule()` — jadi penolakan itu murah dan berlaku sebelum sebarang kerja pemampatan gesaan / terjemahan di hilir untuk permintaan itu. Lalai `0` = dinyahdayakan, mengekalkan tingkah laku giliran tanpa had sedia ada; dihadkan 0–100000. Tindih melalui `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) atau `resilienceSettings.requestQueue.maxQueueDepth` (papan pemuka/tampalan API).

Semakan kemasukan itu sendiri ialah fungsi tulen (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) supaya ia boleh diuji unit tanpa pengehad Bottleneck sebenar.

> RFC yang membuka #6593 turut mencadangkan flag `bypassCompressionOnRateLimit`. Saluran paip `open-sse/services/compression/` dalam repo ini ialah pemampatan prompt/konteks pada permintaan LLM keluar (`chatCore.ts`, sekitar blok `resolveCompressionSettings`/`selectCompressionStrategy`), bukan pemampatan respons HTTP pada badan 429 yang disintesis — tiada laluan kod yang sepadan untuk flag pintasan literal. Langkah pemampatan prompt itu juga kini berjalan _sebelum_ `withRateLimit()` dalam saluran paip permintaan, jadi menyusun semula untuk melangkaunya pada penolakan queue-penuh ialah perubahan berasingan yang lebih besar daripada skop isu ini; ia dengan sengaja **tidak** dilaksanakan di sini dan ditinggalkan sebagai susulan jika penjimatan CPU berbaloi dengan risiko penyusunan semula.

### Jaring Keselamatan Pengaktifan Auto Had Kadar & Perlindungan Sambungan (`rateLimitProtection`)

**Jaring keselamatan pengaktifan auto** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, lalai `true`):
Secara lalai, OmniRoute secara automatik mengaktifkan perlindungan queue had kadar untuk semua sambungan pembekal kunci API yang aktif (`getProviderCategory(provider) === "apikey"`). Ini memastikan permintaan masuk ke kunci API upstream yang sensitif kadar diatur gilir dan disebat melalui Bottleneck dan bukannya meletus menjadi ralat 429 upstream. Jaring keselamatan boleh ditindih melalui pemboleh ubah persekitaran `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` menyahaktifkan, `true`/`1`/`on` memaksa aktif), yang mengambil keutamaan ke atas tetapan papan pemuka yang dikekalkan (**Tetapan → Resilience** / `PATCH /api/resilience`).

**Semantik `rateLimitProtection` setiap sambungan:**
Perlindungan had kadar setiap sambungan dijejak melalui medan boolean `rateLimitProtection` pada sambungan pembekal (dikekalkan sebagai `rate_limit_protection` dalam SQLite):

- **Aktif eksplisit (`rateLimitProtection === true`)**: Perlindungan had kadar diaktifkan secara eksplisit untuk sambungan ini, tanpa mengira kategori pembekal atau sama ada jaring keselamatan pengaktifan auto dihidupkan.
- **Nyahaktif eksplisit (`rateLimitProtection === false`)**: Menyahaktifkan perlindungan eksplisit, tetapi **tidak** menarik diri sambungan kunci API aktif daripada jaring keselamatan pengaktifan auto global. Dalam `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` dan `undefined` adalah setara: hanya `rateLimitProtection === true` dianggap sebagai penindihan eksplisit. Jika `rateLimitProtection` ialah `false` (atau tidak ditetapkan), sambungan kunci API aktif masih memenuhi syarat pengaktifan auto dan kekal dilindungi had kadar.
- **Tiada penarikan diri setiap sambungan**: Pengendali buat masa ini tidak dapat menyatakan "sambungan kunci API aktif tunggal ini mesti berjalan tanpa perlindungan queue had kadar" sambil mengekalkan pengaktifan auto aktif untuk yang lain. Untuk menjalankan sambungan kunci API sepenuhnya tanpa queue had kadar, jaring keselamatan mesti dimatikan secara global (`RATE_LIMIT_AUTO_ENABLE=false` atau `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Laluan penulisan yang disokong:**

- **`POST /api/rate-limits`**: Laluan penulisan pengurusan yang disokong untuk menogol `rateLimitProtection` bagi sambungan (`{ connectionId: string, enabled: boolean }`). Memanggil ini dengan `enabled: true` mengaktifkan perlindungan eksplisit; memanggil ini dengan `enabled: false` mengalih keluar perlindungan eksplisit (walaupun sambungan kunci API aktif kekal dilindungi di bawah jaring keselamatan global jika pengaktifan auto aktif).
- **`PUT /api/providers/[id]`**: Dengan sengaja **tidak** menerima atau mengalihkan `rateLimitProtection` (#11278). Mengemas kini metadata sambungan pembekal melalui `PUT /api/providers/[id]` tidak akan sekali-kali mengubah keadaan perlindungan had kadar yang dikekalkan.

---

## 6. Watchdog daya pemprosesan strim perlahan (#9709)

Pengawal pilihan `resilienceSettings.streamRecovery.throughputWatchdog` mengesan
huluan yang masih menghantar ketulan tetapi menghasilkan output pembantu di bawah
kadar output berguna yang dikonfigurasikan. Ia sengaja dibezakan daripada tamat masa
melengah: heartbeat dan metadata tidak menetapkan semula mana-mana pemasa dan tidak
dikira sebagai kemajuan. Ia juga berbeza daripada had masa percubaan mutlak (#9153),
yang kekal sebagai siling keselamatan mutlak tanpa mengira kualiti output.

Watchdog memerlukan tempoh pemanasan diikuti dengan tetingkap bergerak yang lengkap
sebelum ia boleh membatalkan. Ia mengira delta teks daripada peristiwa output Chat
Completions dan Responses API (proksi bait UTF-8 yang konservatif), mengabaikan
peristiwa yang hanya mengandungi penggunaan serta peristiwa kosong, dan menangguhkan
penilaian semasa peristiwa panggilan alat atau penaakulan sedang berlangsung. Ia
dilumpuhkan secara lalai dan boleh didayakan dengan
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; tetingkap, pemanasan, kadar minimum, dan
output minimum yang boleh diukur dihadkan oleh lapisan normalisasi tetapan ketahanan
yang biasa.

Apabila didayakan, pembatalan watchdog hanya dikenakan pada percubaan huluan yang
aktif. Sebelum sebarang bait yang kelihatan kepada klien, laluan pemulihan awal
akaun sama yang sedia ada boleh membuka semula percubaan tersebut. Selepas commit,
strim tidak pernah dimainkan semula secara membuta tuli; hanya kontrak kesinambungan
separuh strim yang selamat yang sedia ada boleh menyambung akhiran. Pengakhiran
kekal sekali sahaja, jadi perakaunan penggunaan dan pelepasan semaphore tidak
diduplikasi.

---

## 7. Penyataan Semula Status Upstream (ralat kuota tersilap nyata)

**Skop:** satu gateway upstream yang melaporkan kehabisan kuota sementara dengan status HTTP yang salah.

**Tujuan:** membetulkan status yang mengelirukan SEBELUM pengelasan, supaya pengguna hiliran (enjin fallback, agregasi combo, respons yang berdepan klien) melihat sifat kegagalan yang sebenar boleh dicuba semula.

Sesetengah gateway mengisyaratkan kehabisan kuota SEMENTARA dengan status HTTP
yang tidak boleh dicuba semula. `agentrouter.org` mengembalikan `403`
(kadangkala `400`) dengan badan berbahasa Cina (`用户额度不足` / `额度不足`)
dan bukannya `429` standard. Klien seperti Claude Code menganggap `403`
sebagai kekal dan membatalkan sesi, dan tanpa pembetulan enjin fallback akan
mengelaskannya sebagai `AUTH_ERROR` dan bukannya peristiwa kuota.

**Pelaksanaan:**

- Registry + pemadanan: `open-sse/config/upstreamStatusRestatement.ts` — satu
  senarai peraturan mengikut penyedia (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), dipadankan melalui `applyStatusRestatement()`.
- Lokasi panggilan: blok `providerFailure:` dalam `open-sse/handlers/chatCore.ts`
  (sekitar baris 3654), sejurus selepas `parseUpstreamError()` menghuraikan
  respons upstream dengan status HTTP ralat (`!providerResponse.ok`), dan
  sebelum sebarang pengelasan dijalankan, supaya setiap pengguna hiliran
  melihat status yang telah dibetulkan. Ralat yang tertanam di dalam strim SSE
  `200` mengikut laluan penghuraian strim yang berasingan dan lebih lewat,
  serta **tidak** diliputi oleh hook ini pada masa ini — satu batasan yang
  diketahui, belum diperlukan untuk status silap agentrouter (yang muncul
  sebagai status HTTP ralat).
- Kelayakan cuba semula: `429` terdapat dalam `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), jadi ralat yang
  dinyatakan semula membawa tetingkap cuba semula yang sebenar dan bukannya
  muncul sebagai `403` mati.
- `defaultRetryAfterMs` sintetik `60s` (`upstreamStatusRestatement.ts`)
  hanyalah apa yang diberitahu oleh respons yang dinyatakan semula kepada
  **klien**; ia bukan dengan sendirinya tempoh cooldown/lockout dalaman
  sambungan — itu ditadbir secara berasingan oleh mana-mana mekanisme yang
  sebenarnya mengendalikan ralat yang dinyatakan semula itu (backoff semakin
  meningkat Connection Cooldown, §2, asas `3s` untuk penyedia kunci API; atau
  Model Lockout, §3, untuk penyedia kuota setiap model seperti agentrouter).
  Router boleh menjadi layak untuk mencuba semula secara dalaman lebih awal
  daripada tetingkap 60s yang diiklankannya kepada klien — ruang lega yang
  disengajakan, bukan pepijat.

Ralat kekal (`无权访问模型` agentrouter — tiada akses kepada model ini) TIDAK
PERNAH dinyatakan semula: `excludeMarkers` memveto peraturan itu walaupun
`textMarkers` sepadan, jadi ralat mengekalkan status asalnya dan tiada apa
yang akan mencubanya semula selama-lamanya. Peraturan pengelasan penyedia yang
sepadan (`agentrouter-model-access-denied` dalam
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope:
"model"`, cooldown asas `6h` yang diisytiharkan) dirujuk oleh
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _sebelum_
early-return `FORBIDDEN` kategori apikey generik, dikawal oleh
`honorsRuleLockScope(provider)` (#10334 — pada masa ini eksklusif untuk
agentrouter melalui senarai benar `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dalam
`providerErrorRules.ts`). Cooldown 6h yang diisytiharkan oleh peraturan itu
mengalir melalui sebagai `fallbackResult.baseCooldownMs`, tetapi ia masih
menyalur ke laluan lockout kuota setiap model sedia ada
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, tidak diubah
oleh #10334 kecuali untuk sumber cooldown): ia dihadkan kepada
`mlSettings.maxCooldownMs` operator (lalai `1_800_000ms` / 30min), seperti
setiap lockout model lain, dan _sebab lockout yang kekal disimpan_ tetap
menjadi `"forbidden"` hardkod sedia ada, bukan `"auth_error"` peraturan —
hanya tempoh cooldown yang dihormati dari hujung ke hujung, bukan rentetan
sebab. Sambungan itu sendiri kekal aktif; model-model sebaya pada sambungan
yang sama tidak terjejas.

Ralat kuota yang dinyatakan semula (`额度不足`) mencapai peraturan penyedia
dalam pengeluaran (`agentrouter-user-quota-exhausted`: `reason:
"quota_exhausted"`, `scope: "connection"`, tiada cooldown tersendiri yang
diisytiharkan — lalai backoff berskala lapisan persistence digunakan). Sejak
#10334, `scope` pada `ProviderErrorRuleMatch` MEMANG digunakan dari hujung ke
hujung, tetapi **hanya** untuk penyedia dalam senarai benar
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — hari ini hanya
`"agentrouter"`, dikawal melalui `honorsRuleLockScope()`). Untuk setiap
penyedia lain, `scope` kekal bersifat maklumat sahaja, tepat seperti sebelum
#10334. `checkFallbackError` memaparkan skop peraturan yang sepadan sebagai
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ialah pengawal kongsi yang mengesahkan bahawa
sesuatu `ruleScope` benar-benar selamat untuk dihormati sebagai isyarat
seluruh sambungan yang pulih sendiri (skop `"connection"`, sebab
`quota_exhausted`, tidak pernah `permanent`, tidak pernah `creditsExhausted` —
satu pertahanan terhadap peraturan masa hadapan yang memasangkan skop
`"connection"` dengan keadaan akaun yang kekal). Dua pengguna memanggilnya:

- **Persisten** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  daripada jatuh ke dalam cawangan sekatan **per-model** pembekal passthrough
  (agentrouter ialah `passthroughModels: true` → `hasPerModelQuota()`
  mengembalikan `true`), ia mengenakan **tempoh bertenang sambungan sementara** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, tidak pernah status terminal
  (`credits_exhausted`/`banned`/`expired`) — supaya sambungan itu pulih sendiri
  sebaik sahaja tempoh bertenang tamat, bukannya memerlukan tetapan semula
  kredential secara manual. Dilangkau untuk sambungan dengan `disableCooling: true`
  (#2997): pengecualian itu jatuh melalui ke sekatan per-model sebaliknya
  (satu kompromi yang didokumentasikan — lihat ulasan kod di atas cawangan tersebut).
- **Penghalaan kombo permintaan-sama** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): pengawal yang sama menandakan
  sambungan ke dalam set dalam ingatan `exhaustedConnections`, dengan kunci
  `${provider}:${connectionId}`. Ini hanya melangkau sasaran PERMINTAAN-SAMA yang
  tinggal yang _sendiri sudah membawa `connectionId` yang tepat itu_ pada objek
  sasarnya sendiri (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider && connectionId)`
  sebelum carian `exhaustedConnections`) — kombo senarai-model biasa, di mana
  sasaran seiring tidak membawa `connectionId` terpaku mereka sendiri dan satu
  hanya diselesaikan setiap penghantaran daripada pengepala
  `X-OmniRoute-Selected-Connection-Id` respons, tidak pernah mencapai padanan
  kunci itu. Untuk kes biasa itu, perlindungan sebenar terhadap kaki yang tinggal
  menggunakan semula akaun yang baru sahaja kehabisan itu BUKANLAH Set ini — ia
  ialah lapisan persisten di atas (`rateLimitedUntil` sambungan kini berada di masa
  hadapan) digabungkan dengan pengawal yang sama ini menyekat
  `transientRateLimitedProviders` untuk kegagalan itu (lihat "Reka bentuk dua
  peringkat" dan ulasan kod pada cawangan `isAgentrouterConnectionQuotaScope` dalam
  `targetExhaustion.ts`): dengan Set itu dibiarkan tidak ditanda, benaran paksa
  `allowRateLimitedConnection` dalam `combo.ts` (`open-sse/services/combo.ts:1005-1013`,
  `:2734-2738`) TIDAK berkuat kuasa untuk kaki-kaki pembekal yang tinggal, jadi
  penapis `rateLimitedUntil` pemilihan kredential (`src/sse/services/auth.ts:1238`)
  dihormati seperti biasa dan kaki yang tinggal sama ada memilih sambungan
  agentrouter lain yang masih layak atau gagal tanpa kredential tersedia — ia
  tidak memaksa masuk semula ke sambungan yang baru sahaja dikenakan tempoh
  bertenang oleh cawangan ini.

### Reka bentuk dua peringkat: pernyataan semula status, kemudian pengelasan

Pernyataan semula status (`upstreamStatusRestatement.ts`) dan peraturan
pengelasan pembekal (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ialah pendaftar berasingan yang kedua-duanya berkunci
pada id pembekal dan penanda teks, tetapi ia dijalankan di tempat berbeza dan
mempunyai tujuan berbeza: pernyataan semula menulis semula status HTTP lebih
awal dalam `chatCore.ts`; peraturan pengelasan memilih `reason` sandaran dan
mengunci `scope` (`model` / `provider` / `connection`) di dalam
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Peraturan pengelasan hanya melihat **teks** ralat penuh (diperlukan untuk
memadankan penanda badan seperti `额度不足`) untuk pembekal yang disenaraikan
dalam senarai benar `FULL_TEXT_RULE_PROVIDERS` dalam `providerErrorRules.ts` —
buat masa ini hanya `"agentrouter"`. Untuk setiap pembekal **katalog terbina
dalam** yang lain, `checkFallbackError` menyerahkan kepada
`getProviderErrorRuleMatch` hanya ralat berstruktur (`{code, type}`), yang
memadai untuk peraturan berasaskan pengepala/status/kod tetapi buta terhadap
penanda teks badan. Pembantu `resolveRuleMatchBody()` melakukan pemilihan ini:
teks ralat penuh untuk pembekal dalam senarai benar, ralat berstruktur
sebaliknya. Menambah pembekal **terbina dalam** ke `FULL_TEXT_RULE_PROVIDERS`
ialah penyertaan eksplisit setiap pembekal — ia wujud supaya laluan lalai untuk
setiap pembekal yang tiada dalam senarai kekal tidak berubah bait demi bait.

`scope` sesuatu peraturan (`model` / `provider` / `connection`) ialah
penyertaan berasingan daripada `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError`
hanya memaparkannya sebagai `fallbackResult.ruleScope`, dan pengguna hiliran
hanya menghormatinya sebagai sesuatu selain label maklumat, untuk pembekal
dalam senarai benar `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dalam fail yang sama
(dikawal melalui `honorsRuleLockScope()` — hari ini hanya `"agentrouter"`).
Lihat "Ralat kuota yang dinyatakan semula" di atas untuk apa yang sebenarnya
dilakukan oleh padanan `scope: "connection"` sebaik sahaja sesebuah pembekal
berada dalam senarai benar itu.

**#11104 — peraturan yang diisytiharkan pengendali memintasi kedua-dua senarai
benar.** Pengendali boleh mengisytiharkan peraturan setiap pembekal semasa
masa jalan melalui `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) tanpa
mengedit fail ini. Mengawal peraturan pengendali di belakang
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — senarai benar
yang bertujuan melindungi tingkah laku **lalai** peraturan katalog terbina
dalam — akan menjadikan mekanisme tetapan lengai untuk setiap pembekal kecuali
yang sudah disenaraikan di situ, memandangkan pengisytiharan peraturan itu
sendiri sudah merupakan penyertaan eksplisit pengendali. `resolveRuleMatchBody()`
dan `honorsRuleLockScope()` kedua-duanya menyemak `hasOperatorRuleForProvider()`
terlebih dahulu: pembekal dengan peraturan pengendali mendapat teks ralat mentah
dan `scope` yang diisytiharkannya dihormati, tanpa mengira sama ada ia turut
muncul dalam mana-mana senarai benar.

**Jurang yang diketahui — `providerRuleRegistry` tidak pernah dirujuk untuk
HTTP 400.** Cawangan `BAD_REQUEST` dalam `checkFallbackError` mengelaskan status
400 sepenuhnya melalui tatasusunan coraknya sendiri
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, dll. dalam
`accountFallback.ts`) dan kembali sebelum cawangan
`configuredRule`/`getProviderErrorRuleMatch` di atasnya dicapai. Peraturan
katalog terbina dalam (atau peraturan pengendali) dengan `status: 400` adalah
sah dari segi sintaks tetapi tidak akan pernah dicetuskan. Tiada peraturan
sedia ada yang menyasarkan 400 hari ini, jadi tiada apa-apa dalam pengeluaran
yang terjejas — tetapi peraturan 400 pada masa hadapan memerlukan cawangan ini
diubah terlebih dahulu, yang merupakan perubahan lebih besar daripada sekadar
menambah peraturan (ia mengelaskan semula 400 untuk setiap pembekal yang sudah
bergantung pada tingkah laku tatasusunan corak) dan berada di luar skop untuk
penambahan peraturan pembekal tunggal.

### Menambah gateway baharu yang salah menyatakan kuota

1. Daftarkan satu tatasusunan peraturan dalam `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Pastikan `textMarkers`
   khusus untuk penyedia; jangan sekali-kali menggunakan semula frasa Inggeris
   generik yang bercanggah dengan `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Secara pilihan, daftarkan peraturan pengelasan dalam
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) untuk
   memilih skop kunci yang betul (`connection` untuk kuota seluruh akaun,
   `model` untuk ralat setiap model). Langkah ini hanya berkuat kuasa dalam
   pengeluaran untuk penyedia yang peraturannya memerlukan teks ralat penuh
   (penanda badan): tambahkan id penyedia ke `FULL_TEXT_RULE_PROVIDERS` dalam
   fail yang sama — jika tidak, `checkFallbackError` hanya akan menyerahkan
   ralat berstruktur `{code, type}` kepada peraturan itu dan peraturan teks
   badan tidak akan pernah sepadan dengan trafik langsung. Peraturan yang
   sepadan semata-mata pada `status`/`headers` (seperti milik Opencode atau
   Minimax) tidak memerlukan opt-in ini. Secara berasingan, jika peraturan itu
   mengisytiharkan `scope: "connection"` dan tujuannya ialah penyejukan
   seluruh sambungan yang sebenar serta langkau kombo bagi permintaan yang
   sama (bukan sekadar label bermaklumat), tambahkan id penyedia ke
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dalam fail yang sama — inilah yang
   mengawal penggunaan gaya `isAgentrouterConnectionQuotaScope()` dalam
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) dan
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); tanpanya, `scope` masih
   mengalir melalui `fallbackResult.ruleScope` tetapi tiada apa yang bertindak
   ke atasnya.
3. Tambahkan ujian unit yang meniru `tests/unit/upstream-status-restatement.test.ts`
   dan `tests/unit/agentrouter-error-rules.test.ts` (termasuk pengawal
   not-permanent / not-creditsExhausted, dan — jika penyedia memerlukan
   senarai benar — ujian yang mengesahkan `resolveRuleMatchBody()`
   mengembalikan teks penuh hanya untuk penyedia itu).

Tiada perubahan pada `chatCore.ts`, `classifyError`, atau kombo diperlukan.

#### Kunci berbucket egress (#10880)

Penyedia dalam `EGRESS_BUCKETED_LOCK_PROVIDERS` (keluarga opencode) dilayan
sebagai upstream berbucket IP (peringkat percuma opencode adalah berbucket IP,
bukan berbucket akaun — lihat #9611): status-429 yang dikelaskan sebagai
`quota_exhausted` **atau** `rate_limit_exceeded` menyejukkan setiap sambungan
keluarga tersenarai benar yang IP egress terakhir diketahuinya sepadan dengan
milik sambungan yang gagal, sebelum putaran sempat mencubanya
— mengelakkan N-1 panggilan upstream yang pasti gagal (corak yang sama seperti #10460/#10525).
`rate_limit_exceeded` disertakan secara sengaja: pada laluan
`markAccountUnavailable`, peraturan khusus opencode tidak pernah sepadan
(tiada headers/body diserahkan kepada `checkFallbackError`, opencode tiada
dalam `FULL_TEXT_RULE_PROVIDERS`), jadi 429 yang badannya membawa teks kuota
langganan ("monthly usage limit reached") dikelaskan sebagai `quota_exhausted`
oleh fallback teks kuota (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; penyejukan 1h) sebelum peraturan `status_429` sempat
dicapai — manakala 429 tanpa teks kuota (pengehadan kadar biasa) dikelaskan
melalui peraturan `status_429` sebagai `rate_limit_exceeded` dan masih
menyejukkan keluarga IP itu. Bagi penyedia tersenarai benar, had kadar
berbucket IP adalah isyarat yang sama seperti kuota yang telah kehabisan.
Batasan sebenar:

- **Usaha terbaik**: kunci menyelesaikan `egress_ip` terakhir yang diketahui bagi sambungan daripada `proxy_logs` (tetingkap 24 jam, segerak, tanpa cache). Cache sejuk (IP egress tidak pernah dikesan) atau tiada baris → sambungan yang gagal masih disejukkan oleh cabang ini (direkodkan seperti hari ini), hanya tiada sibling yang dikunci.
- **Tidak pernah terminal**: cooldown ialah tetingkap kuota yang diperbaharui semula (`testStatus: "unavailable"`); keadaan kekal tidak pernah diperoleh daripada isyarat peringkat IP. Sambungan `disableCooling` melangkau cabang ini sepenuhnya.
- **Granulariti kunci berubah untuk keluarga tersenarai putih**: ini ialah perubahan skop, bukan sekadar pengoptimuman sibling. opencode ialah penyedia `passthroughModels`, jadi sebelum cabang ini, 429 menghasilkan penguncian per-MODEL; kini ia menghasilkan cooldown sambungan — termasuk untuk operator yang menjalankan satu sambungan tanpa sebarang sibling langsung. Itulah granulariti yang telah diisytiharkan betul oleh jadual peraturan opencode (`scope: "connection"`, `providerErrorRules.ts`), tetapi tidak pernah dihormati setakat ini kerana opencode tiada dalam `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Cabang ini menulis sendiri cooldown + `backoffLevel` sambungan yang gagal, mencerminkan cabang agentrouter berskop sambungan, kemudian kembali — blok per-model dan laluan generik di bawah tidak pernah dicapai.
- **Combo disertakan**: seperti cabang agentrouter, skop ini sengaja mengabaikan penurunan taraf `persistUnavailableState`/`isCombo` yang dikenakan oleh pemanggil combo pada 429. Penguncian per-model bukan bentuk skop ini yang lebih lemah, ia unit yang salah: ia tidak menyatakan apa-apa tentang IP yang telah kehabisan, jadi putaran combo akan terus membakar satu panggilan yang pasti gagal bagi setiap sibling.
- **Keselamatan sibling**: sibling yang sudah terminal (banned/credits_exhausted) atau sudah berada dalam cooldown yang lebih lama tidak pernah ditulis ganti.
- **Senarai putih eksklusif**: pelebaran `EGRESS_BUCKETED_LOCK_PROVIDERS` ialah keputusan eksplisit pemilik; tiada pendawaian generik (corak #10334/#10419). Pertanyaan sibling mengikat senarai putih yang sama dan bukannya mengulanginya sebagai literal SQL, jadi pelebarannya kekal sebagai perubahan satu baris.
- **Putaran IP egress, kedua-dua arah**: tetingkap carian (24 jam) jauh lebih luas daripada TTL cache IP egress (5 minit), jadi "IP terakhir diketahui" ialah sejarah, bukan keadaan semasa. Jika proksi sambungan berputar dalam tetingkap itu, kunci mungkin **terlepas** IP yang benar-benar dikongsi (IP yang direkodkan ialah IP baharu yang belum kehabisan) — dan secara simetrinya ia mungkin **menyejukkan sibling yang telah berputar keluar** daripada IP yang kehabisan itu. Kes kedua menyebabkan sibling itu kehilangan satu tetingkap cooldown; kedua-duanya ialah had usaha terbaik yang diterima bagi carian berasaskan sejarah.
- **Kos**: dua imbasan terbatas `proxy_logs` (ditapis mengikut tetingkap melalui `idx_pl_timestamp`), hanya pada kekerapan 429. Tiada indeks baharu (migrasi 134 YAGNI). Diukur pada salinan DB trafik sebenar yang bersaiz sederhana; instans dengan throughput tinggi memegang lebih banyak baris secara berkadar dalam tetingkap yang sama.

---

## Ciri Daya Tahan Lain

- **21 strategi penghalaan** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — lihat [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Penghalaan peka set semula** (v3.8.0) — mengutamakan sambungan mengikut masa set semula kuota.
- **Degradasi mod latar belakang** — Responses API `background: true` didegradasikan kepada segerak dengan amaran.
- **Pengesanan had alat dinamik** — menarik balik daripada pembekal apabila had bilangan alat dicapai.
- **Fallback kecemasan** — dikawal oleh `OMNIROUTE_EMERGENCY_FALLBACK`; operator boleh mengatasinya daripada halaman Feature Flags tanpa mula semula.

---

## Penyahpepijatan

- Combo berwajaran menjawab `503 all_targets_cooling_down` (`Retry-After` ditetapkan, `diagnostics.excluded` menyenaraikan setiap sasaran dengan `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool telah dikonfigurasikan dan disambungkan, setiap sasaran hanya dikecualikan oleh pemasa daya tahan; amaran `[COMBO] Weighted selection: every target excluded before dispatch — …` menyatakan sebab dan baki saat. `404 no_executable_targets` daripada combo yang sama bermakna tiada pemasa daya tahan yang terlibat (tiada apa untuk dijalankan, atau setiap akaun gagal ujian ketersediaan). Dibina dalam `open-sse/services/combo/pinRecovery.ts` daripada pengecualian yang dikumpulkan dalam `targetResolution.ts`.
- Semua kunci untuk sesebuah pembekal dilangkau → semak kedua-dua keadaan pemutus litar DAN `rateLimitedUntil`/`testStatus` setiap sambungan.
- Pembekal dikecualikan secara kekal selepas tetingkap set semula → kod membaca `state` mentah dan bukannya `getStatus()`/`canExecute()`.
- Satu kunci gagal, yang lain sepatutnya berfungsi → utamakan cooldown sambungan berbanding pemutus litar.
- Hanya satu model gagal → utamakan lockout model berbanding cooldown sambungan.
- Keadaan sepatutnya pulih sendiri tetapi tidak → semak cap masa pada masa hadapan + laluan baca yang menyegarkan keadaan yang luput. Status kekal memerlukan perubahan manual.

---

## Keadaan masa jalan — rujukan pantas ejen

> Dipindahkan verbatim daripada `AGENTS.md` → "Resilience Runtime State" (PR #12743) supaya panduan
> ejen kekal di bawah bajet konteks 40k. Ia adalah paparan ringkas bersemuka ejen bagi
> bahagian di atas; bahagian bernombor kekal sebagai rujukan penuh.

OmniRoute mempunyai tiga mekanisme kegagalan sementara yang berkaitan tetapi berbeza. Kekalkan
skopnya berasingan semasa menyahpepijat tingkah laku penghalaan. Lihat
[gambar rajah daya tahan 3 lapisan](../diagrams/exported/resilience-3layers.svg)
(sumber: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
untuk peta sepintas lalu.

### Pemutus Litar Pembekal

**Skop**: keseluruhan pembekal, cth. `glm`, `openai`, `anthropic`.

**Tujuan**: menghentikan penghantaran trafik kepada pembekal yang berulang kali gagal di
peringkat upstream/perkhidmatan, supaya satu pembekal yang tidak sihat tidak melambatkan setiap permintaan.

**Implementasi**:

- Kelas teras: `src/shared/utils/circuitBreaker.ts`
- Pendawaian gate/perlaksanaan chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status masa jalan: `src/app/api/monitoring/health/route.ts`
- Pembungkus dikongsi: `open-sse/services/accountFallback.ts`
- Jadual keadaan berterusan: `domain_circuit_breakers`

**Keadaan** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: trafik biasa dibenarkan.
- `DEGRADED`: jalur amaran awal — kegagalan telah melepasi ambang degradasi tetapi belum lagi
  ambang pemutus; trafik masih mengalir, papan pemuka memaparkan amaran. Ujian sambungan
  yang sah atau tetingkap tenang tanpa kegagalan baharu mengembalikannya kepada `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` mempunyai tetingkap tersebut).
- `OPEN`: pembekal disekat buat sementara; pemanggil menerima respons provider-circuit-open
  atau penghalaan combo melangkau ke sasaran lain.
- `HALF_OPEN`: tamat masa set semula telah berlalu; benarkan permintaan ujian. Kejayaan menutup
  pemutus, kegagalan membukanya semula.

**Lalai** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, digunakan melalui
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` dalam `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` dalam `src/sse/handlers/chatHelpers.ts`). Pemutus seluruh
pembekal berjalan pada `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil  | terdegradasi pada | terbuka pada (`circuitBreakerThreshold`) | set semula (`circuitBreakerReset`) |
| ------- | ----------------: | ---------------------------------------: | ---------------------------------: |
| OAuth   |               `5` |                                      `8` |                              `60s` |
| API key |               `7` |                                     `12` |                              `30s` |
| Local   |       (diperoleh) |                                      `2` |                              `15s` |

`PROVIDER_PROFILES` juga mentakrifkan `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) dan `providerCooldownMs` (5/10/1 min): ini menggerakkan
**pintu tetingkap Provider Cooldown global opt-in** (`PROVIDER_COOLDOWN_ENABLED`, lalai
mati) — entri peringkat pembekal dalam `open-sse/services/providerCooldownTracker.ts` hanya dikira
sebagai menyejuk selepas `providerFailureThreshold` kegagalan dalam `providerFailureWindowMs`, dan kemudian
menyejuk selama `providerCooldownMs`. Ia BUKAN ambang pemutus langsung — jangan laraskannya
dengan menjangkakan tingkah laku pemutus. Setiap lalai boleh ditukar melalui
pembolehubah persekitaran `OMNIROUTE_PROVIDER_BREAKER_*` dan `OMNIROUTE_CIRCUIT_BREAKER_*`;
jadual rujukan yang tepat mengikut masa jalan terdapat dalam `docs/architecture/RESILIENCE_GUIDE.md`.

Hanya status kegagalan peringkat pembekal yang harus mengaktifkan pemutus pembekal:

```ts
(408, 500, 502, 503, 504);
```

Jangan aktifkan pemutus seluruh pembekal untuk ralat akaun/kunci/model biasa seperti kebanyakan
kes `401`, `403`, atau `429`. Kes tersebut biasanya tergolong dalam cooldown sambungan atau
lockout model. `403` pembekal kunci API generik sepatutnya boleh pulih melainkan ia diklasifikasikan
sebagai ralat pembekal/akaun terminal.

Breaker menggunakan pemulihan malas (lazy recovery), bukan pemasa latar belakang. Apabila `OPEN` tamat tempoh, bacaan seperti `getStatus()`, `canExecute()`, dan `getRetryAfterMs()` menyegarkan semula keadaan kepada `HALF_OPEN`, supaya papan pemuka dan pembina calon kombo tidak terus mengecualikan penyedia yang telah tamat tempoh selama-lamanya.

### Cooldown Sambungan

**Skop**: satu sambungan/akaun/kunci penyedia.

**Tujuan**: melangkau buat sementara satu kunci/akaun yang bermasalah sambil membenarkan sambungan lain untuk penyedia yang sama terus melayani permintaan.

**Implementasi**:

- Laluan tulis/kemas kini: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pemilihan/penapisan akaun: `src/sse/services/auth.ts::getProviderCredentials...`
- Pengiraan cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Tetapan: `src/lib/resilience/settings.ts`

Medan penting pada sambungan penyedia:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Semasa pemilihan akaun, sesebuah sambungan akan dilangkau apabila:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown juga bersifat malas: apabila `rateLimitedUntil` telah berlalu, sambungan itu menjadi layak semula. Selepas penggunaan yang berjaya, `clearAccountError()` mengosongkan `testStatus`, `rateLimitedUntil`, medan ralat, dan `backoffLevel`.

Kelakuan cooldown sambungan lalai:

- Cooldown asas OAuth: `5s`.
- Cooldown asas kunci API: `3s`.
- `429` kunci API harus mengutamakan petunjuk cuba semula hulu (`Retry-After`, pengepala reset, atau teks reset yang boleh dihuraikan) apabila tersedia.
- Kegagalan boleh pulih yang berulang menggunakan backoff eksponen:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Pengawal anti-thundering-herd menghalang kegagalan serentak pada sambungan yang sama daripada memanjangkan cooldown berulang kali atau menokok `backoffLevel` dua kali.

Keadaan terminal bukanlah cooldown. `banned`, `expired` (yang menjadi terminal hanya selepas N percubaan semula terhad melalui `EXPIRED_RETRY_MAX`), dan `credits_exhausted` dimaksudkan untuk kekal tidak tersedia sehingga kelayakan/tetapan berubah atau operator menetapkannya semula. Jangan tulis ganti keadaan terminal dengan keadaan cooldown sementara.

### Penguncian Model

**Skop**: penyedia + sambungan + model.

**Tujuan**: mengelakkan pemadaman keseluruhan sambungan apabila hanya satu model tidak tersedia atau terhad kuota untuk sambungan tersebut.

Contoh:

- Penyedia kuota setiap model yang mengembalikan `429`.
- Penyedia tempatan yang mengembalikan `404` untuk satu model yang tiada.
- Kegagalan kebenaran mod/model khusus penyedia seperti mod Grok terpilih.

Penguncian model terletak dalam `open-sse/services/accountFallback.ts` dan membenarkan sambungan yang sama terus melayani model lain.

### Panduan Penyahpepijatan

- Jika semua kunci untuk sesebuah penyedia dilangkau, periksa kedua-dua keadaan breaker penyedia dan `rateLimitedUntil`/`testStatus` setiap sambungan.
- Jika sesebuah penyedia kelihatan dikecualikan secara kekal selepas tetingkap reset, semak sama ada kod membaca `state` mentah dan bukannya menggunakan `getStatus()`/`canExecute()`.
- Jika satu kunci penyedia gagal tetapi yang lain sepatutnya berfungsi, utamakan cooldown sambungan berbanding breaker penyedia.
- Jika hanya satu model gagal, utamakan penguncian model berbanding cooldown sambungan.
- Jika sesuatu keadaan sepatutnya pulih sendiri, ia perlu mempunyai cap masa masa depan/had masa reset dan laluan bacaan yang menyegarkan keadaan yang tamat tempoh. Status kekal memerlukan perubahan kelayakan atau konfigurasi secara manual.

---

## Pengecapan Jari TLS & Stealth

Stealth khusus penyedia (JA3/JA4, CCH, pengeliruan) didokumentasikan secara berasingan — lihat `docs/security/STEALTH_GUIDE.md` (git; tidak dikompilkan ke dalam `/docs`).

---

## Ujian ketahanan (Fasa 8 · Blok C)

Selain ujian unit untuk logik ketahanan, tiga ujian menguji runtime di bawah
keadaan tekanan/kegagalan sebenar (semuanya integrasi/nightly — tiada yang menyekat PR):

| Ujian       | Keterangan                                                                                                                                                                                        | Jalankan                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Nod fake-upstream menyuntik kependaman/reset/timeout/503 sebenar; mengesahkan bahawa pemutus litar membuka/pulih dan `checkFallbackError` mengelaskan 503 sebagai fallback yang boleh dipulihkan. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 strim setiap `createSSEStream` di bawah `--expose-gc`; gagal jika heap berkembang melebihi had siling (pengawal OOM #3069).                                                                  | `npm run test:heap`                      |
| k6 soak     | Beban berterusan terhadap `/api/monitoring/health`; ambang p95/ralat.                                                                                                                             | `k6 run tests/load/k6-soak.js` (nightly) |

Diatur oleh `.github/workflows/nightly-resilience.yml` (cron + dispatch). Dalam
`test:integration` lalai, chaos dan heap akan melangkau secara automatik (tanpa `RUN_CHAOS_INT`/`--expose-gc`).

---

## Lihat Juga

- [Panduan Seni Bina](./ARCHITECTURE.md) — Seni bina sistem dan komponen dalaman
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Penyedia, kombo, integrasi CLI
- [Enjin Auto-Combo](../routing/AUTO-COMBO.md) — Pemarkahan 16 faktor, pek mod
