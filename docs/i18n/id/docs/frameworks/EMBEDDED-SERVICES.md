# Embedded Services (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Versi:** v3.8.44
> **Terakhir diperbarui:** 2026-09-09
> **Audiens:** Engineer yang menambahkan, memelihara, atau melakukan debug pada layanan tersemat (9Router, CLIProxyAPI, Mux, Bifrost, open-wa).

Layanan tersemat adalah alat sidecar proses yang diinstal secara lokal, yang diinstal, diawasi, dan
diekspos oleh OmniRoute sebagai target perutean kelas utama. Tidak seperti penyedia eksternal (yang diakses melalui internet
menggunakan kunci API), layanan tersemat berjalan pada mesin yang sama dengan OmniRoute dan berkomunikasi melalui loopback.

---

## Daftar Isi

1. [Ikhtisar](#1-overview)
2. [Arsitektur — 4 lapisan](#2-architecture--4-layers)
3. [Mesin status siklus hidup](#3-lifecycle-state-machine)
4. [Referensi API](#4-api-reference)
5. [Keamanan](#5-security)
6. [Menambahkan layanan tersemat baru](#6-adding-a-new-embedded-service)
7. [Pemecahan masalah](#7-troubleshooting)
8. [Pertanyaan Umum](#8-faq)

---

## 1. Ikhtisar

### Mengapa layanan tersemat?

Enam layanan disematkan:

| Layanan         | Paket npm                       | Port bawaan | Tujuan                                                                                                                                                                                                            |
| --------------- | ------------------------------- | :---------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                       |    20130    | Router AI yang dapat digunakan OmniRoute sebagai subpenyedia. Model diekspos sebagai `9router/{sub}/{model}`                                                                                                      |
| **CLIProxyAPI** | Biner rilis GitHub (`cliproxy`) |    8317     | Adaptor proksi lokal untuk alur autentikasi CLI Anthropic. Menyediakan perutean cadangan saat token OAuth kedaluwarsa                                                                                             |
| **Mux**         | `mux` (`mux server` tanpa UI)   |    8322     | Daemon orkestrasi agen lokal (coder/mux). Hanya dikelola siklus hidupnya — bukan target perutean (tanpa pemroksian LLM).                                                                                          |
| **Bifrost**     | `@maximhq/bifrost`              |    8080     | Backend relai gateway AI berbasis Go. Saat berjalan, dipilih secara otomatis oleh rute relai (`/v1/relay/`)                                                                                                       |
| **Dario**       | `@askalf/dario`                 |    3456     | Proksi langganan Claude — alternatif/failover untuk CLIProxyAPI bagi lalu lintas berformat Claude Code; kunci yang disuntikkan menjadi `DARIO_ADMIN_TOKEN` yang membatasi akses ke control plane OAuth `/admin/*` |
| **open-wa**     | `@open-wa/wa-automate`          |    8323     | Otomatisasi WhatsApp Web (Chromium tanpa UI melalui Puppeteer). Hanya dikelola siklus hidupnya — bukan target perutean.                                                                                           |

Keenamnya mengikuti model supervisi yang sama:

- OmniRoute menginstalnya di bawah `DATA_DIR/services/{name}/` (terisolasi dari `package.json` milik OmniRoute)
- OmniRoute menjalankan dan memantaunya sebagai proses anak
- OmniRoute menyuntikkan kunci API sementara ke lingkungan proses anak dan merotasinya tanpa waktu henti (jika berlaku)
- Semua rute pengelolaan (`/api/services/*`) bersifat **LOCAL_ONLY** — hanya dapat diakses dari loopback (aturan mutlak #17)

### Keputusan utama (dari rencana desain)

| Keputusan                         | Nilai                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| Akses dasbor ke UI native 9Router | Proksi balik di `/dashboard/providers/services/9router/embed/*`                              |
| Mekanisme instalasi               | `npm install {package}` melalui `execFile` (tanpa interpolasi shell)                         |
| Mode penggunaan                   | Penyedia didaftarkan sebagai `9router/{sub}/{model}` di mesin perutean                       |
| Pengelolaan kunci API             | OmniRoute membuat, mengenkripsi saat disimpan (AES-256-GCM), dan menyuntikkannya melalui env |
| Lokasi dasbor                     | `/dashboard/providers/services` (tiga tab)                                                   |
| Mulai otomatis                    | Sakelar per layanan, bawaan NONAKTIF                                                         |

---

## 2. Arsitektur — 4 lapisan

```
┌────────────────────────────────────────────────────────────────────┐
│  Lapisan 1 — UI                                                    │
│  /dashboard/providers/services  (tab: CLIProxyAPI | 9Router | Mux) │
│  Log langsung (SSE), Mulai/Hentikan/Mulai Ulang/Perbarui,          │
│  Pengaturan, Instalasi                                             │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Shell + perutean tab berdasarkan ?tab=│
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (fetch Next.js)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lapisan 2 — API (LOCAL_ONLY — hanya loopback)                     │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (proksi balik HTTP + WebSocket → upstream 9Router)              │
│                                                                    │
│  Gerbang: LOCAL_ONLY_API_PREFIXES mencakup "/api/services/" dan    │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ pemanggilan dalam proses
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lapisan 3 — ServiceSupervisor (src/lib/services/)                 │
│                                                                    │
│  ServiceSupervisor.ts   Supervisor generik (child_process.spawn)   │
│    ├── instalasi:  execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── mulai:      spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── port:       20130 untuk 9Router (dapat dikonfigurasi)       │
│    ├── log:        buffer cincin stdio 5 MB → peristiwa SSE        │
│    ├── kesehatan:  HTTP GET /health tiap 2–5 dtk, pemulihan malas  │
│    └── siklus hidup: SIGTERM 15 dtk → SIGKILL                      │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Melakukan bootstrap semua SERVICES[] saat      │
│                     proses dimulai                                 │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       GET /v1/models berkala → tabel service_models  │
│  ringBuffer.ts      Buffer log melingkar (5 MB per layanan)        │
│  healthCheck.ts     Probe kesehatan HTTP dengan polling            │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      (adaptor penginstal)                          │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP kompatibel OpenAI (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lapisan 4 — Penyedia / Perutean                                   │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Mencari ulang port dan kunci API per permintaan (tanpa cache).  │
│    Menghapus prefiks "9router/" dari ID model sebelum meneruskan.  │
│    Mengembalikan 503 service_not_running jika supervisor tidak     │
│    dalam status "running".                                         │
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Entri untuk "9router": isEmbeddedService: true                  │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Model disimpan sebagai "9router/{sub}/{model}" (berprefiks).    │
│    Disinkronkan setiap 5 menit oleh modelSync.ts.                  │
│                                                                    │
│  Mux HANYA dikelola siklus hidupnya (Lapisan 1-3) — Mux adalah     │
│  daemon orkestrasi agen, bukan proksi LLM, sehingga tidak memiliki │
│  entri eksekutor/penyedia Lapisan 4 dan tidak pernah menjadi target│
│  perutean.                                                         │
└────────────────────────────────────────────────────────────────────┘
```

### File sumber utama

| File                                        | Peran                                                        |
| ------------------------------------------- | ------------------------------------------------------------ |
| `src/lib/services/ServiceSupervisor.ts`     | Kelas inti: siklus hidup, penguncian, kesehatan, ring buffer |
| `src/lib/services/bootstrap.ts`             | Registrasi tingkat proses dan mulai otomatis                 |
| `src/lib/services/registry.ts`              | Peta singleton `tool → supervisor`                           |
| `src/lib/services/apiKey.ts`                | Pembuatan kunci, enkripsi AES-256-GCM saat disimpan          |
| `src/lib/services/modelSync.ts`             | Sinkronisasi model berkala (5 menit) + sesuai permintaan     |
| `src/lib/services/ringBuffer.ts`            | Buffer log sirkular 5 MB dengan langganan SSE                |
| `src/lib/services/healthCheck.ts`           | Probe kesehatan HTTP (interval dapat dikonfigurasi)          |
| `src/lib/services/installers/ninerouter.ts` | npm install/update/uninstall untuk 9Router                   |
| `src/lib/services/installers/cliproxy.ts`   | npm install/update/uninstall untuk CLIProxyAPI               |
| `src/lib/services/installers/mux.ts`        | npm install/update/uninstall untuk Mux                       |
| `src/lib/services/installers/openwa.ts`     | npm install/update/uninstall untuk open-wa                   |
| `src/app/api/services/9router/_lib.ts`      | Pembantu `getOrInitSupervisor()`                             |
| `src/app/api/services/[name]/logs/route.ts` | Endpoint log SSE bersama                                     |
| `open-sse/executors/ninerouter.ts`          | Eksekutor penyedia (Lapisan 4)                               |

---

## 3. Mesin status siklus hidup

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
             pemeriksaan kesehatan ok│         crash / SIGTERM   │
                               ┌────▼─────┐  (keluar dalam 5 dtk)│
                               │ running  │──── crash ──────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Status disimpan dalam tabel DB `version_manager` (kolom `status`) dan dicerminkan
dalam status di memori `ServiceSupervisor`. Status di memori bersifat otoritatif untuk
proses yang sedang berjalan; status DB merupakan cadangan persisten saat boot.

### Transisi status

| Dari            | Peristiwa                                  | Ke                      |
| --------------- | ------------------------------------------ | ----------------------- |
| `not_installed` | `install()` berhasil                       | `stopped`               |
| `stopped`       | `start()` dipanggil                        | `starting`              |
| `starting`      | pemeriksaan kesehatan mengembalikan 200    | `running`               |
| `starting`      | proses keluar sebelum sehat                | `error`                 |
| `running`       | `stop()` dipanggil                         | `stopping` → `stopped`  |
| `running`       | proses keluar secara tak terduga (< 5 dtk) | `error` (crash cepat)   |
| `running`       | proses keluar secara tak terduga (> 5 dtk) | `error`                 |
| `error`         | `start()` dipanggil                        | `starting`              |
| apa pun         | `stop()` saat `stopping`                   | tidak melakukan apa pun |

### Kunci operasi

`ServiceSupervisor` menserialisasi operasi siklus hidup melalui kunci operasi asinkron
(`withLock()`). Pemanggilan `start()` secara bersamaan pada supervisor yang sama menghasilkan tepat
satu proses baru; pemanggil kedua menunggu dan mengembalikan status yang ada. Hal ini mencegah
kondisi balapan ketika, misalnya, mulai otomatis dan tombol UI dipicu secara bersamaan.

---

## 4. Referensi API

Semua rute di bawah `/api/services/` bersifat **LOCAL_ONLY** (hanya loopback, aturan mutlak #17).
Permintaan non-loopback menerima `403 LOCAL_ONLY` terlepas dari token autentikasi.

### 4.1 Endpoint 9Router (11 rute)

#### `POST /api/services/9router/install`

Menginstal 9Router dari npm. Membuat `DATA_DIR/services/9router/` dengan
`package.json` dan `node_modules/` tersendiri. Tidak berkonflik dengan dependensi OmniRoute sendiri.

**Isi permintaan** (semuanya opsional):

```json
{ "version": "latest" }
```

| Bidang    | Tipe     | Default    | Deskripsi                               |
| --------- | -------- | ---------- | --------------------------------------- |
| `version` | `string` | `"latest"` | Tag versi npm atau semver yang diinstal |

**Respons:**

| Status | Deskripsi                                                             |
| ------ | --------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                |
| `400`  | Isi permintaan tidak valid (kegagalan validasi Zod)                   |
| `409`  | Sedang diinstal (kunci ditahan)                                       |
| `500`  | Instalasi npm gagal — lihat `message` untuk pesan yang mudah dipahami |

**Catatan:** Menggunakan `execFile('npm', [...])` — tanpa shell, tanpa interpolasi (aturan mutlak #13).
Kesalahan EACCES ditampilkan sebagai pesan yang mudah dipahami.

---

#### `POST /api/services/9router/start`

Memulai 9Router. Mendaftarkan supervisor jika belum terdaftar, lalu memanggil
`supervisor.start()`. Bersifat idempoten jika sudah berjalan.

**Isi permintaan:** tidak ada

**Respons:**

| Status | Deskripsi                                            |
| ------ | ---------------------------------------------------- |
| `200`  | Objek `ServiceStatus` (lihat skema di bawah)         |
| `409`  | 9Router belum diinstal (`status: "not_installed"`)   |
| `503`  | Gagal memulai (kesalahan proses — lihat `lastError`) |

**Skema ServiceStatus:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

Menghentikan 9Router dengan aman. Mengirim SIGTERM, menunggu 15 detik, lalu mengirim SIGKILL jika masih aktif.
Bersifat idempoten jika sudah berhenti.

**Isi permintaan:** tidak ada

**Respons:**

| Status | Deskripsi                            |
| ------ | ------------------------------------ |
| `200`  | `ServiceStatus` (state: "stopped")   |
| `503`  | Penghentian gagal secara tak terduga |

---

#### `POST /api/services/9router/restart`

Setara dengan `stop()` lalu `start()` dalam kunci operasi.

**Isi permintaan:** tidak ada

**Respons:** sama seperti `start` (mengembalikan `ServiceStatus` akhir).

---

#### `POST /api/services/9router/update`

Memperbarui 9Router ke versi npm yang lebih baru. Jika layanan sedang berjalan, layanan akan dihentikan
terlebih dahulu, instalasi npm dijalankan (menginstal versi yang lebih baru di lokasi yang sama), lalu
layanan dimulai ulang.

**Isi permintaan** (semuanya opsional):

```json
{ "version": "latest" }
```

**Respons:**

| Status | Deskripsi                                                       |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Isi tidak valid                                                 |
| `500`  | Pembaruan npm gagal                                             |

---

#### `POST /api/services/9router/rotate-key`

Menghasilkan kunci API baru untuk 9Router, mengenkripsinya saat disimpan, dan memulai ulang layanan
(jika sedang berjalan) agar menggunakan kunci baru dari lingkungannya. Kunci lama
segera dibatalkan.

**Isi permintaan:** tidak ada

**Respons:**

| Status | Deskripsi                                  |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Rotasi gagal                               |

**Keamanan:** Kunci baru tidak pernah dikembalikan dalam respons (tidak ada kebocoran kredensial).
Kunci disimpan secara terenkripsi (AES-256-GCM) dalam tabel `version_manager`.

---

#### `GET /api/services/9router/status`

Mengembalikan gabungan status langsung + DB, termasuk metadata versi dan pratinjau kunci API.

**Respons:**

| Status | Deskripsi            |
| ------ | -------------------- |
| `200`  | Lihat skema di bawah |
| `500`  | Gagal membaca status |

**Skema respons:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

Mengaktifkan atau menonaktifkan flag mulai otomatis. Saat `enabled: true`, layanan dimulai secara otomatis
ketika OmniRoute melakukan boot berikutnya (jika layanan telah diinstal).

**Isi permintaan:**

```json
{ "enabled": true }
```

**Respons:**

| Status | Deskripsi             |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Isi tidak valid       |

---

#### `GET /api/services/9router/logs`

Stream SSE log langsung dari buffer cincin stdout/stderr 9Router.

**Parameter kueri:**

| Parameter | Tipe      | Default   | Deskripsi                                                                           |
| --------- | --------- | --------- | ----------------------------------------------------------------------------------- |
| `tail`    | `integer` | 200       | Jumlah baris historis yang dikirim terlebih dahulu (maks. 1000)                     |
| `filter`  | `string`  | tidak ada | Filter substring tanpa membedakan huruf besar-kecil (tanpa regex — aman dari ReDoS) |

**Peristiwa SSE:**

| Peristiwa   | Data        | Deskripsi                  |
| ----------- | ----------- | -------------------------- |
| `snapshot`  | `LogLine[]` | Bagian akhir riwayat awal  |
| `log`       | `LogLine`   | Baris log langsung         |
| `heartbeat` | `{}`        | Keep-alive setiap 15 detik |

**Skema LogLine:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Respons:**

| Status | Deskripsi                                            |
| ------ | ---------------------------------------------------- |
| `200`  | `text/event-stream`                                  |
| `400`  | Parameter `filter` terlalu panjang (> 200 karakter)  |
| `404`  | Layanan tidak ditemukan (supervisor tidak terdaftar) |

---

### 4.2 Endpoint CLIProxyAPI (10 rute)

CLIProxyAPI memiliki bentuk endpoint yang sama dengan 9Router tanpa `rotate-key`, ditambah
`accounts`, `provider-expose`, dan `auto-restart-adopted`. Kini layanan ini menerima
kunci API bidang data khusus yang disuntikkan saat proses dimunculkan (`needsApiKey: true` di
`bootstrap.ts`, digunakan untuk sinkronisasi model); `status` mencakup lebih sedikit kolom.

| Metode | Jalur                               | Deskripsi                                   |
| ------ | ----------------------------------- | ------------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Instal CLIProxyAPI dari npm                 |
| `POST` | `/api/services/cliproxy/start`      | Mulai CLIProxyAPI                           |
| `POST` | `/api/services/cliproxy/stop`       | Hentikan CLIProxyAPI                        |
| `POST` | `/api/services/cliproxy/restart`    | Mulai ulang CLIProxyAPI                     |
| `POST` | `/api/services/cliproxy/update`     | Perbarui ke versi yang lebih baru           |
| `GET`  | `/api/services/cliproxy/status`     | Status langsung + DB (tanpa `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Aktifkan/nonaktifkan mulai otomatis         |

Endpoint bersama `GET /api/services/{name}/logs` (lihat §4.1) berfungsi untuk keempat
layanan menggunakan segmen dinamis `[name]`.

---

### 4.3 Endpoint Mux (8 rute)

Mux memiliki bentuk endpoint yang sama dengan CLIProxyAPI — tidak ada rute `rotate-key` pada
permukaan API (token bearer dibuat dengan cara yang sama seperti milik 9Router melalui
`getOrCreateApiKey("mux")` dan disuntikkan melalui variabel lingkungan `MUX_SERVER_AUTH_TOKEN`, tetapi
belum ada endpoint rotasi khusus). Mux hanya dikelola siklus hidupnya: tidak seperti
9Router, Mux tidak memiliki eksekutor Layer 4 dan tidak pernah didaftarkan sebagai penyedia perutean.

| Metode | Jalur                          | Deskripsi                             |
| ------ | ------------------------------ | ------------------------------------- |
| `POST` | `/api/services/mux/install`    | Instal Mux dari npm (`npm i mux`)     |
| `POST` | `/api/services/mux/start`      | Mulai Mux (`mux server`)              |
| `POST` | `/api/services/mux/stop`       | Hentikan Mux                          |
| `POST` | `/api/services/mux/restart`    | Mulai ulang Mux                       |
| `POST` | `/api/services/mux/update`     | Perbarui ke versi npm yang lebih baru |
| `GET`  | `/api/services/mux/status`     | Status langsung + DB                  |
| `POST` | `/api/services/mux/auto-start` | Aktifkan/nonaktifkan mulai otomatis   |

---

### 4.4 Endpoint Bifrost (8 rute)

Bifrost adalah backend relai gateway AI berbasis Go (`@maximhq/bifrost`). Layanan ini menggunakan
bentuk endpoint yang sama dengan CLIProxyAPI (tanpa `rotate-key` — Bifrost mengelola sendiri kunci
penyedianya di `config.json` dalam `-app-dir`).

| Metode | Jalur                              | Deskripsi                                                 |
| ------ | ---------------------------------- | --------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Instal Bifrost dari npm (`@maximhq/bifrost`)              |
| `POST` | `/api/services/bifrost/start`      | Mulai Bifrost pada port 8080 (bawaan)                     |
| `POST` | `/api/services/bifrost/stop`       | Hentikan Bifrost                                          |
| `POST` | `/api/services/bifrost/restart`    | Mulai ulang Bifrost                                       |
| `POST` | `/api/services/bifrost/update`     | Perbarui ke versi yang lebih baru                         |
| `GET`  | `/api/services/bifrost/status`     | Status langsung + DB                                      |
| `POST` | `/api/services/bifrost/auto-start` | Aktifkan/nonaktifkan mulai otomatis                       |
| `GET`  | `/api/services/bifrost/logs`       | Ekor log SSE (melalui rute dinamis bersama `[name]/logs`) |

**Pengkabelan perutean:** Saat `BIFROST_BASE_URL` tidak ditetapkan dan instans Bifrost
yang diawasi sedang berjalan, `getBifrostRoutingConfig()` (di `routingBackend.ts`) secara otomatis
menggunakan `http://127.0.0.1:{port}` sebagai URL dasar relai. Variabel lingkungan `BIFROST_BASE_URL`
yang ditetapkan secara eksplisit selalu diprioritaskan.

---

### 4.5 Endpoint Dario (12 rute)

Bentuk siklus hidup yang sama dengan layanan lainnya (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`) ditambah bidang kontrol OAuth
yang dilindungi token di bawah `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (semuanya dilindungi oleh `DARIO_ADMIN_TOKEN`).

### 4.6 Endpoint open-wa (7 rute)

open-wa (`@open-wa/wa-automate`) menjalankan instans Chromium tanpa antarmuka grafis (melalui
Puppeteer) untuk mengotomatiskan WhatsApp Web. Layanan ini menggunakan bentuk endpoint yang sama dengan Mux (belum
ada rute `rotate-key`). Layanan ini hanya dikelola siklus hidupnya — bukan target perutean,
tanpa entri eksekutor/penyedia Layer 4.

| Metode | Jalur                             | Deskripsi                                                 |
| ------ | --------------------------------- | --------------------------------------------------------- |
| `POST` | `/api/services/openwa/install`    | Menginstal open-wa dari npm (`@open-wa/wa-automate`)      |
| `POST` | `/api/services/openwa/start`      | Menjalankan open-wa pada port 8323 (default)              |
| `POST` | `/api/services/openwa/stop`       | Menghentikan open-wa                                      |
| `POST` | `/api/services/openwa/restart`    | Memulai ulang open-wa                                     |
| `POST` | `/api/services/openwa/update`     | Memperbarui ke versi yang lebih baru                      |
| `GET`  | `/api/services/openwa/status`     | Status langsung + DB                                      |
| `POST` | `/api/services/openwa/auto-start` | Mengaktifkan/menonaktifkan mulai otomatis                 |
| `GET`  | `/api/services/openwa/logs`       | Tail log SSE (melalui rute dinamis `[name]/logs` bersama) |

**Kunci API:** diinjeksikan sebagai `WA_KEY` — override env generik open-wa
dengan prefiks `WA_*` memetakannya ke opsi CLI `--key`/`-k`
(`dist/cli/setup.js::envArgs()`, diverifikasi terhadap package 4.76.0 yang
terinstal). Diberi prefiks `ow_` saat dibuat oleh `generateServiceApiKey()`.
open-wa membaca kembali kunci dari header HTTP `key`/`api_key` (bukan
`Authorization: Bearer`); `/api-docs*` secara eksplisit dikecualikan dari
pemeriksaan (`setupAuthenticationLayer` di `dist/cli/server.js`), sehingga
probe kesehatan tidak memerlukan header autentikasi.

**Penyandingan:** open-wa bersifat tidak resmi dan tidak berafiliasi dengan WhatsApp —
nomor yang terhubung berisiko diblokir oleh deteksi otomatisasi milik WhatsApp.
Saat pertama kali dijalankan, kode QR penyandingan dicetak ke stdout dan ditampilkan
melalui panel Log/aliran SSE yang sudah ada — belum ada endpoint gambar QR khusus
dalam integrasi ini.

---

### 4.7 Proksi balik (sematan dasbor 9Router)

Dasbor menyematkan UI web 9Router di dalam iframe melalui proksi balik internal
di:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Proksi ini:

- Meneruskan permintaan ke `http://127.0.0.1:{port}/{path}` (khusus loopback)
- Menghapus header `cookie` dan `authorization` yang masuk (tidak ada kebocoran sesi OmniRoute)
- Menginjeksikan `Authorization: Bearer {apiKey}` untuk autentikasi 9Router
- Menghapus `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*` dari respons
- Menulis ulang respons HTML untuk menginjeksikan `<base href>` dan menormalkan jalur absolut (`/foo` → `/dashboard/.../embed/foo`)

Upgrade WebSocket untuk dasbor yang disematkan ditangani oleh server pendamping pada
port khusus (lihat `src/lib/services/embedWsProxy.ts`).

**Keamanan:** Rute proksi sematan diklasifikasikan di bawah `LOCAL_ONLY_API_PREFIXES`
dan hanya dapat diakses dari loopback. Penyerang yang memperoleh JWT melalui
tunnel Cloudflare/Ngrok tidak dapat menggunakan proksi untuk mengakses layanan
yang disematkan.

---

## 5. Keamanan

### Penerapan LOCAL_ONLY (aturan wajib #17)

Semua rute di bawah `/api/services/` dan `/dashboard/providers/services/*/embed/`
diklasifikasikan sebagai LOCAL_ONLY dalam `src/server/authz/routeGuard.ts`. Pemeriksaan loopback
dijalankan tanpa syarat sebelum cabang autentikasi apa pun:

```
permintaan tiba
  → isLocalOnlyPath(path)?
      → non-loopback → 403 LOCAL_ONLY (selalu, sebelum pemeriksaan autentikasi)
      → loopback     → lanjut ke autentikasi normal
```

Hal ini mencegah JWT yang bocor (misalnya, melalui tunnel) memicu `npm install` atau
pembuatan proses. Lihat `docs/security/ROUTE_GUARD_TIERS.md` untuk matriks tingkatan
lengkap.

### Injeksi kunci API

9Router dan Mux memerlukan kunci API/token bearer untuk endpoint HTTP mereka sendiri.
OmniRoute:

1. Menghasilkan kunci melalui `crypto.randomBytes(32).toString("base64url")` dengan
   prefiks khusus layanan (`nr_` untuk 9Router, `mx_` untuk Mux).
2. Mengenkripsinya saat disimpan menggunakan AES-256-GCM (cipher yang sama dengan yang digunakan untuk kredensial penyedia).
3. Mendekripsi dan menginjeksikannya sebagai variabel lingkungan saat proses dibuat —
   `NINEROUTER_API_KEY` untuk 9Router, `MUX_SERVER_AUTH_TOKEN` untuk Mux (tidak pernah sebagai flag CLI,
   sehingga token tidak pernah muncul dalam `ps`/daftar proses).
4. Tidak pernah mengembalikan kunci teks biasa dalam respons HTTP apa pun.

CLIProxyAPI menerima kunci data-plane khusus yang diinjeksikan saat proses dibuat
(`needsApiKey: true` — digunakan untuk sinkronisasi model dengan adaptor).

### Pertahanan SSRF

Proksi balik HTTP (`/dashboard/.../embed/[...path]`) dikodekan secara tetap agar hanya meneruskan
ke `http://127.0.0.1:{port}`. Proksi ini tidak pernah mengikuti pengalihan ke tujuan
non-loopback. Pustaka `ssrf-req-filter` digunakan untuk menolak URL upstream apa pun yang
di-resolve ke luar rentang loopback.

### Keamanan shell (aturan wajib #13)

`npm install` dipanggil melalui `execFile('npm', ['install', pkg, '--prefix', dir])` —
tanpa literal templat, tanpa shell, dan tanpa interpolasi path eksternal ke dalam string
perintah. Nilai runtime (port, kunci API) diteruskan melalui objek `env` milik proses anak.

### Sanitasi kesalahan (aturan wajib #12)

Semua respons kesalahan dari `/api/services/*` melewati `buildErrorBody()` atau
`sanitizeErrorMessage()`. `err.stack` dan `err.message` mentah tidak pernah dikembalikan
apa adanya kepada pemanggil.

---

## 6. Menambahkan layanan tersemat baru

Ikuti 8 langkah berikut. Baca implementasi yang ada dalam `src/lib/services/installers/`
dan `src/app/api/services/` sebagai referensi kanonis.

### Langkah 1 — Buat penginstal

Buat `src/lib/services/installers/{name}.ts` dengan mencontoh `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // pilih port yang kosong

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Gunakan `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` dari `installers/utils.ts`
— jangan pernah menggunakan `execSync` atau interpolasi shell.

### Langkah 2 — Daftarkan dalam bootstrap

Tambahkan `ServiceEntry` ke array `SERVICES` dalam `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false jika kunci API tidak diperlukan
}
```

Perluas `buildSpawnArgsFactory()` untuk menangani `cfg.tool === "myservice"`.

#### Kontrak plugin penyedia yang dapat dipasang (Fase 1, #7333)

`src/lib/services/providerPlugins/` memperkenalkan kontrak `ServiceProviderPlugin` yang
mengemas field `ServiceEntry` dari `bootstrap.ts` milik backend dan field templat manifes
`serviceBackends.ts` ke dalam satu objek, alih-alih bentuk backend yang sama dinyatakan
secara terpisah dalam dua file yang tidak berkaitan. Saat tulisan ini dibuat, **hanya `9router` yang
telah dimigrasikan** — `bootstrap.ts` memperoleh entri `SERVICES[]`-nya dari
`getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`),
dan melempar kesalahan startup jika plugin tersebut tidak ada. `cliproxy`, `mux`, dan `bifrost`
tetap menggunakan literal inline `SERVICES[]` yang sudah ada tanpa perubahan.

`open-sse/config/providerPluginManifest.ts` juga mendapatkan helper tambahan
`createServiceBackendManifestEntry(pluginId, template)` yang membuat
`ProviderPluginManifestEntry` berformat benar dari entri `SERVICE_BACKEND_MANIFEST_TEMPLATE` — helper ini
**belum** dihubungkan ke alur permintaan aktif apa pun (baik `generateProviderPluginManifestFromRegistry()`
maupun `/v1/providers/[provider]/models`); hal tersebut tetap menjadi tindak lanjut setelah kontrak ini
terbukti berfungsi untuk backend kedua.

Ditangguhkan ke PR tindak lanjut dan dilacak dalam isu #7333: memigrasikan `cliproxyapi` melalui
registry yang sama, menggeneralisasi `mux`/`bifrost` ke dalam union `ServiceBackendPluginId`,
memasukkan penanganan khusus perutean eksekutor (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`) ke dalam kontrak plugin, dan menghubungkan
`createServiceBackendManifestEntry()` ke alur kode manifes/model yang aktif.

### Langkah 3 — Tambahkan migrasi dan seed DB

Pastikan layanan memiliki baris dalam `version_manager` melalui migrasi di
`src/lib/db/migrations/`. Baris tersebut harus berisi:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Langkah 4 — Buat 7 endpoint API

Di bawah `src/app/api/services/{name}/`:

```
_lib.ts            helper getOrInitSupervisor()
install/route.ts   POST — memanggil installer.install()
start/route.ts     POST — memanggil supervisor.start()
stop/route.ts      POST — memanggil supervisor.stop()
restart/route.ts   POST — memanggil supervisor.restart()
update/route.ts    POST — memanggil installer.update()
status/route.ts    GET  — menggabungkan status aktif + DB
auto-start/route.ts POST — mengubah flag auto_start
```

Rute bersama `GET /api/services/[name]/logs` sudah terhubung — tidak diperlukan perubahan
di sana.

Delegasikan semua respons kesalahan melalui `createErrorResponse()` / `buildErrorBody()`.

### Langkah 5 — Tambahkan ke LOCAL_ONLY_API_PREFIXES

Di `src/server/authz/routeGuard.ts`, pastikan bahwa `/api/services/` sudah tercantum.
Jika Anda memperkenalkan prefiks baru (misalnya, `/api/tools/`), tambahkan prefiks tersebut ke
`LOCAL_ONLY_API_PREFIXES` dan, jika prefiks tersebut menjalankan proses, ke `SPAWN_CAPABLE_PREFIXES`.
Tambahkan pengujian di `tests/unit/authz/routeGuard.test.ts`.

### Langkah 6 — Tambahkan tab UI

Buat `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Gunakan kembali komponen bersama:

- `ServiceStatusCard` — status langsung + lencana kesehatan
- `ServiceLifecycleButtons` — Mulai / Hentikan / Mulai Ulang / Perbarui
- `ServiceLogsPanel` — ekor log SSE (terhubung ke `/api/services/{name}/logs`)
- `ApiKeyCard` — tampilkan + rotasi kunci (jika `needsApiKey: true`)

Daftarkan tab tersebut di `ServicesPageShell.tsx`.

### Langkah 7 — Tambahkan entri penyedia (jika layanan merupakan target perutean)

Jika layanan tersemat mengekspos endpoint `/v1/chat/completions` yang kompatibel dengan OpenAI:

1. Tambahkan entri penyedia di `src/shared/constants/providers.ts` dengan `isEmbeddedService: true`.
2. Buat `open-sse/executors/{name}.ts` yang memperluas `BaseExecutor`. Cari ulang port dan
   kunci API untuk setiap permintaan (jangan pernah menyimpannya dalam cache di konstruktor). Kembalikan respons
   `503 service_not_running` ketika status supervisor bukan `"running"`.
3. Daftarkan model di `open-sse/config/providerRegistry.ts` dengan prefiks layanan
   (misalnya, `myservice/sub/model`). `modelSync.ts` akan terus memperbaruinya.

### Langkah 8 — Dokumentasikan dan uji

1. Perbarui `docs/frameworks/EMBEDDED-SERVICES.md` (berkas ini) — tambahkan layanan ke
   tabel di §1 dan endpoint baru apa pun ke §4.
2. Tambahkan pengujian unit di `tests/unit/services/` (siklus hidup, penginstal, bentuk API).
3. Tambahkan pengujian integrasi di `tests/integration/services/` (diaktifkan melalui `RUN_SERVICES_INT=1`).
4. Perbarui `docs/openapi.yaml` dengan endpoint baru.

---

## 7. Pemecahan Masalah

### Layanan tidak dapat dimulai

**Gejala:** Tombol mulai mengembalikan 503, status tetap `"error"` atau `"starting"`.

**Daftar periksa:**

1. Periksa `GET /api/services/{name}/logs` (atau panel Log di dasbor). Cari
   baris seperti `Error: ENOENT`, `address already in use`, atau `Cannot find module`.
2. Pastikan `npm` berada di PATH: jalankan `which npm` dari akun pengguna yang sama dengan yang menjalankan OmniRoute.
3. Pastikan layanan telah diinstal: periksa `GET /api/services/{name}/status` untuk
   `installedVersion`. Jika `null`, jalankan instalasi terlebih dahulu.
4. Pastikan `DATA_DIR/services/{name}/node_modules/` tersedia dan tidak kosong.
5. Periksa bidang `lastError` dalam respons status untuk mengetahui alasan keluar yang telah disanitasi.

---

### Cold start lambat (> 10 dtk untuk mencapai `running`)

**Gejala:** Status tetap `"starting"` cukup lama sebelum berubah menjadi `"running"` atau `"error"`.

**Penjelasan:** Cold start 9Router mencakup proses impor pohon dependensi berukuran besar (modul DNS,
tunnel, MITM). Interval pemeriksaan kesehatan bawaan adalah 2 dtk dengan 3 percobaan sebelum
supervisor menyatakan timeout (tetapi tetap melanjutkan polling).

**Perbaikan:** `healthIntervalMs` dan timeout `waitForHealthy`
(`healthIntervalMs * 3`) dapat dikonfigurasi di `bootstrap.ts`. Untuk layanan dengan waktu
startup yang lebih lama, tingkatkan `healthIntervalMs` menjadi 5000 dan `stopTimeoutMs` menjadi 30 000.

---

### Konflik port (`EADDRINUSE`)

**Gejala:** Log menampilkan `address already in use :::20130`.

**Penyebab:**

- Proses lain sudah menggunakan port 20130.
- Proses 9Router sebelumnya belum sepenuhnya dihentikan (PID zombi).

**Perbaikan:**

1. Ubah port bawaan melalui variabel lingkungan `NINEROUTER_PORT` di `.env`.
2. Temukan dan hentikan proses yang berkonflik: `lsof -ti :20130 | xargs kill -9`.
3. Port dapat dikonfigurasi per layanan di `bootstrap.ts` melalui bidang `port`.

**Catatan:** 9Router menggunakan port 20130 secara bawaan, khususnya untuk menghindari konflik dengan
port bawaan OmniRoute, yaitu 20128.

---

### Izin ditolak (EACCES) saat instalasi

**Gejala:** Instalasi mengembalikan 500, log menampilkan `EACCES` atau `permission denied`.

**Penyebab:**

- `DATA_DIR` atau direktori induknya tidak dapat ditulisi oleh proses OmniRoute.
- Berjalan di dalam Docker rootless tanpa akses tulis ke volume yang dipetakan.

**Perbaikan:**

1. Periksa `DATA_DIR` (bawaan: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Pastikan pengguna yang menjalankan proses OmniRoute memiliki direktori tersebut: `chown -R $USER ~/.omniroute/`
3. Di Docker, pastikan mount volume memiliki izin yang benar untuk pengguna container.

---

### Pembaruan gagal (timeout `npm install` atau kesalahan jaringan)

**Gejala:** Pembaruan mengembalikan 500 dengan `InstallError`, log menampilkan timeout jaringan.

**Daftar periksa:**

1. Pastikan registry npm dapat dijangkau: `npm ping`.
2. Periksa proxy perusahaan: `npm config get proxy`, `npm config get https-proxy`.
3. Coba instalasi secara manual: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Jika berada di balik air gap, unduh tarball terlebih dahulu dan gunakan `npm install /path/to/tarball.tgz`.

---

### Layanan langsung menampilkan status `"error"` setelah dimulai (crash cepat)

**Gejala:** Status berubah dari `"starting"` menjadi `"error"` dalam waktu kurang dari 5 detik.
`lastError` menampilkan `"Fast crash (exited with code 1)"`.

**Daftar periksa:**

1. Baca bagian akhir log secara lengkap: `GET /api/services/{name}/logs?tail=500`.
2. Penyebab umum: variabel lingkungan yang diperlukan oleh layanan tidak tersedia.
3. Untuk 9Router: pastikan `NINEROUTER_DISABLE_MITM=true` dan
   `NINEROUTER_DISABLE_TUNNEL=true` tersedia di lingkungan yang diteruskan saat spawn (lihat
   `resolveSpawnArgs` di `installers/ninerouter.ts`).

---

## 8. Tanya Jawab Umum

**T: Dapatkah saya mengekspos endpoint layanan tersemat kepada klien non-loopback?**

Tidak. Tingkat LOCAL_ONLY memang dirancang demikian (aturan wajib #17). Rute yang dapat menjalankan
`npm install` atau memunculkan proses `node` tidak boleh dapat diakses dari lalu lintas
non-loopback, karena JWT yang bocor melalui tunnel (Cloudflare, Ngrok, Tailscale) dapat
memungkinkan pemunculan proses secara arbitrer. Tidak ada pengecualian opsional untuk
`/api/services/` — tidak seperti `/api/mcp/`, rute ini dikecualikan dari daftar
pengabaian cakupan manage. Lihat `docs/security/ROUTE_GUARD_TIERS.md`.

---

**T: Apakah 9Router dan CLIProxyAPI akan tersedia dalam deployment produksi/cloud?**

Ya. Kedua layanan mengikuti model yang mengutamakan lingkungan lokal, sama seperti OmniRoute. Keduanya berjalan
pada mesin yang sama dan berkomunikasi melalui loopback. "Produksi" dalam konteks ini berarti VPS
atau server lokal tempat OmniRoute di-deploy, bukan penyedia cloud jarak jauh.

---

**T: Bagaimana cara melakukan debug pada supervisor?**

1. Pantau aliran log SSE: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Periksa log terstruktur dalam output pino OmniRoute yang difilter berdasarkan
   namespace `service:supervisor`.
3. Periksa baris DB: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Gunakan `GET /api/services/9router/status` untuk melihat status aktif saat ini, PID, kondisi,
   dan `lastError` dalam satu panggilan.

---

**T: Supervisor menampilkan `health: "degraded"` atau `health: "unknown"`, tetapi statusnya adalah `"running"`. Apakah itu masalah?**

`"degraded"` berarti pemeriksaan kondisi mengembalikan respons non-200. `"unknown"` berarti belum ada
pemeriksaan yang selesai (berpacu dengan polling pertama). Keduanya bersifat sementara selama proses startup.
Jika kondisi tetap `"degraded"` selama lebih dari `healthIntervalMs * 3` ms setelah
`"running"`, layanan tersemat sedang berjalan, tetapi API HTTP-nya tidak merespons. Periksa
apakah port dalam respons status sudah benar dan apakah layanan benar-benar
mendengarkan pada port tersebut.

---

**T: Dapatkah saya mengubah kunci API 9Router tanpa restart penuh?**

Tidak. Kunci API diteruskan ke 9Router melalui variabel lingkungan saat proses dimunculkan.
Variabel lingkungan tidak dapat diubah dalam proses yang sedang berjalan. `POST .../rotate-key`
secara otomatis menghentikan dan memulai ulang layanan untuk menerapkan kunci baru. Rotasi kunci
mulai berlaku dalam durasi `stopTimeoutMs` layanan (default 15 dtk) ditambah waktu
startup-nya.

---

**T: Berapa batas ring buffer dan apa yang terjadi ketika buffer penuh?**

Setiap layanan memiliki ring buffer khusus sebesar 5 MB. Ketika buffer penuh, baris log
terlama akan dikeluarkan untuk memberi ruang bagi baris baru. Peristiwa SSE `snapshot` mengembalikan
baris terbaru dalam batas `tail`. Log tidak disimpan secara persisten ke disk kecuali
`logsBufferPath` ditetapkan dalam baris DB.

---

## Lihat juga

- `docs/security/ROUTE_GUARD_TIERS.md` — detail tingkat LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 pemetaan modul Layanan Tersemat
- `docs/architecture/ARCHITECTURE.md` — konteks tingkat sistem
- `docs/openapi.yaml` — definisi endpoint yang dapat dibaca mesin
- `CLAUDE.md` §"Menambahkan Layanan Tersemat Baru" — daftar periksa referensi cepat
