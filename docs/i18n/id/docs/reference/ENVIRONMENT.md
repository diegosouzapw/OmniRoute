# Referensi Variabel Lingkungan (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/ENVIRONMENT.md)

---

> Referensi lengkap untuk setiap variabel lingkungan yang dikenali oleh OmniRoute.
> Untuk template pengaturan cepat, lihat [`.env.example`](../.env.example).

---

## Daftar Isi

- [1. Rahasia yang Wajib Ada](#1-required-secrets)
- [2. Penyimpanan & Database](#2-storage--database)
- [3. Jaringan & Port](#3-network--ports)
- [4. Keamanan & Autentikasi](#4-security--authentication)
- [5. Sanitasi Input & Perlindungan PII](#5-input-sanitization--pii-protection)
- [6. Kebijakan Alat & Routing](#6-tool--routing-policies)
- [7. URL & Sinkronisasi Cloud](#7-urls--cloud-sync)
- [8. Proxy Keluar](#8-outbound-proxy)
- [9. Integrasi Alat CLI](#9-cli-tool-integration)
- [10. Agen Internal & Integrasi MCP](#10-internal-agent--mcp-integrations)
- [11. Kredensial Provider OAuth](#11-oauth-provider-credentials)
- [12. Override User-Agent Provider](#12-provider-user-agent-overrides)
- [13. Kompatibilitas Fingerprint CLI](#13-cli-fingerprint-compatibility)
- [14. Provider Kunci API](#14-api-key-providers)
- [15. Pengaturan Batas Waktu](#15-timeout-settings)
- [16. Logging](#16-logging)
- [17. Optimasi Memori](#17-memory-optimization)
- [18. Sinkronisasi Harga](#18-pricing-sync)
- [19. Sinkronisasi Model (Dev)](#19-model-sync-dev)
- [20. Pengaturan Spesifik Provider](#20-provider-specific-settings)
- [21. Kesehatan Proxy](#21-proxy-health)
- [22. Debugging](#22-debugging)
- [23. Integrasi GitHub](#23-github-integration)
- [Skenario Deployment](#deployment-scenarios)
- [Audit: Variabel yang Dihapus / Tidak Aktif](#audit-removed--dead-variables)

---

## 1. Rahasia yang Wajib Ada

Variabel-variabel ini **harus** diatur sebelum menjalankan aplikasi pertama kali. Tanpa variabel ini, aplikasi akan menolak untuk berjalan atau beroperasi dengan pengaturan default yang tidak aman.

| Variable           | Wajib    | Default  | Source File             | Deskripsi                                                                                                                                |
| ------------------ | -------- | -------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`       | **Ya**   | _(none)_ | `src/lib/auth`          | Menandatangani/memverifikasi semua cookie sesi dashboard (JWT). Buat dengan `openssl rand -base64 48`.                                   |
| `API_KEY_SECRET`   | **Ya**   | _(none)_ | `src/lib/db/apiKeys.ts` | Kunci enkripsi AES untuk nilai kunci API yang disimpan di SQLite. Buat dengan `openssl rand -hex 32`.                                    |
| `INITIAL_PASSWORD` | **Ya**   | `123456` | Bootstrap script        | Mengatur kata sandi awal admin dashboard. **Ubah sebelum pertama kali digunakan.** Setelah login, ubah melalui Dashboard → Settings → Security. |

### Perintah Pembuatan

```bash
# Generate all three secrets at once:
echo "JWT_SECRET=$(openssl rand -base64 48)"
echo "API_KEY_SECRET=$(openssl rand -hex 32)"
echo "INITIAL_PASSWORD=$(openssl rand -base64 16)"
```

> [!CAUTION]
> Jangan pernah melakukan commit file `.env` yang berisi rahasia nyata ke version control. `.gitignore` sudah mengecualikan `.env`, namun verifikasi sebelum melakukan push.

---

## 2. Penyimpanan & Database

OmniRoute menggunakan **SQLite** (melalui `better-sqlite3`) untuk semua persistensi data. Variabel-variabel ini mengontrol lokasi data, enkripsi, dan siklus hidup data.

| Variable                         | Default              | Source File                                     | Deskripsi                                                                                                                          |
| -------------------------------- | -------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `DATA_DIR`                       | `~/.omniroute/`      | `src/lib/db/core.ts`                            | Direktori utama untuk DB SQLite, cadangan, dan file data. Override untuk volume Docker atau path khusus.                           |
| `STORAGE_ENCRYPTION_KEY`         | _(empty = disabled)_ | `src/lib/db/encryption.ts`                      | Kunci AES untuk enkripsi penuh database SQLite saat disimpan. Buat dengan `openssl rand -hex 32`.                                  |
| `STORAGE_ENCRYPTION_KEY_VERSION` | `v1`                 | `scripts/bootstrap-env.mjs`, `electron/main.js` | Label versi untuk kunci enkripsi. Naikkan nilainya saat melakukan rotasi kunci agar mendukung dekripsi cadangan lama.              |
| `DISABLE_SQLITE_AUTO_BACKUP`     | `false`              | `src/lib/db/backup.ts`                          | Saat bernilai `true`, melewati pencadangan database otomatis yang berjalan sebelum migrasi pada setiap startup.                    |
| `OMNIROUTE_CRYPT_KEY`            | _(unset)_            | `src/lib/db/encryption.ts`                      | **Alias legacy** untuk `STORAGE_ENCRYPTION_KEY`. Diterima sebagai fallback ketika variabel utama tidak ada.                        |
| `OMNIROUTE_API_KEY_BASE64`       | _(unset)_            | `src/lib/db/encryption.ts`                      | **Alias legacy** (bentuk yang dikodekan Base64) diterima sebagai fallback. Didekode secara otomatis sebelum digunakan.             |

### Skenario

| Skenario                   | Konfigurasi                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| **Pengembangan lokal**     | Biarkan semua nilai default. DB berada di `~/.omniroute/omniroute.db`.                           |
| **Docker**                 | `DATA_DIR=/data` + mount volume di `/data`.                                                      |
| **Terenkripsi saat simpan**| Set `STORAGE_ENCRYPTION_KEY` + simpan cadangan kuncinya! Kehilangan kunci = kehilangan data.     |
| **CI/Testing**             | `DATA_DIR=/tmp/omniroute-test` — bersifat sementara, tidak perlu enkripsi.                       |

---

## 3. Jaringan & Port

| Variable              | Default      | Source File                | Deskripsi                                                                                             |
| --------------------- | ------------ | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `PORT`                | `20128`      | `src/lib/runtime/ports.ts` | Port utama untuk Dashboard UI dan endpoint API (mode port tunggal).                                   |
| `API_PORT`            | _(unset)_    | `src/lib/runtime/ports.ts` | Jika diatur, menyajikan API proxy `/v1/*` pada port terpisah ini.                                     |
| `API_HOST`            | `0.0.0.0`    | `src/lib/runtime/ports.ts` | Alamat bind untuk port API.                                                                           |
| `DASHBOARD_PORT`      | _(unset)_    | `src/lib/runtime/ports.ts` | Jika diatur, menyajikan Dashboard UI pada port terpisah ini.                                          |
| `PROD_DASHBOARD_PORT` | `20130`      | `docker-compose.prod.yml`  | Port yang dipublikasikan di sisi host untuk Dashboard dalam mode produksi Docker.                     |
| `PROD_API_PORT`       | `20131`      | `docker-compose.prod.yml`  | Port yang dipublikasikan di sisi host untuk API dalam mode produksi Docker.                           |
| `OMNIROUTE_PORT`      | _(unset)_    | `src/lib/runtime/ports.ts` | Mengambil prioritas di atas `PORT` saat berjalan di dalam Electron atau wrapper lainnya.              |
| `NODE_ENV`            | `production` | Next.js core               | Mengontrol verbositas logging, caching, ekspos detail error, dan optimasi Next.js.                    |

### Mode Port

```
┌─────────────────────────── Port Tunggal (default) ─────────────────────────┐
│  PORT=20128                                                                 │
│  → Dashboard: http://localhost:20128                                        │
│  → API:       http://localhost:20128/v1/chat/completions                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────── Port Terpisah ───────────────────────────────────┐
│  DASHBOARD_PORT=20128                                                       │
│  API_PORT=20129                                                             │
│  API_HOST=0.0.0.0                                                           │
│  → Dashboard: http://localhost:20128                                        │
│  → API:       http://0.0.0.0:20129/v1/chat/completions                     │
│  Kasus penggunaan: Ekspos API ke LAN sambil membatasi Dashboard ke localhost.│
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────── Docker Production ──────────────────────────────┐
│  PROD_DASHBOARD_PORT=443   PROD_API_PORT=8443                              │
│  → Memetakan port kontainer ke port host di docker-compose.prod.yml.       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Keamanan & Autentikasi

| Variable                      | Default               | Source File                              | Deskripsi                                                                                                                          |
| ----------------------------- | --------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `MACHINE_ID_SALT`             | `endpoint-proxy-salt` | `src/lib/auth`                           | Salt yang digabungkan dengan pengenal perangkat keras untuk fingerprinting mesin. Ubah per-deployment untuk isolasi.               |
| `AUTH_COOKIE_SECURE`          | `false`               | `src/lib/auth`                           | Mengatur flag `Secure` pada cookie sesi. **Harus bernilai `true`** saat berjalan di balik HTTPS.                                   |
| `REQUIRE_API_KEY`             | `false`               | API middleware                           | Saat bernilai `true`, semua permintaan proxy `/v1/*` harus menyertakan kunci API yang valid.                                       |
| `ALLOW_API_KEY_REVEAL`        | `false`               | Dashboard providers page                 | Memungkinkan pengungkapan nilai kunci API penuh di Dashboard UI. Berisiko pada instansi bersama.                                   |
| `NO_LOG_API_KEY_IDS`          | _(empty)_             | `src/lib/compliance/index.ts`            | ID kunci API yang dipisahkan koma yang melewati pencatatan permintaan (kepatuhan GDPR).                                            |
| `MAX_BODY_SIZE_BYTES`         | `10485760` (10 MB)    | `src/shared/middleware/bodySizeGuard.ts` | Ukuran body permintaan maksimum yang diizinkan. Menolak payload yang melebihi batas ini.                                           |
| `CORS_ORIGIN`                 | `*`                   | Next.js middleware                       | Nilai CORS `Access-Control-Allow-Origin`. Batasi untuk produksi.                                                                   |
| `OUTBOUND_SSRF_GUARD_ENABLED` | `true`                | `src/shared/network/outboundUrlGuard.ts` | Memblokir panggilan provider yang menarget rentang IP privat/loopback/link-local. Nonaktifkan hanya di lingkungan pengujian terisolasi. |

### Daftar Periksa Penguatan Keamanan

```bash
# Minimum keamanan produksi:
AUTH_COOKIE_SECURE=true        # Memerlukan HTTPS
REQUIRE_API_KEY=true           # Autentikasi semua panggilan proxy
ALLOW_API_KEY_REVEAL=false     # Jangan pernah ekspos kunci di UI
CORS_ORIGIN=https://your.domain.com
MAX_BODY_SIZE_BYTES=5242880    # Batas 5 MB
```

---

## 5. Sanitasi Input & Perlindungan PII

OmniRoute menyediakan pertahanan dua lapis: pemindaian injeksi di sisi permintaan dan penghapusan PII di sisi respons.

### Sisi Permintaan: Penjaga Injeksi Prompt

| Variable                  | Default   | Source File                              | Deskripsi                                                                                                   |
| ------------------------- | --------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED` | `false`   | `src/middleware/promptInjectionGuard.ts` | Aktifkan pemindaian pesan masuk untuk pola injeksi prompt.                                                  |
| `INPUT_SANITIZER_MODE`    | `warn`    | `src/middleware/promptInjectionGuard.ts` | `warn` = hanya log, `block` = tolak permintaan dengan 400, `redact` = hapus pola mencurigakan.              |
| `INJECTION_GUARD_MODE`    | _(unset)_ | `src/middleware/promptInjectionGuard.ts` | Alias legacy untuk `INPUT_SANITIZER_MODE` — perilaku sama.                                                  |
| `PII_REDACTION_ENABLED`   | `false`   | `src/middleware/promptInjectionGuard.ts` | Deteksi PII (email, telepon, SSN) dalam permintaan masuk.                                                   |

### Sisi Respons: Sanitizer PII

| Variable                         | Default  | Source File               | Deskripsi                                                                                    |
| -------------------------------- | -------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| `PII_RESPONSE_SANITIZATION`      | `false`  | `src/lib/piiSanitizer.ts` | Pindai respons LLM untuk PII yang bocor sebelum dikembalikan ke klien.                       |
| `PII_RESPONSE_SANITIZATION_MODE` | `redact` | `src/lib/piiSanitizer.ts` | `redact` = sembunyikan PII, `warn` = hanya log, `block` = buang seluruh respons.             |

### Skenario

| Skenario                       | Konfigurasi                                                                                                                      |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **Kepatuhan enterprise**       | `INPUT_SANITIZER_ENABLED=true`, `INPUT_SANITIZER_MODE=block`, `PII_REDACTION_ENABLED=true`, `PII_RESPONSE_SANITIZATION=true`     |
| **Hanya pemantauan**           | `INPUT_SANITIZER_ENABLED=true`, `INPUT_SANITIZER_MODE=warn` — mencatat log namun tidak pernah memblokir                          |
| **Penggunaan pribadi**         | Biarkan semua dinonaktifkan — tanpa overhead                                                                                     |

---

## 6. Kebijakan Alat & Routing

| Variable           | Default    | Source File             | Deskripsi                                                                                                                                              |
| ------------------ | ---------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TOOL_POLICY_MODE` | `disabled` | `src/lib/toolPolicy.ts` | Mengontrol akses pemanggilan alat/fungsi LLM. `allowlist` = hanya alat yang terdaftar, `denylist` = semua kecuali yang terdaftar, `disabled` = tanpa batasan. |

---

## 7. URL & Sinkronisasi Cloud

| Variable                | Default                  | Source File                                 | Deskripsi                                                                                                                  |
| ----------------------- | ------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `BASE_URL`              | `http://localhost:20128` | `src/lib/cloudSync.ts`                      | URL sisi server untuk pekerjaan sinkronisasi internal memanggil `/api/sync/cloud`.                                         |
| `CLOUD_URL`             | _(empty)_                | `src/lib/cloudSync.ts`                      | URL endpoint relay cloud (fitur premium).                                                                                  |
| `CLOUD_SYNC_TIMEOUT_MS` | `12000`                  | `src/lib/cloudSync.ts`                      | Batas waktu HTTP untuk permintaan sinkronisasi cloud.                                                                      |
| `NEXT_PUBLIC_BASE_URL`  | `http://localhost:20128` | OAuth, Dashboard, sync                      | URL publik untuk redirect_uri OAuth, tautan Dashboard. **Harus cocok dengan URL publik Anda di balik reverse proxy.**      |
| `NEXT_PUBLIC_CLOUD_URL` | _(empty)_                | Client-side                                 | Cerminan sisi klien dari `CLOUD_URL`.                                                                                      |
| `NEXT_PUBLIC_APP_URL`   | _(unset)_                | `src/shared/services/cloudSyncScheduler.ts` | Fallback legacy untuk `NEXT_PUBLIC_BASE_URL`.                                                                              |

> [!IMPORTANT]
> Saat melakukan deployment di balik reverse proxy (nginx, Caddy), `NEXT_PUBLIC_BASE_URL` **harus** diatur ke URL publik Anda (misalnya, `https://omniroute.example.com`). Tanpa ini, callback OAuth akan gagal karena redirect_uri tidak akan cocok.

---

## 8. Proxy Keluar

Arahkan panggilan provider LLM upstream melalui proxy HTTP atau SOCKS5 untuk kontrol egress, geo-routing, atau penyembunyian IP.

| Variable                          | Default   | Source File          | Deskripsi                                                                                                  |
| --------------------------------- | --------- | -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY`             | `true`    | `open-sse/executors` | Aktifkan agen proxy SOCKS5 untuk panggilan upstream.                                                       |
| `NEXT_PUBLIC_ENABLE_SOCKS5_PROXY` | `true`    | Client-side          | Kesadaran sisi klien tentang ketersediaan SOCKS5.                                                          |
| `HTTP_PROXY`                      | _(unset)_ | Node.js standard     | Proxy HTTP untuk panggilan upstream.                                                                       |
| `HTTPS_PROXY`                     | _(unset)_ | Node.js standard     | Proxy HTTPS untuk panggilan upstream.                                                                      |
| `ALL_PROXY`                       | _(unset)_ | Node.js standard     | Proxy universal (mendukung `socks5://`).                                                                   |
| `NO_PROXY`                        | _(unset)_ | Node.js standard     | Nama host/IP yang dipisahkan koma untuk melewati proxy.                                                    |
| `ENABLE_TLS_FINGERPRINT`          | `false`   | `open-sse/executors` | Memalsukan fingerprint TLS menggunakan wreq-js (meniru Chrome 124). Mengatasi pemblokiran JA3/JA4.         |

### Skenario

| Skenario                           | Konfigurasi                                                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **SOCKS5 melalui tunnel SSH**      | `ALL_PROXY=socks5://127.0.0.1:7890`, `ENABLE_SOCKS5_PROXY=true`                                                           |
| **Proxy HTTP korporat**            | `HTTP_PROXY=http://proxy.corp.com:3128`, `HTTPS_PROXY=http://proxy.corp.com:3128`, `NO_PROXY=localhost,internal.corp.com` |
| **Anti-fingerprint**               | `ENABLE_TLS_FINGERPRINT=true` — memerlukan `wreq-js` (sudah disertakan)                                                   |

---

## 9. Integrasi Alat CLI

Mengontrol bagaimana OmniRoute menemukan dan menjalankan sidecar CLI (Claude Code, Codex, dll.).

| Variable                  | Default    | Source File                         | Deskripsi                                                                                        |
| ------------------------- | ---------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| `CLI_MODE`                | `auto`     | `src/shared/services/cliRuntime.ts` | `auto` = cari di PATH sistem; `manual` = gunakan hanya path eksplisit.                           |
| `CLI_EXTRA_PATHS`         | _(unset)_  | `src/shared/services/cliRuntime.ts` | Entri PATH tambahan untuk penemuan biner CLI (dipisahkan titik dua).                             |
| `CLI_CONFIG_HOME`         | _(unset)_  | `src/shared/services/cliRuntime.ts` | Override direktori home untuk membaca konfigurasi CLI (`~/.claude`, `~/.codex`).                 |
| `CLI_ALLOW_CONFIG_WRITES` | `false`    | `src/shared/services/cliRuntime.ts` | Izinkan OmniRoute menulis file konfigurasi CLI (penyegaran token, data sesi).                    |
| `CLI_CLAUDE_BIN`          | `claude`   | `src/shared/services/cliRuntime.ts` | Path kustom ke biner CLI Claude.                                                                 |
| `CLI_CODEX_BIN`           | `codex`    | `src/shared/services/cliRuntime.ts` | Path kustom ke biner CLI Codex.                                                                  |
| `CLI_DROID_BIN`           | `droid`    | `src/shared/services/cliRuntime.ts` | Path kustom ke biner CLI Droid.                                                                  |
| `CLI_OPENCLAW_BIN`        | `openclaw` | `src/shared/services/cliRuntime.ts` | Path kustom ke biner CLI OpenClaw.                                                               |
| `CLI_CURSOR_BIN`          | `agent`    | `src/shared/services/cliRuntime.ts` | Path kustom ke biner agen Cursor.                                                                |
| `CLI_CLINE_BIN`           | `cline`    | `src/shared/services/cliRuntime.ts` | Path kustom ke biner CLI Cline.                                                                  |
| `CLI_CONTINUE_BIN`        | `cn`       | `src/shared/services/cliRuntime.ts` | Path kustom ke biner CLI Continue.                                                               |
| `CLI_QODER_BIN`           | `qoder`    | `src/shared/services/cliRuntime.ts` | Path kustom ke biner CLI Qoder.                                                                  |

### Contoh Docker

```bash
# Mount biner host ke kontainer dan beri tahu OmniRoute lokasinya:
CLI_EXTRA_PATHS=/host-cli/bin
CLI_CONFIG_HOME=/root
CLI_ALLOW_CONFIG_WRITES=true
CLI_CLAUDE_BIN=/host-cli/bin/claude
```

---

## 10. Agen Internal & Integrasi MCP

| Variable                                | Default          | Source File                                 | Deskripsi                                                                                                                              |
| --------------------------------------- | ---------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | deteksi otomatis | `open-sse/mcp-server/server.ts`             | URL eksplisit agar alat MCP/A2A dapat menjangkau OmniRoute. Menimpa deteksi otomatis localhost.                                        |
| `OMNIROUTE_API_KEY`                     | _(unset)_        | MCP/A2A modules                             | Kunci API untuk panggilan alat MCP internal dan skill A2A.                                                                             |
| `OMNIROUTE_API_KEY_ID`                  | _(unset)_        | `open-sse/mcp-server/audit.ts`              | ID kunci untuk atribusi log audit MCP.                                                                                                 |
| `ROUTER_API_KEY`                        | _(unset)_        | Legacy                                      | Alias legacy untuk `OMNIROUTE_API_KEY`.                                                                                                |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false`          | `open-sse/mcp-server/server.ts`             | Terapkan kontrol akses berbasis scope pada panggilan alat MCP.                                                                         |
| `OMNIROUTE_MCP_SCOPES`                  | _(all)_          | `open-sse/mcp-server/server.ts`             | Scope yang dipisahkan koma: `admin`, `combos`, `health`, `models`, `routing`, `budget`, `metrics`, `pricing`, `memory`, `skills`.      |
| `MODEL_SYNC_INTERVAL_HOURS`             | `24`             | `src/shared/services/modelSyncScheduler.ts` | Interval sinkronisasi katalog model dalam jam.                                                                                         |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70`             | `src/server-init.ts`                        | Interval polling batas rate dan kuota provider.                                                                                        |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES` | `false`          | `src/instrumentation-node.ts`               | Nonaktifkan semua layanan latar belakang (sinkronisasi, harga, pembaruan model). Berguna untuk CI/pengujian.                           |
| `OMNIROUTE_BOOTSTRAPPED`                | `false`          | `src/app/(dashboard)/dashboard/page.tsx`    | Diatur ke `true` oleh skrip bootstrap setelah pengaturan awal. Mengontrol visibilitas wizard pengaturan.                               |
| `OMNIROUTE_ALLOW_BODY_PROJECT_OVERRIDE` | `0`              | `open-sse/executors/antigravity.ts`         | Escape hatch: izinkan body permintaan untuk menimpa field proyek Antigravity.                                                          |

### Jembatan CLI OAuth (Internal)

| Variable            | Default          | Source File                     | Deskripsi                                        |
| ------------------- | ---------------- | ------------------------------- | ------------------------------------------------ |
| `OMNIROUTE_SERVER`  | deteksi otomatis | `src/lib/oauth/config/index.ts` | URL server untuk jembatan autentikasi CLI↔OmniRoute. |
| `OMNIROUTE_TOKEN`   | _(unset)_        | `src/lib/oauth/config/index.ts` | Token autentikasi untuk jembatan CLI.             |
| `OMNIROUTE_USER_ID` | `cli`            | `src/lib/oauth/config/index.ts` | ID pengguna untuk sesi jembatan CLI.              |
| `SERVER_URL`        | _(unset)_        | `src/lib/oauth/config/index.ts` | Alias legacy untuk `OMNIROUTE_SERVER`.            |
| `CLI_TOKEN`         | _(unset)_        | `src/lib/oauth/config/index.ts` | Alias legacy untuk `OMNIROUTE_TOKEN`.             |
| `CLI_USER_ID`       | _(unset)_        | `src/lib/oauth/config/index.ts` | Alias legacy untuk `OMNIROUTE_USER_ID`.           |

---

## 11. Kredensial Provider OAuth

Kredensial bawaan untuk **pengembangan localhost**. Untuk deployment jarak jauh, daftarkan milik Anda sendiri di konsol pengembang masing-masing provider.

| Variable                          | Provider                | Catatan                                                                                   |
| --------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| `CLAUDE_OAUTH_CLIENT_ID`          | Claude Code (Anthropic) | Klien publik — tidak perlu secret.                                                        |
| `CLAUDE_CODE_REDIRECT_URI`        | Claude Code             | Timpa redirect URI. Default: `https://platform.claude.com/oauth/code/callback`             |
| `CODEX_OAUTH_CLIENT_ID`           | Codex / OpenAI          | Klien publik.                                                                             |
| `GEMINI_OAUTH_CLIENT_ID`          | Gemini (Google)         | Memerlukan `_SECRET` yang sesuai.                                                         |
| `GEMINI_OAUTH_CLIENT_SECRET`      | Gemini (Google)         | —                                                                                         |
| `QWEN_OAUTH_CLIENT_ID`            | Qwen (Alibaba)          | Klien publik.                                                                             |
| `KIMI_CODING_OAUTH_CLIENT_ID`     | Kimi Coding (Moonshot)  | Klien publik.                                                                             |
| `ANTIGRAVITY_OAUTH_CLIENT_ID`     | Antigravity (Google)    | Memerlukan `_SECRET` yang sesuai.                                                         |
| `ANTIGRAVITY_OAUTH_CLIENT_SECRET` | Antigravity (Google)    | —                                                                                         |
| `GITHUB_OAUTH_CLIENT_ID`          | GitHub Copilot          | Klien publik.                                                                             |
| `QODER_OAUTH_CLIENT_SECRET`       | Qoder                   | —                                                                                         |
| `QODER_OAUTH_AUTHORIZE_URL`       | Qoder                   | Atur untuk mengaktifkan OAuth Qoder.                                                      |
| `QODER_OAUTH_TOKEN_URL`           | Qoder                   | —                                                                                         |
| `QODER_OAUTH_USERINFO_URL`        | Qoder                   | —                                                                                         |
| `QODER_OAUTH_CLIENT_ID`           | Qoder                   | —                                                                                         |
| `QODER_PERSONAL_ACCESS_TOKEN`     | Qoder                   | Fallback kunci API langsung (melewati OAuth).                                             |
| `QODER_CLI_WORKSPACE`             | Qoder                   | ID workspace untuk CLI Qoder.                                                             |
| `OMNIROUTE_QODER_WORKSPACE`       | Qoder                   | Alias untuk `QODER_CLI_WORKSPACE`.                                                        |

> [!WARNING]
>
> 1. Buka [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
> 2. Buat OAuth 2.0 Client ID (tipe: "Web application")
> 3. Tambahkan URL server Anda sebagai Authorized redirect URI
> 4. Ganti nilai kredensial di `.env`.

---

## 12. Override User-Agent Provider

Menimpa header `User-Agent` yang dikirim ke setiap provider upstream. Ini diselesaikan secara dinamis saat runtime oleh kelas dasar executor:

```
process.env[`${PROVIDER_ID}_USER_AGENT`]
```

> **Sumber:** `open-sse/executors/base.ts` → `buildHeaders()`

| Variable                 | Nilai Default                                 | Kapan Diperbarui                                                       |
| ------------------------ | --------------------------------------------- | ---------------------------------------------------------------------- |
| `CLAUDE_USER_AGENT`      | `claude-cli/2.1.145 (external, cli)`          | Saat Anthropic merilis versi CLI baru                                  |
| `CODEX_USER_AGENT`       | `codex-cli/0.132.0 (Windows 10.0.26200; x64)` | Saat OpenAI memperbarui CLI Codex                                      |
| `CODEX_CLIENT_VERSION`   | `0.131.0`                                     | Override versi klien Codex secara independen dari string UA penuh      |
| `GITHUB_USER_AGENT`      | `GitHubCopilotChat/0.45.1`                    | Saat GitHub Copilot Chat diperbarui                                    |
| `ANTIGRAVITY_USER_AGENT` | `antigravity/2.0.1 darwin/arm64`              | Saat Antigravity IDE diperbarui                                        |
| `KIRO_USER_AGENT`        | `AWS-SDK-JS/3.0.0 kiro-ide/1.0.0`             | Saat Kiro IDE diperbarui                                               |
| `QODER_USER_AGENT`       | `Qoder-Cli`                                   | Saat CLI Qoder diperbarui                                              |
| `QWEN_USER_AGENT`        | `QwenCode/0.15.11 (linux; x64)`               | Saat Qwen Code diperbarui                                              |
| `CURSOR_USER_AGENT`      | `connect-es/1.6.1`                            | Saat Cursor diperbarui                                                 |

> [!TIP]
> Anda dapat menambahkan override User-Agent untuk provider **mana pun** menggunakan pola `{PROVIDER_ID}_USER_AGENT`. Executor secara dinamis membangun nama variabel lingkungan.

---

## 13. Kompatibilitas Fingerprint CLI

Saat diaktifkan, OmniRoute mengatur ulang urutan header HTTP dan field body JSON agar cocok dengan tanda tangan persis dari alat CLI resmi. Hal ini mengurangi risiko pemblokiran akun sambil mempertahankan IP proxy Anda.

**Sumber:** `open-sse/config/cliFingerprints.ts`, `open-sse/executors/base.ts`

### Per-Provider

| Variable                   | Efek                                              |
| -------------------------- | ------------------------------------------------- |
| `CLI_COMPAT_CODEX=1`       | Meniru tanda tangan permintaan CLI Codex          |
| `CLI_COMPAT_CLAUDE=1`      | Meniru tanda tangan permintaan Claude Code        |
| `CLI_COMPAT_GITHUB=1`      | Meniru tanda tangan permintaan GitHub Copilot     |
| `CLI_COMPAT_ANTIGRAVITY=1` | Meniru tanda tangan permintaan Antigravity        |
| `CLI_COMPAT_KIRO=1`        | Meniru tanda tangan permintaan Kiro IDE           |
| `CLI_COMPAT_CURSOR=1`      | Meniru tanda tangan permintaan Cursor             |
| `CLI_COMPAT_KIMI_CODING=1` | Meniru tanda tangan permintaan Kimi Coding        |
| `CLI_COMPAT_KILOCODE=1`    | Meniru tanda tangan permintaan Kilo Code          |
| `CLI_COMPAT_CLINE=1`       | Meniru tanda tangan permintaan Cline              |
| `CLI_COMPAT_QWEN=1`        | Meniru tanda tangan permintaan Qwen Code          |

### Global

| Variable           | Efek                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| `CLI_COMPAT_ALL=1` | Aktifkan kompatibilitas fingerprint untuk **semua** provider sekaligus.  |

> [!NOTE]
> Fitur ini bekerja berdampingan dengan override User-Agent (§12). Sistem fingerprint menangani urutan header dan urutan field body, sementara override User-Agent menangani string UA tertentu. Keduanya dapat diaktifkan secara independen.

---

## 14. Provider Kunci API

Kunci API untuk provider yang menggunakan autentikasi langsung. **Pengaturan yang disarankan:** Dashboard → Providers → Add API Key.

Pengaturan melalui variabel lingkungan adalah alternatif untuk deployment Docker atau tanpa antarmuka grafis.

Pola yang dikenali: `{PROVIDER_ID}_API_KEY`

| Variable             | Provider            |
| -------------------- | ------------------- |
| `DEEPSEEK_API_KEY`   | DeepSeek            |
| `GROQ_API_KEY`       | Groq                |
| `XAI_API_KEY`        | xAI (Grok)          |
| `MISTRAL_API_KEY`    | Mistral AI          |
| `PERPLEXITY_API_KEY` | Perplexity          |
| `TOGETHER_API_KEY`   | Together AI         |
| `FIREWORKS_API_KEY`  | Fireworks AI        |
| `CEREBRAS_API_KEY`   | Cerebras            |
| `COHERE_API_KEY`     | Cohere              |
| `NVIDIA_API_KEY`     | NVIDIA NIM          |
| `NEBIUS_API_KEY`     | Nebius (embeddings) |

> [!TIP]
> Kunci yang diatur melalui Dashboard disimpan terenkripsi di SQLite dan mengambil prioritas di atas variabel lingkungan.

---

## 15. Pengaturan Batas Waktu

Semua nilai dalam satuan **milidetik**. Penyelesaian terpusat di `src/shared/utils/runtimeTimeouts.ts`.

### Hierarki Batas Waktu

```
REQUEST_TIMEOUT_MS (global override)
├─→ FETCH_TIMEOUT_MS (upstream provider calls, default: 600000)
│   ├─→ FETCH_HEADERS_TIMEOUT_MS (inherits from FETCH_TIMEOUT_MS)
│   ├─→ FETCH_BODY_TIMEOUT_MS (inherits from FETCH_TIMEOUT_MS)
│   ├─→ TLS_CLIENT_TIMEOUT_MS (inherits from FETCH_TIMEOUT_MS)
│   ├── FETCH_CONNECT_TIMEOUT_MS (independent, default: 30000)
│   └── FETCH_KEEPALIVE_TIMEOUT_MS (independent, default: 4000)
├─→ STREAM_IDLE_TIMEOUT_MS (inherits from REQUEST_TIMEOUT_MS, default: 600000)
└─→ API_BRIDGE_PROXY_TIMEOUT_MS (inherits from REQUEST_TIMEOUT_MS, default: 600000)
    ├─→ API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS (derived, default: 600000)
    ├── API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS (default: 60000)
    ├── API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS (default: 5000)
    └── API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS (default: 0 = disabled)
```

| Variable                                 | Default              | Deskripsi                                                                                                            |
| ---------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`                     | _(unset)_            | Pintasan global — menimpa default `FETCH_TIMEOUT_MS` maupun `STREAM_IDLE_TIMEOUT_MS`.                                |
| `FETCH_TIMEOUT_MS`                       | `600000`             | Total batas waktu permintaan HTTP untuk panggilan provider upstream.                                                 |
| `STREAM_IDLE_TIMEOUT_MS`                 | `600000`             | Keheningan maksimum antar chunk SSE sebelum dibatalkan. Model extended-thinking jarang berhenti lebih dari 90 detik. |
| `FETCH_HEADERS_TIMEOUT_MS`               | = `FETCH_TIMEOUT_MS` | Waktu untuk menerima header respons.                                                                                 |
| `FETCH_BODY_TIMEOUT_MS`                  | = `FETCH_TIMEOUT_MS` | Waktu untuk menerima body respons penuh.                                                                             |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`              | Batas waktu pembentukan koneksi TCP.                                                                                 |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`               | Batas waktu idle socket keep-alive.                                                                                  |
| `TLS_CLIENT_TIMEOUT_MS`                  | = `FETCH_TIMEOUT_MS` | Batas waktu proxy fingerprint TLS (wreq-js).                                                                         |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | `600000`             | Batas waktu hop proxy untuk permintaan jembatan `/v1`.                                                               |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `600000`             | Batas waktu permintaan server keseluruhan untuk jembatan.                                                            |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`              | Waktu untuk mengirim header respons melalui jembatan.                                                                |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`               | Batas waktu idle keep-alive jembatan.                                                                                |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                  | Batas waktu socket mentah (0 = dinonaktifkan).                                                                       |
| `SHUTDOWN_TIMEOUT_MS`                    | `30000`              | Periode grace pada SIGTERM/SIGINT sebelum force-exit.                                                                |

### Skenario

| Skenario                                  | Konfigurasi                                               |
| ----------------------------------------- | --------------------------------------------------------- |
| **Pembuatan kode berjalan lama**          | `REQUEST_TIMEOUT_MS=900000` (15 menit)                    |
| **Fast-fail untuk API produksi**          | `API_BRIDGE_PROXY_TIMEOUT_MS=10000`                       |
| **Model extended thinking**               | `STREAM_IDLE_TIMEOUT_MS=300000` (5 menit antar chunk)     |

---

## 16. Logging

Sistem logging menulis ke stdout dan file log yang dirotasi. Semua konfigurasi dibaca oleh `src/lib/logEnv.ts`.

| Variable                    | Default                    | Deskripsi                                                                              |
| --------------------------- | -------------------------- | -------------------------------------------------------------------------------------- |
| `APP_LOG_LEVEL`             | `info`                     | Level log minimum: `debug`, `info`, `warn`, `error`.                                   |
| `APP_LOG_FORMAT`            | `text`                     | Format output: `text` (mudah dibaca manusia) atau `json` (terstruktur).                |
| `APP_LOG_TO_FILE`           | `true`                     | Tulis log ke file bersama stdout.                                                      |
| `APP_LOG_FILE_PATH`         | `logs/application/app.log` | Path file log (relatif terhadap root proyek atau `DATA_DIR`).                          |
| `APP_LOG_MAX_FILE_SIZE`     | `50M`                      | Ukuran file maksimum sebelum rotasi. Menerima: `50M`, `1G`, `512K`, atau byte biasa.   |
| `APP_LOG_RETENTION_DAYS`    | `7`                        | Hari untuk menyimpan file log aplikasi yang telah dirotasi.                            |
| `APP_LOG_MAX_FILES`         | `20`                       | Maksimum cadangan file log yang telah dirotasi.                                        |
| `CALL_LOG_RETENTION_DAYS`   | `7`                        | Hari untuk menyimpan entri log permintaan/panggilan di database.                       |
| `CALL_LOG_MAX_ENTRIES`      | `10000`                    | Maksimum entri log panggilan dalam buffer in-memory.                                   |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`                   | Maksimum baris dalam tabel SQLite `call_logs` sebelum dipangkas.                       |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`                   | Maksimum baris dalam tabel SQLite `proxy_logs` sebelum dipangkas.                      |

---

## 17. Optimasi Memori

| Variable                   | Default                         | Deskripsi                                                                                              |
| -------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_MEMORY_MB`      | `512`                           | Batas heap V8 saat runtime. Docker standalone dan `omniroute serve` menggunakannya untuk mengatur `--max-old-space-size`. |
| `PROMPT_CACHE_MAX_SIZE`    | `50`                            | Maksimum entri prompt sistem yang dicache.                                                             |
| `PROMPT_CACHE_MAX_BYTES`   | `2097152` (2 MB)                | Ukuran total cache prompt maksimum.                                                                    |
| `PROMPT_CACHE_TTL_MS`      | `300000` (5 menit)              | TTL entri cache prompt.                                                                                |
| `SEMANTIC_CACHE_MAX_SIZE`  | `100`                           | Maksimum respons temperature=0 yang dicache.                                                           |
| `SEMANTIC_CACHE_MAX_BYTES` | `4194304` (4 MB)                | Ukuran total cache semantik maksimum.                                                                  |
| `SEMANTIC_CACHE_TTL_MS`    | `1800000` (30 menit)            | TTL entri cache semantik.                                                                              |
| `STREAM_HISTORY_MAX`       | `50`                            | Maksimum event stream terbaru dalam buffer tampilan langsung Dashboard.                                |
| `CONTEXT_LENGTH_DEFAULT`   | `128000`                        | Panjang konteks maksimum fallback global untuk model tanpa konfigurasi eksplisit.                      |
| `USAGE_TOKEN_BUFFER`       | `100`                           | Cadangan token ekstra yang disisihkan saat melacak kuota penggunaan.                                   |

### Contoh Docker RAM Rendah

```bash
OMNIROUTE_MEMORY_MB=128
PROMPT_CACHE_MAX_SIZE=20
PROMPT_CACHE_MAX_BYTES=524288        # 512 KB
SEMANTIC_CACHE_MAX_SIZE=25
SEMANTIC_CACHE_MAX_BYTES=1048576     # 1 MB
STREAM_HISTORY_MAX=10
```

---

## 18. Sinkronisasi Harga

Sinkronisasi data harga model secara otomatis dari sumber eksternal.

| Variable                | Default       | Source File              | Deskripsi                                         |
| ----------------------- | ------------- | ------------------------ | ------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`       | `src/lib/pricingSync.ts` | Opt-in sinkronisasi harga berkala.                |
| `PRICING_SYNC_INTERVAL` | `86400` (24h) | `src/lib/pricingSync.ts` | Interval sinkronisasi dalam detik.                |
| `PRICING_SYNC_SOURCES`  | `litellm`     | `src/lib/pricingSync.ts` | Sumber data yang dipisahkan koma.                 |

---

## 19. Sinkronisasi Model (Dev)

| Variable                   | Default       | Source File                | Deskripsi                                                               |
| -------------------------- | ------------- | -------------------------- | ----------------------------------------------------------------------- |
| `MODELS_DEV_SYNC_INTERVAL` | `86400` (24h) | `src/lib/modelsDevSync.ts` | Interval sinkronisasi katalog model saat pengembangan dalam detik.      |

---

## 20. Pengaturan Spesifik Provider

| Variable                                  | Default               | Source File                                | Deskripsi                                                                                             |
| ----------------------------------------- | --------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `OPENROUTER_CATALOG_TTL_MS`               | `86400000` (24h)      | `src/lib/catalog/openrouterCatalog.ts`     | TTL cache katalog model OpenRouter.                                                                   |
| `NANOBANANA_POLL_TIMEOUT_MS`              | `120000`              | `open-sse/handlers/imageGeneration.ts`     | Waktu tunggu maksimum untuk pekerjaan pembuatan gambar NanoBanana.                                    |
| `NANOBANANA_POLL_INTERVAL_MS`             | `2500`                | `open-sse/handlers/imageGeneration.ts`     | Frekuensi polling pekerjaan NanoBanana.                                                               |
| `CLOUDFLARE_ACCOUNT_ID`                   | _(unset)_             | `open-sse/executors/cloudflare-ai.ts`      | ID akun untuk Cloudflare Workers AI.                                                                  |
| `CLOUDFLARED_BIN`                         | deteksi otomatis      | `src/lib/cloudflaredTunnel.ts`             | Path kustom ke biner `cloudflared`.                                                                   |
| `SEARCH_CACHE_TTL_MS`                     | `300000` (5 menit)    | `open-sse/services/searchCache.ts`         | TTL untuk caching respons API pencarian (Perplexity, Brave, dll.).                                    |
| `ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE` | `false`               | `src/app/api/providers/route.ts`           | Izinkan beberapa koneksi simultan per provider yang kompatibel dengan OpenAI.                         |
| `ENABLE_CC_COMPATIBLE_PROVIDER`           | `false`               | `src/shared/utils/featureFlags.ts`         | Aktifkan endpoint provider eksperimental yang kompatibel dengan Claude Code.                          |
| `CLIPROXYAPI_HOST`                        | `127.0.0.1`           | `open-sse/executors/cliproxyapi.ts`        | Host jembatan CLIProxyAPI (integrasi legacy).                                                         |
| `CLIPROXYAPI_PORT`                        | `5544`                | `open-sse/executors/cliproxyapi.ts`        | Port jembatan CLIProxyAPI.                                                                            |
| `CLIPROXYAPI_CONFIG_DIR`                  | `~/.cli-proxy-api`    | `src/lib/versionManager/processManager.ts` | Direktori konfigurasi CLIProxyAPI.                                                                    |
| `LOCAL_HOSTNAMES`                         | _(empty)_             | `open-sse/config/providerRegistry.ts`      | Nama host tambahan yang dipisahkan koma yang diperlakukan sebagai "lokal" (nama layanan Docker, dll.). |

---

## 21. Kesehatan Proxy

| Variable                     | Default             | Source File                              | Deskripsi                                                                                                                          |
| ---------------------------- | ------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`              | `src/lib/proxyHealth.ts`                 | Batas waktu pemeriksaan kesehatan fast-fail.                                                                                       |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`             | `src/lib/proxyHealth.ts`                 | TTL cache hasil pemeriksaan kesehatan.                                                                                             |
| `RATE_LIMIT_MAX_WAIT_MS`     | `120000` (2 menit)  | `open-sse/services/rateLimitManager.ts`  | Waktu tunggu maksimum pada respons 429 sebelum menggagalkan permintaan.                                                            |
| `REQUEST_RETRY`              | `2`                 | `src/sse/services/cooldownAwareRetry.ts` | Jumlah percobaan ulang otomatis pada respons cooldown berbasis model sebelum mengembalikan error ke klien.                          |
| `MAX_RETRY_INTERVAL_SEC`     | `30`                | `src/sse/services/cooldownAwareRetry.ts` | Interval backoff maksimum (detik) antar percobaan ulang cooldown. Dibatasi oleh nilai ini terlepas dari `Retry-After` upstream.    |

---

## 22. Debugging

> [!CAUTION]
> Variabel-variabel ini menghasilkan **output yang sangat detail** dan dapat membocorkan data sensitif. **Jangan pernah aktifkan di lingkungan produksi.**

| Variable                         | Default   | Source File                               | Deskripsi                                                                          |
| -------------------------------- | --------- | ----------------------------------------- | ---------------------------------------------------------------------------------- |
| `CURSOR_PROTOBUF_DEBUG`          | _(unset)_ | `open-sse/utils/cursorProtobuf.ts`        | Atur ke `1` untuk membuang detail decode/encode protobuf Cursor.                   |
| `CURSOR_STREAM_DEBUG`            | _(unset)_ | `open-sse/executors/cursor.ts`            | Atur ke `1` untuk membuang data stream SSE Cursor mentah.                          |
| `DEBUG_RESPONSES_SSE_TO_JSON`    | _(unset)_ | `open-sse/handlers/responseTranslator.ts` | Atur ke `true` untuk mencatat log detail translasi SSE→JSON Responses API.         |
| `NEXT_PUBLIC_OMNIROUTE_E2E_MODE` | _(unset)_ | E2E test harness                          | Atur ke `true` untuk mengaktifkan mode pengujian E2E (autentikasi santai, test hook). |

---

## 23. Integrasi GitHub

Memungkinkan pengguna melaporkan masalah langsung dari Dashboard.

| Variable              | Default   | Source File                             | Deskripsi                                                            |
| --------------------- | --------- | --------------------------------------- | -------------------------------------------------------------------- |
| `GITHUB_ISSUES_REPO`  | _(unset)_ | `src/app/api/v1/issues/report/route.ts` | Repositori dalam format `owner/repo`.                                |
| `GITHUB_ISSUES_TOKEN` | _(unset)_ | `src/app/api/v1/issues/report/route.ts` | GitHub Personal Access Token dengan scope `issues:write`.            |

---

## Skenario Deployment

### Pengembangan Lokal Minimal

```bash
JWT_SECRET=$(openssl rand -base64 48)
API_KEY_SECRET=$(openssl rand -hex 32)
INITIAL_PASSWORD=dev123
PORT=20128
NODE_ENV=development
```

### Docker Production

```bash
JWT_SECRET=<generated>
API_KEY_SECRET=<generated>
INITIAL_PASSWORD=<generated>
STORAGE_ENCRYPTION_KEY=<generated>
DATA_DIR=/data
PORT=20128
API_PORT=20129
NODE_ENV=production
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=true
NEXT_PUBLIC_BASE_URL=https://omniroute.example.com
BASE_URL=http://localhost:20128
OMNIROUTE_MEMORY_MB=512
CORS_ORIGIN=https://your-frontend.example.com
```

### Air-Gapped / CI

```bash
JWT_SECRET=test-jwt-secret-for-ci
API_KEY_SECRET=test-api-key-secret-for-ci
INITIAL_PASSWORD=testpass
NODE_ENV=production
OMNIROUTE_DISABLE_BACKGROUND_SERVICES=true
APP_LOG_TO_FILE=false
```

### VPS dengan Reverse Proxy (nginx + Cloudflare)

```bash
JWT_SECRET=<generated>
API_KEY_SECRET=<generated>
STORAGE_ENCRYPTION_KEY=<generated>
PORT=20128
AUTH_COOKIE_SECURE=true
REQUIRE_API_KEY=true
NEXT_PUBLIC_BASE_URL=https://omniroute.example.com
BASE_URL=http://127.0.0.1:20128
CORS_ORIGIN=https://omniroute.example.com
ENABLE_TLS_FINGERPRINT=true
CLI_COMPAT_ALL=1
```

---

## Audit: Variabel yang Dihapus / Tidak Aktif

Variabel-variabel berikut muncul di versi sebelumnya dari `.env.example` tetapi **tidak memiliki referensi runtime** di basis kode saat ini. Variabel-variabel ini telah dihapus:

| Variable                                              | Alasan                                                                                                                            |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `STORAGE_DRIVER=sqlite`                               | Tidak pernah dibaca oleh file sumber mana pun. SQLite adalah satu-satunya driver yang didukung — tidak diperlukan pemilihan.       |
| `INSTANCE_NAME=omniroute`                             | Ada di template docs/env lama tetapi tidak digunakan saat runtime. Mungkin kembali dalam fitur multi-instansi di masa depan.      |
| `SQLITE_MAX_SIZE_MB=2048`                             | Tidak dirujuk dalam kode sumber. Ukuran database tidak dibatasi secara artifisial.                                                |
| `SQLITE_CLEAN_LEGACY_FILES=true`                      | Tidak dirujuk dalam kode sumber. Pembersihan legacy kemungkinan telah dihapus.                                                    |
| `CLI_ROO_BIN`                                         | Tidak terdaftar di `src/shared/services/cliRuntime.ts`.                                                                           |
| `CLI_KIMI_CODING_BIN`                                 | Tidak terdaftar di `src/shared/services/cliRuntime.ts` (Kimi Coding menggunakan OAuth, bukan biner CLI).                          |
| `IFLOW_OAUTH_CLIENT_ID` / `IFLOW_OAUTH_CLIENT_SECRET` | Tidak dirujuk di mana pun dalam kode sumber.                                                                                      |

### Koreksi Nilai Default

| Variable                  | Nilai `.env.example` Lama | Default Kode Aktual | Diperbaiki                                                         |
| ------------------------- | ------------------------- | ------------------- | ------------------------------------------------------------------ |
| `APP_LOG_RETENTION_DAYS`  | `90`                      | `7`                 | ✅ Nilai yang menyesatkan dihapus; `7` didokumentasikan sebagai default |
| `CALL_LOG_RETENTION_DAYS` | `90`                      | `7`                 | ✅ Nilai yang menyesatkan dihapus; `7` didokumentasikan sebagai default |
