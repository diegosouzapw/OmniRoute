# Router Backends & Embedded Services — architecture contract (ADR) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Diterima · **Konteks:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Kontrak:** `domain/routing/routerBackends.ts`
> (registri bertipe — kode disertakan dalam [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

ADR ini menetapkan hubungan antara mesin `ts` (native), `bifrost`, `cliproxy`, `9router`, dan mesin yang kompatibel dengan VibeProxy, sehingga kontributor tidak lagi mencampuradukkan dua hal yang berbeda secara arsitektural. Dokumen ini menetapkan registri bertipe yang diperkenalkan oleh pekerjaan router-backend-registry sebagai satu-satunya sumber kebenaran untuk model tersebut.

## Perbedaan utama — dua sumbu ortogonal

Peran mesin dijelaskan oleh **dua sumbu independen**, yang dikodekan bersama dalam `RouterBackendDefinition` milik registri:

1. **Siklus hidup** (`RouterBackendLifecycle`) — _bagaimana mesin dijalankan_:
   - `in-process` — berjalan di dalam proses Node OmniRoute (pipeline TS native).
   - `supervised` — proses anak lokal yang diinstal/dimulai/dihentikan/diperiksa kesehatannya oleh OmniRoute melalui `ServiceSupervisor`, lalu digunakan sebagai koneksi penyedia.
   - `external` — endpoint HTTP yang menjadi tujuan penerusan OmniRoute tetapi **tidak** dikelola oleh OmniRoute (dikonfigurasi melalui URL dasar env).
   - `disabled` — terdaftar tetapi tidak dapat dipilih.
2. **Sumbu pemilihan** (backend perutean relay) — _apakah relay meneruskan permintaan kepadanya_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` dalam
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Kesalahan yang harus dihindari: memperlakukan "layanan tertanam" dan "backend perutean" sebagai satu daftar. Keduanya berbeda. Mesin `supervised` (9router/cliproxy) adalah **koneksi penyedia yang digunakan oleh pipeline native**, bukan backend alternatif untuk penerusan relay. `bifrost` adalah kebalikannya — backend penerusan relay yang (secara historis) hanya bersifat `external`.

## Registri — satu-satunya sumber kebenaran

Kontrak `domain/routing/routerBackends.ts` (kode disertakan dalam [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) mendeklarasikan setiap mesin satu kali, beserta siklus hidup, kapabilitas, identitas layanan, port default, konfigurasi kesehatan, dan dukungan telemetrinya. Konsumen mencari mesin melalui `getRouterBackend(id)`, `listRouterBackends()`, dan `listRouterBackendsByCapability(cap)`, alih-alih menangani setiap sidecar secara khusus.

| Backend     | Siklus hidup | Layanan (sumbu A) | Backend relay (sumbu B) | Kesehatan     | Port default |
| ----------- | ------------ | ----------------- | ----------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —                 | `ts` (native)           | —             | —            |
| `bifrost`   | `external`¹  | —¹                | `bifrost` / `auto`      | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`        | — (penyedia)            | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`         | — (penyedia)            | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —                 | — (adapter penyedia)    | `/v1/models`  | —            |

¹ Promosi Bifrost menjadi layanan tertanam `supervised` (dapat diinstal/dimulai dari `/api/services/bifrost/`) dilacak dalam [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); hingga perubahan tersebut digabungkan, Bifrost hanya bersifat `external` (hanya dapat dijangkau melalui `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`, `oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) memungkinkan pemanggil memfilter berdasarkan kemampuan aktual mesin, alih-alih mengodekan cabang per ID secara langsung.

## Sumbu A — layanan tertanam (sisi proses yang diawasi)

- **Registri proses yang diawasi:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (saat ini: `9router`, `cliproxy`).
- **Pemilik siklus hidup:** `src/lib/services/ServiceSupervisor.ts` — `start()` menjalankan
  proses anak, menunggu `waitForHealthy()`, serta menyalurkan stdout/stderr ke buffer cincin;
  `stop()` SIGTERM→SIGKILL; semuanya diserialisasi dengan sebuah kunci.
- **Gabungan status** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, ditambah
  `HealthState = healthy | unhealthy | unknown` yang bersifat ortogonal.
- **Mengapa proses terpisah (bukan SDK dalam proses)?** Isolasi proses memungkinkan
  install/start/stop/health/logs dikontrol secara independen untuk setiap sidecar dan memungkinkan
  perlindungan loopback untuk pembuatan proses diterapkan. Pemodelan adaptor dalam proses merupakan pekerjaan mendatang —
  tanda kapabilitas `native-hot-path` adalah tempat hal tersebut akan dinyatakan.

### Kontrak rute siklus hidup (`/api/services/<tool>/…`)

Kode status bersifat **spesifik terhadap status/verba/path berdasarkan desain** — ini adalah kontraknya, bukan
inkonsistensi:

| Panggilan                    | Kondisi                             | Status                               |
| ---------------------------- | ----------------------------------- | ------------------------------------ |
| `POST .../start`             | layanan `not_installed`             | **409** (prasyarat)                  |
| `POST .../stop`              | sudah dihentikan                    | **200** (tanpa operasi, idempoten)   |
| `GET .../status`             | OK                                  | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | kegagalan pembuatan proses          | **503** (sementara)                  |
| `GET .../status`, `.../stop` | galat yang tidak tertangani         | **500**                              |
| `GET /api/services/<x>/logs` | alat `<x>` tidak dikenal            | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` tidak ada   | **403** (khusus 9router)             |
| **semua** `/api/services/*`  | pemanggil bukan loopback/LAN privat | **403 LOCAL_ONLY**                   |

Semua isi respons galat dibentuk oleh `createErrorResponse()` →
`{ error: { message, type }, requestId }`, dengan `type` yang diturunkan dari status
(`500→server_error`, `404→not_found`, `409→conflict`, selain itu `invalid_request`) dan merupakan
pembeda yang dapat ditindaklanjuti oleh mesin. Pesan telah disanitasi sebelumnya
(`sanitizeErrorMessage()`, Aturan Keras #12).

**Perlindungan loopback** adalah sumber paling umum dari `403`: `/api/services/` berada dalam
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) dan
`src/server/authz/policies/management.ts` menolak setiap pemanggil non-loopback / non-LAN-privat
**sebelum autentikasi**, karena rute-rute ini membuat proses anak (Aturan Keras 15
dan 17). Mengaksesnya melalui tunnel publik menghasilkan `403` berdasarkan desain.

## Sumbu B — backend perutean relay (sisi dispatch)

Hanya path proxy relay `/api/v1/relay/chat/completions` yang memilih backend
dispatch; antarmuka utama `/api/v1/chat/completions` tidak pernah menggunakan
`routingBackend.ts`.

- **Pemilihan** (`resolveRelayRoutingBackend`): satu toggle env global —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Jika tidak ditetapkan, gunakan `auto` ketika Bifrost dikonfigurasi+diaktifkan, selain itu `ts`.
- **Perilaku:**
  - `bifrost` (dipaksakan): kegagalan Bifrost → `502` mutlak, tanpa fallback.
  - `auto`: coba Bifrost, jika terjadi kegagalan/cooldown, lanjutkan secara diam-diam ke implementasi native.
  - `ts` / setelah fallback: pipeline penerjemah/pelaksana `open-sse` native.
- **Cooldown:** cooldown kegagalan per-`baseUrl` di `bifrostCooldown.ts`.

Saat ini, pemilihan bersifat **semua-atau-tidak-sama-sekali pada tingkat relay** — tidak ada pertukaran engine
per penyedia atau per permintaan pada `release/v3.8.43`. Gate per permintaan sedang ditambahkan
melalui pekerjaan manifes sidecar
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifes +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
yang memungkinkan `auto` merutekan hanya penyedia yang memenuhi syarat manifes melalui Bifrost.

## Integrasi dashboard

Dashboard layanan melakukan polling `GET /api/services/<tool>/status` setiap 5 detik melalui
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
yang mengembalikan `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Tidak ada penyedia konteks ketersediaan bersama —
setiap komponen memanggil hook untuk masing-masing alat. Saat `!res.ok`, hook saat ini menampilkan
`HTTP <status>` tanpa keterangan; pemetaan kolom `error.type` ke penjelasan yang mudah dipahami
merupakan peningkatan UX yang sedang dilacak, bukan perubahan kontrak.

## Konsekuensi

- Mesin baru didaftarkan satu kali di `ROUTER_BACKENDS`; konsumen mendapatkannya melalui kueri
  kapabilitas tanpa cabang baru per ID.
- "Apakah ini layanan atau backend perutean?" dijawab oleh kolom `lifecycle`, bukan
  berdasarkan daftar tempat suatu ID kebetulan muncul.
- Supervisi Bifrost (#5817) dan migrasi hot path native (#5670) dibangun berdasarkan
  kontrak bersama ini, alih-alih memperlakukan setiap sidecar sebagai kasus khusus.
