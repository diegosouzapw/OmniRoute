# Compliance & Audit (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Sumber acuan:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute mencatat tindakan administratif, peristiwa autentikasi, perubahan
siklus hidup kredensial penyedia, dan pemanggilan alat MCP ke tabel audit
berbasis SQLite. Halaman ini membahas apa saja yang dicatat, lokasi penyimpanannya,
berapa lama data dipertahankan, bagaimana API key dapat memilih untuk tidak
dicatat, dan cara mengueri data tersebut.

Implementasinya berada di `src/lib/compliance/index.ts` (T-43 — "Kontrol
Kepatuhan") dan `src/lib/compliance/providerAudit.ts`. Penulisan audit tidak
pernah melemparkan error: jika terjadi kegagalan, pemanggilan akan diabaikan
secara diam-diam agar pencatatan audit tidak mengganggu alur permintaan utama.

## Apa Saja yang Dicatat

### Peristiwa audit administratif (`audit_log`)

Setiap pemanggilan `logAuditEvent({ action, actor, target, details, ... })`
menghasilkan satu baris. String tindakan mengikuti pola `domain.verb` (atau
`domain.verb.outcome`). Jenis tindakan yang telah dikonfirmasi dalam source tree
meliputi:

| Tindakan                             | Sumber                                  |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Setiap entri merekam `action`, `actor` (nilai default-nya adalah `"system"`),
`target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id`, dan `timestamp`. Key sensitif (`apiKey`, `accessToken`,
`refreshToken`, `password`, apa pun yang cocok dengan `*token`/`*secret`/`*apikey`,
dan sebagainya) disunting secara rekursif menjadi `"[redacted]"` sebelum baris
ditulis.

### Pemanggilan alat MCP (`mcp_tool_audit`)

Setiap pemanggilan alat MCP menulis satu baris melalui
`open-sse/mcp-server/audit.ts`. Skema (dari
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Kolom            | Catatan                                    |
| ---------------- | ------------------------------------------ |
| `id`             | bertambah otomatis                         |
| `tool_name`      | pengidentifikasi alat MCP                  |
| `input_hash`     | sha256 input (payload tidak disimpan)      |
| `output_summary` | ringkasan singkat yang dipotong            |
| `duration_ms`    | waktu nyata yang berlalu                   |
| `api_key_id`     | pemanggil (dapat bernilai null)            |
| `success`        | `1` / `0`                                  |
| `error_code`     | kode error terminal saat terjadi kegagalan |
| `created_at`     | stempel waktu ISO                          |

### Log permintaan / penggunaan

Data ini merupakan telemetri operasional (bukan sepenuhnya audit administratif),
tetapi menggunakan pipeline retensi yang sama:

- `usage_history` — agregasi penggunaan per permintaan
- `call_logs` — log lengkap per permintaan (tunduk pada batas jumlah baris, lihat di bawah)
- `proxy_logs` — log lalu lintas proxy (tunduk pada batas jumlah baris)
- `request_detail_logs` — log permintaan terperinci versi lama (tetap dipangkas jika tersedia)

## Skema Penyimpanan

`audit_log` dibuat secara lazy oleh `ensureAuditLogSchema()` saat pertama kali digunakan:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Indeks dibuat pada `timestamp`, `action`, `actor`, `resource_type`,
`status`, dan `request_id`. Kolom yang tidak ada pada basis data lama ditambahkan melalui
`ALTER TABLE` sesuai kebutuhan.

## Retensi & Pembersihan

Dua periode retensi terpisah diterapkan:

| Variabel lingkungan         | Default  | Berlaku untuk                                                     |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Pemangkasan batas baris untuk `call_logs`                         |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Pemangkasan batas baris untuk `proxy_logs`                        |

`cleanupExpiredLogs()` menjalankan proses retensi. Fungsi ini dipanggil saat server dimulai
dari `src/instrumentation-node.ts`. Setiap proses mencatat peristiwa audit
`compliance.cleanup` beserta jumlah penghapusan per tabel. Pemangkasan log proxy/panggilan
dilakukan secara berkelompok (`BATCH_SIZE = 5000`) untuk menghindari penguncian penulisan yang lama.

Pembersihan riwayat permintaan secara manual terpisah dari retensi. Halaman Log Permintaan
memanggil `POST /api/settings/purge-request-history`, yang menghapus `call_logs`,
`request_detail_logs` lama, dan artefak permintaan lokal di bawah
`${DATA_DIR}/call_logs/`.

Nilai default ditentukan dalam `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Penyisihan `noLog` (per kunci API)

Kunci API dapat ditandai agar lalu lintas panggilan hilirnya tidak dicatat. Penanda
tersebut disimpan di tabel `api_keys` (`no_log INTEGER DEFAULT 0`) dan disalin
ke set dalam memori untuk pencarian pada jalur cepat.

```bash
# Buat kunci tanpa pencatatan (memerlukan autentikasi manajemen)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Fungsi pembantu (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — aktifkan atau nonaktifkan entri dalam memori
- `isNoLog(apiKeyId)` — diperiksa pada jalur permintaan; jika tidak tersedia, menggunakan pembacaan
  `api_keys.no_log` yang disimpan dalam cache selama 30 detik
- `NO_LOG_API_KEY_IDS` (variabel lingkungan, dipisahkan dengan koma) — dimuat terlebih dahulu ke set dalam memori
  saat proses dimulai; berguna ketika Anda tidak dapat mengubah kolom secara langsung

Peristiwa audit administratif (login, perubahan penyedia, panggilan alat MCP, dan sebagainya)
**tidak** terpengaruh oleh `noLog` — penyisihan hanya berlaku untuk pencatatan lalu lintas
per permintaan.

## REST API

| Endpoint                    | Metode | Deskripsi                                   | Autentikasi |
| --------------------------- | ------ | ------------------------------------------- | ----------- |
| `/api/compliance/audit-log` | `GET`  | Entri audit admin berpaginasi dengan filter | management  |
| `/api/mcp/audit`            | `GET`  | Entri audit alat MCP berpaginasi            | (open-sse)  |
| `/api/mcp/audit/stats`      | `GET`  | Statistik audit MCP teragregasi             | (open-sse)  |

Saat ini tidak tersedia endpoint ekspor CSV — lakukan ekspor dari dasbor atau kueri
database SQLite secara langsung.

### Mengueri `/api/compliance/audit-log`

Parameter kueri yang didukung (semuanya opsional, semua menggunakan pencocokan
`LIKE %value%` untuk filter teks):

- `action`, `actor`, `target`, `resourceType` (atau `resource_type`),
  `status`, `requestId` (atau `request_id`)
- `from` / `since`, `to` / `until` — stempel waktu ISO
- `limit` (default `50`, min `1`, maks `500`)
- `offset` (default `0`, maks `10_000`)

Respons berupa larik JSON. Metadata paginasi dikembalikan dalam header:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dasbor

Dasbor menampilkan data audit di **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Halaman ini memiliki dua tab:

- **Kepatuhan** (`ComplianceTab.tsx`) — peristiwa audit admin dari
  `/api/compliance/audit-log`. Memfilter berdasarkan jenis peristiwa, tingkat keparahan (info / peringatan
  / kritis, diturunkan dari tindakan + status), dan rentang tanggal. Tingkat keparahan
  dihitung di sisi klien dari string tindakan/status.
- **MCP** (`McpAuditTab.tsx`) — audit alat MCP dari `/api/mcp/audit`, dengan
  filter berdasarkan nama alat dan keberhasilan/kegagalan.

Kedua tab menggunakan paginasi dengan ukuran halaman `50` (kepatuhan) dan `25` (MCP).

## Helper Kredensial Penyedia

`src/lib/compliance/providerAudit.ts` menyediakan helper pembentukan data yang digunakan oleh
rute pengelolaan penyedia saat menghasilkan peristiwa kredensial:

- `summarizeProviderConnectionForAudit(connection)` — menghapus `apiKey`,
  `accessToken`, `refreshToken`, `idToken`, dan
  `providerSpecificData.consoleApiKey` sebelum snapshot koneksi
  ditulis ke `details`.
- `getProviderAuditTarget(connection)` — menyusun string
  `"<provider>:<name|id>"` yang stabil untuk bidang `target`.
- `extractProviderWarnings(...payloads)` — memindai respons penyedia untuk mencari
  peringatan kebijakan/keamanan (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) dan
  menampilkan hingga 5 kecocokan, masing-masing dipotong menjadi 400 karakter.

## Praktik Terbaik

- Tandai kunci API yang menangani PII (hukum, medis, dll.) dengan `noLog: true`.
- Sesuaikan `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` agar memenuhi
  kebijakan retensi Anda. Nilai default 7 hari bersifat konservatif.
- Ekspor tabel audit ke luar platform (`sqlite3 dump`) dengan frekuensi apa pun
  yang diwajibkan oleh program kepatuhan Anda — tidak tersedia pengarsipan bawaan.
- Pantau jumlah `auth.login.failed` dan `auth.login.locked` untuk mendeteksi
  serangan brute-force.
- Saat menambahkan endpoint admin baru, panggil `logAuditEvent({ ... })` dengan string tindakan
  `domain.verb.outcome` yang stabil dan teruskan konteks permintaan melalui
  `getAuditRequestContext(request)` agar IP dan `requestId` dicatat
  secara otomatis.

## Lihat Juga

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — penyamaran PII, injeksi prompt
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalog dan cakupan alat MCP
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — referensi lengkap variabel lingkungan
- Sumber: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
