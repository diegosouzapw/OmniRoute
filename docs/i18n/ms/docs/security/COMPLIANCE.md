# Compliance & Audit (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Sumber rujukan utama:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute merekodkan tindakan pentadbiran, peristiwa pengesahan, perubahan kitar hayat kelayakan penyedia, dan pemanggilan alat MCP ke dalam jadual audit berasaskan SQLite. Halaman ini menerangkan perkara yang direkodkan, lokasi penyimpanannya, tempoh penyimpanannya, cara kunci API boleh memilih untuk tidak menyertainya, dan cara membuat pertanyaan terhadap data tersebut.

Pelaksanaannya terdapat dalam `src/lib/compliance/index.ts` (T-43 — "Kawalan Pematuhan") dan `src/lib/compliance/providerAudit.ts`. Penulisan audit tidak pernah mencetuskan ralat: sekiranya berlaku sebarang kegagalan, panggilan tersebut diabaikan secara senyap supaya pengelogan audit tidak menjejaskan aliran permintaan utama.

## Perkara yang Direkodkan

### Peristiwa audit pentadbiran (`audit_log`)

Setiap panggilan kepada `logAuditEvent({ action, actor, target, details, ... })` menghasilkan satu baris. Rentetan tindakan mengikut corak `domain.verb` (atau `domain.verb.outcome`). Jenis tindakan yang disahkan dalam pepohon sumber termasuk:

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

Setiap entri merekodkan `action`, `actor` (lalai kepada `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id`, dan `timestamp`. Kunci sensitif (`apiKey`, `accessToken`, `refreshToken`, `password`, apa-apa yang sepadan dengan `*token`/`*secret`/`*apikey`, dan sebagainya) disunting secara rekursif kepada `"[redacted]"` sebelum baris tersebut ditulis.

### Panggilan alat MCP (`mcp_tool_audit`)

Setiap pemanggilan alat MCP menulis satu baris melalui `open-sse/mcp-server/audit.ts`. Skema (daripada `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Lajur            | Catatan                                      |
| ---------------- | -------------------------------------------- |
| `id`             | penambahan automatik                         |
| `tool_name`      | pengecam alat MCP                            |
| `input_hash`     | sha256 input (tiada muatan disimpan)         |
| `output_summary` | ringkasan pendek yang dipenggal              |
| `duration_ms`    | masa sebenar                                 |
| `api_key_id`     | pemanggil (boleh `null`)                     |
| `success`        | `1` / `0`                                    |
| `error_code`     | kod ralat terminal apabila berlaku kegagalan |
| `created_at`     | cap masa ISO                                 |

### Log permintaan / penggunaan

Ini ialah telemetri operasi (bukan audit pentadbiran dalam erti kata yang ketat), tetapi berkongsi saluran pengekalan yang sama:

- `usage_history` — ringkasan penggunaan bagi setiap permintaan
- `call_logs` — log penuh bagi setiap permintaan (tertakluk pada had baris, lihat di bawah)
- `proxy_logs` — log trafik proksi (tertakluk pada had baris)
- `request_detail_logs` — log permintaan terperinci legasi (masih dipangkas jika wujud)

## Skema Storan

`audit_log` dicipta secara malas oleh `ensureAuditLogSchema()` pada penggunaan pertama:

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

Indeks dicipta pada `timestamp`, `action`, `actor`, `resource_type`,
`status`, dan `request_id`. Lajur yang tiada pada DB legasi ditambahkan melalui
`ALTER TABLE` apabila diperlukan.

## Pengekalan & Pembersihan

Dua tempoh pengekalan berasingan dipatuhi:

| Pemboleh ubah persekitaran  | Lalai    | Digunakan untuk                                                   |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Pemangkasan had baris untuk `call_logs`                           |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Pemangkasan had baris untuk `proxy_logs`                          |

`cleanupExpiredLogs()` menjalankan proses pengekalan. Ia dipanggil semasa pelayan dimulakan
daripada `src/instrumentation-node.ts`. Setiap pelaksanaan merekodkan peristiwa audit
`compliance.cleanup` dengan bilangan pemadaman bagi setiap jadual. Pemangkasan log proksi/panggilan
dilakukan secara kelompok (`BATCH_SIZE = 5000`) untuk mengelakkan kunci tulis yang berpanjangan.

Pembersihan sejarah permintaan secara manual adalah berasingan daripada pengekalan. Halaman Log Permintaan
memanggil `POST /api/settings/purge-request-history`, yang memadamkan `call_logs`,
`request_detail_logs` legasi, dan artifak permintaan setempat di bawah
`${DATA_DIR}/call_logs/`.

Nilai lalai ditakrifkan dalam `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Pilihan Keluar `noLog` (bagi setiap kunci API)

Kunci API boleh ditandakan supaya trafik panggilan hilirannya tidak dilog. Tanda tersebut
disimpan dalam jadual `api_keys` (`no_log INTEGER DEFAULT 0`) dan dicerminkan
ke dalam set dalam memori untuk carian laluan pantas.

```bash
# Cipta kunci tanpa log (pengesahan pengurusan diperlukan)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Pembantu (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — togol entri dalam memori
- `isNoLog(apiKeyId)` — disemak pada laluan permintaan; jika gagal, beralih kepada bacaan
  bercache selama 30 s daripada `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, dipisahkan dengan koma) — dipramuatkan ke dalam set dalam memori
  semasa but; berguna apabila anda tidak boleh menogol lajur secara langsung

Peristiwa audit pentadbiran (log masuk, perubahan penyedia, panggilan alat MCP, dan sebagainya)
**tidak** dipengaruhi oleh `noLog` — hanya pengelogan trafik bagi setiap permintaan yang
dikecualikan.

## REST API

| Titik akhir                 | Kaedah | Penerangan                                      | Pengesahan |
| --------------------------- | ------ | ----------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET`  | Entri audit pentadbir berhalaman dengan penapis | management |
| `/api/mcp/audit`            | `GET`  | Entri audit alat MCP berhalaman                 | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`  | Statistik audit MCP teragregat                  | (open-sse) |

Tiada titik akhir eksport CSV disediakan pada masa ini — eksport daripada papan pemuka atau buat pertanyaan
terus pada pangkalan data SQLite.

### Membuat pertanyaan kepada `/api/compliance/audit-log`

Parameter pertanyaan yang disokong (semuanya pilihan, semuanya menggunakan pemadanan `LIKE %value%` untuk
penapis teks):

- `action`, `actor`, `target`, `resourceType` (atau `resource_type`),
  `status`, `requestId` (atau `request_id`)
- `from` / `since`, `to` / `until` — cap masa ISO
- `limit` (lalai `50`, minimum `1`, maksimum `500`)
- `offset` (lalai `0`, maksimum `10_000`)

Respons ialah tatasusunan JSON. Metadata penomboran halaman dikembalikan dalam pengepala:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Papan Pemuka

Papan pemuka memaparkan data audit di **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Halaman ini mempunyai dua tab:

- **Pematuhan** (`ComplianceTab.tsx`) — peristiwa audit pentadbir daripada
  `/api/compliance/audit-log`. Menapis mengikut jenis peristiwa, tahap keterukan (maklumat / amaran
  / kritikal, diterbitkan daripada tindakan + status), dan julat tarikh. Tahap keterukan
  dikira pada sisi klien daripada rentetan tindakan/status.
- **MCP** (`McpAuditTab.tsx`) — audit alat MCP daripada `/api/mcp/audit`, dengan
  penapis mengikut nama alat dan berjaya/gagal.

Kedua-dua tab menggunakan penomboran halaman dengan saiz halaman `50` (pematuhan) dan `25` (MCP).

## Pembantu Kelayakan Penyedia

`src/lib/compliance/providerAudit.ts` menyediakan pembantu pembentukan yang digunakan oleh laluan
pengurusan penyedia apabila ia menghasilkan peristiwa kelayakan:

- `summarizeProviderConnectionForAudit(connection)` — membuang `apiKey`,
  `accessToken`, `refreshToken`, `idToken`, dan
  `providerSpecificData.consoleApiKey` sebelum syot kilat sambungan
  ditulis ke `details`.
- `getProviderAuditTarget(connection)` — membentuk rentetan
  `"<provider>:<name|id>"` yang stabil untuk medan `target`.
- `extractProviderWarnings(...payloads)` — mengimbas respons penyedia untuk
  amaran dasar/keselamatan (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) dan
  memaparkan sehingga 5 padanan, setiap satunya dipendekkan kepada 400 aksara.

## Amalan Terbaik

- Tandakan kunci API yang mengendalikan PII (undang-undang, perubatan dan sebagainya) dengan `noLog: true`.
- Laraskan `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` untuk memenuhi
  dasar pengekalan anda. Nilai lalai 7 hari adalah konservatif.
- Eksport jadual audit ke luar platform (`sqlite3 dump`) mengikut kekerapan yang
  diperlukan oleh program pematuhan anda — tiada pengarkiban terbina dalam.
- Jejaki kiraan `auth.login.failed` dan `auth.login.locked` untuk pengesanan
  serangan daya kasar.
- Apabila menambah titik akhir pentadbir baharu, panggil `logAuditEvent({ ... })` dengan rentetan tindakan
  `domain.verb.outcome` yang stabil dan hantarkan konteks permintaan melalui
  `getAuditRequestContext(request)` supaya IP dan `requestId` direkodkan
  secara automatik.

## Lihat Juga

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — penyamaran PII, suntikan gesaan
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalog alat dan skop MCP
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — rujukan lengkap pemboleh ubah persekitaran
- Sumber: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
