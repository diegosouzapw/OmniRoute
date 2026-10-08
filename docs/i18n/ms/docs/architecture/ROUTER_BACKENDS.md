# Router Backends & Embedded Services — architecture contract (ADR) (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Diterima · **Konteks:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Kontrak:** `domain/routing/routerBackends.ts`
> (daftar berjenis — kod disertakan dalam [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

ADR ini menetapkan cara enjin `ts` (asli), `bifrost`, `cliproxy`, `9router`, dan
yang serasi dengan VibeProxy saling berkaitan, supaya penyumbang tidak lagi
mencampuradukkan dua perkara yang berbeza dari segi seni bina. Ia mendokumenkan
daftar berjenis yang diperkenalkan oleh kerja router-backend-registry sebagai
satu-satunya sumber kebenaran untuk model tersebut.

## Perbezaan teras — dua paksi ortogon

Peranan sesuatu enjin diterangkan oleh **dua paksi bebas**, yang dikodkan bersama-sama dalam
`RouterBackendDefinition` daftar tersebut:

1. **Kitar hayat** (`RouterBackendLifecycle`) — _cara enjin dijalankan_:
   - `in-process` — berjalan dalam proses Node OmniRoute (saluran paip TS asli).
   - `supervised` — proses anak setempat yang dipasang/dimulakan/dihentikan/diperiksa tahap kesihatannya
     oleh OmniRoute melalui `ServiceSupervisor`, kemudian digunakan sebagai sambungan penyedia.
   - `external` — titik akhir HTTP yang menerima penghantaran daripada OmniRoute tetapi **tidak** diuruskan
     olehnya (dikonfigurasikan melalui URL asas persekitaran).
   - `disabled` — didaftarkan tetapi tidak boleh dipilih.
2. **Paksi pemilihan** (bahagian belakang penghalaan geganti) — _sama ada geganti membuat penghantaran kepadanya_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` dalam
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Kesilapan yang perlu dielakkan: menganggap "perkhidmatan terbenam" dan "bahagian belakang penghalaan" sebagai satu
senarai. Kedua-duanya bukan perkara yang sama. Enjin `supervised` (9router/cliproxy) ialah **sambungan
penyedia yang digunakan oleh saluran paip asli**, bukannya bahagian belakang alternatif untuk penghantaran geganti.
`bifrost` pula adalah sebaliknya — bahagian belakang penghantaran geganti yang (dari segi sejarah)
hanya bersifat `external`.

## Daftar — satu-satunya sumber kebenaran

Kontrak `domain/routing/routerBackends.ts` (kod disertakan dalam
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) mengisytiharkan setiap enjin sekali, berserta
kitar hayat, keupayaan, identiti perkhidmatan, port lalai, konfigurasi kesihatan dan
sokongan telemetrinya. Pengguna mendapatkan enjin melalui `getRouterBackend(id)`,
`listRouterBackends()`, dan `listRouterBackendsByCapability(cap)` dan bukannya
mengendalikan setiap proses sampingan secara khusus.

| Bahagian belakang | Kitar hayat  | Perkhidmatan (paksi A) | Bahagian belakang geganti (paksi B) | Kesihatan     | Port lalai |
| ----------------- | ------------ | ---------------------- | ----------------------------------- | ------------- | ---------- |
| `ts`              | `in-process` | —                      | `ts` (asli)                         | —             | —          |
| `bifrost`         | `external`¹  | —¹                     | `bifrost` / `auto`                  | `/health`     | —          |
| `cliproxy`        | `supervised` | `cliproxy`             | — (penyedia)                        | `/v1/models`  | 8317       |
| `9router`         | `supervised` | `9router`              | — (penyedia)                        | `/api/health` | 20130      |
| `vibeproxy`       | `external`   | —                      | — (penyesuai penyedia)              | `/v1/models`  | —          |

¹ Penaiktarafan Bifrost kepada perkhidmatan terbenam `supervised` (boleh dipasang/dimulakan
daripada `/api/services/bifrost/`) dijejaki dalam
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); sehingga ia digabungkan,
Bifrost hanya bersifat `external` (boleh dicapai semata-mata melalui `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) membolehkan pemanggil
menapis berdasarkan perkara yang benar-benar boleh dilakukan oleh sesuatu enjin dan bukannya mengekod keras cabang bagi setiap ID.

## Paksi A — perkhidmatan terbenam (bahagian proses terselia)

- **Daftar proses terselia:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (kini: `9router`, `cliproxy`).
- **Pemilik kitar hayat:** `src/lib/services/ServiceSupervisor.ts` — `start()` mencetuskan
  proses anak, menunggu `waitForHealthy()`, menyalurkan stdout/stderr ke dalam penimbal gelang;
  `stop()` SIGTERM→SIGKILL; semuanya disirikan di bawah satu kunci.
- **Kesatuan keadaan** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, serta
  `HealthState = healthy | unhealthy | unknown` yang ortogon.
- **Mengapa proses berasingan (bukan SDK dalam proses)?** Pengasingan proses membolehkan
  pemasangan/permulaan/pemberhentian/kesihatan/log dikawal secara berasingan bagi setiap proses sampingan dan membolehkan
  pengadang pencetusan gelung balik digunakan. Pemodelan penyesuai dalam proses ialah kerja masa hadapan —
  bendera keupayaan `native-hot-path` ialah tempat perkara tersebut akan dinyatakan.

### Kontrak laluan kitar hayat (`/api/services/<tool>/…`)

Kod status adalah **khusus kepada keadaan/kata kerja/laluan mengikut reka bentuk** — ini ialah kontraknya, bukan
ketidakselarasan:

| Panggilan                       | Keadaan                                       | Status                               |
| ------------------------------- | --------------------------------------------- | ------------------------------------ |
| `POST .../start`                | perkhidmatan `not_installed`                  | **409** (prasyarat)                  |
| `POST .../stop`                 | sudah dihentikan                              | **200** (tiada operasi idempoten)    |
| `GET .../status`                | OK                                            | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`                | kegagalan pencetusan                          | **503** (sementara)                  |
| `GET .../status`, `.../stop`    | ralat tidak ditangkap                         | **500**                              |
| `GET /api/services/<x>/logs`    | alat `<x>` tidak diketahui                    | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`     | `X-Reveal-Confirm: yes` tiada                 | **403** (9router sahaja)             |
| **mana-mana** `/api/services/*` | pemanggil bukan gelung balik/LAN persendirian | **403 LOCAL_ONLY**                   |

Semua isi ralat dibentuk oleh `createErrorResponse()` →
`{ error: { message, type }, requestId }`, dengan `type` diperoleh daripada status
(`500→server_error`, `404→not_found`, `409→conflict`, selainnya `invalid_request`) dan merupakan
pembezalayan yang boleh diambil tindakan oleh mesin. Mesej telah disanitasi terlebih dahulu
(`sanitizeErrorMessage()`, Peraturan Tegas #12).

**Pengadang gelung balik** ialah punca paling lazim bagi `403`: `/api/services/` berada dalam
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) dan
`src/server/authz/policies/management.ts` menolak mana-mana pemanggil bukan gelung balik / bukan LAN persendirian
**sebelum pengesahan**, kerana laluan ini mencetuskan proses anak (Peraturan Tegas 15
dan 17). Mengaksesnya melalui terowong awam akan menghasilkan `403` mengikut reka bentuk.

## Paksi B — bahagian belakang penghalaan geganti (bahagian penghantaran)

Hanya laluan proksi geganti `/api/v1/relay/chat/completions` memilih bahagian belakang
penghantaran; permukaan utama `/api/v1/chat/completions` tidak pernah merujuk
`routingBackend.ts`.

- **Pemilihan** (`resolveRelayRoutingBackend`): satu togol persekitaran global —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Jika tidak ditetapkan, `auto` apabila Bifrost dikonfigurasikan+diaktifkan, jika tidak `ts`.
- **Tingkah laku:**
  - `bifrost` (dipaksa): kegagalan Bifrost → `502` mutlak, tiada sandaran.
  - `auto`: cuba Bifrost, jika berlaku kegagalan/tempoh bertenang, beralih secara senyap kepada natif.
  - `ts` / selepas sandaran: talian paip penterjemah/pelaksana `open-sse` natif.
- **Tempoh bertenang:** tempoh bertenang kegagalan per-`baseUrl` dalam `bifrostCooldown.ts`.

Pemilihan adalah **semua-atau-tiada pada peringkat geganti buat masa ini** — tiada pertukaran enjin
bagi setiap penyedia atau setiap permintaan pada `release/v3.8.43`. Get setiap permintaan sedang ditambahkan
oleh kerja manifes proses sampingan
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifes +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
yang membolehkan `auto` menghalakan hanya penyedia yang layak berdasarkan manifes melalui Bifrost.

## Integrasi papan pemuka

Papan pemuka perkhidmatan meninjau `GET /api/services/<tool>/status` setiap 5 saat melalui
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
yang mengembalikan `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Tiada penyedia konteks ketersediaan yang dikongsi —
setiap komponen memanggil cangkuk tersebut bagi setiap alat. Pada `!res.ok`, cangkuk itu pada masa ini hanya memaparkan
`HTTP <status>` tanpa penjelasan; pemetaan medan `error.type` kepada penjelasan yang mudah difahami pengguna ialah
penambahbaikan UX yang sedang dijejaki, bukannya perubahan kontrak.

## Kesan

- Enjin baharu didaftarkan sekali dalam `ROUTER_BACKENDS`; pengguna memperoleh enjin tersebut melalui pertanyaan
  keupayaan tanpa cabang baharu bagi setiap id.
- "Adakah ini perkhidmatan atau bahagian belakang penghalaan?" ditentukan oleh medan `lifecycle`, bukan
  berdasarkan senarai yang kebetulan mengandungi sesuatu id.
- Penyeliaan Bifrost (#5817) dan pemindahan laluan pantas natif (#5670) dibina berasaskan
  kontrak kongsi ini dan bukannya mengendalikan setiap sidecar sebagai kes khas.
