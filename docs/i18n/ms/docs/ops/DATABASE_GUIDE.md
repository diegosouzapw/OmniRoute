# Database Schema & Operations Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute menggunakan **SQLite dengan penjurnalan WAL** sebagai stor utama, dengan penyulitan **AES-256-GCM** ketika disimpan untuk medan sensitif. Panduan ini merangkumi skema, migrasi, sandaran/pemulihan, dan buku panduan operasi.

**Sumber:**

- `src/lib/db/core.ts` — tika tunggal + SCHEMA_SQL (17 jadual asas)
- `src/lib/db/migrationRunner.ts` — migrasi berversi
- `src/lib/db/migrations/` — 167 fail SQL berversi
- `src/lib/db/encryption.ts` — pembantu penyulitan
- `src/lib/db/backup.ts` — eksport/import sandaran
- `src/lib/db/healthCheck.ts` — diagnostik kesihatan

---

## Mengapa SQLite?

OmniRoute memilih SQLite berbanding PostgreSQL/MySQL atas beberapa sebab:

| Faktor             | SQLite                                         | PostgreSQL                                         |
| ------------------ | ---------------------------------------------- | -------------------------------------------------- |
| **Penggunaan**     | Terbenam — tiada pelayan berasingan            | Memerlukan penyediaan pelayan                      |
| **Penyulitan**     | Lapisan aplikasi (AES-256-GCM)                 | TDE terbina dalam                                  |
| **Prestasi**       | Lebih pantas untuk beban kerja kecil/sederhana | Lebih baik untuk penulisan serentak berskala besar |
| **Keserentakan**   | Mod WAL membenarkan pembacaan serentak         | MVCC penuh                                         |
| **Sandaran**       | Salinan fail tunggal                           | `pg_dump` atau syot kilat sistem fail              |
| **Kes penggunaan** | Pemasangan per pengguna, terbenam              | SaaS berbilang penyewa                             |

Untuk penggunaan **pengguna tunggal, tika tunggal** (kes penggunaan utama OmniRoute), SQLite lebih ringkas dan pantas.

### Penjurnalan WAL

`core.ts` membuka pangkalan data dengan **mod WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL membenarkan **pembacaan serentak** semasa penulisan — penting untuk papan pemuka, yang membuat pertanyaan ketika permintaan sedang direkodkan.

Saiz cache lalai ialah **65,536 KiB (64 MiB)**. SQLite mentafsirkan `cache_size`
negatif sebagai had atas anggaran dalam KiB dan memperuntukkan halaman mengikut
keperluan. **Tetapan > Sistem & Storan > Saiz Cache** menerima nilai integer dari
**1 hingga 1,000,000 KiB**; penyimpanan tetapan akan menerapkannya pada sambungan
pangkalan data aktif, dan OmniRoute memulihkan nilai tersimpan ketika dimulakan.

---

## Lokasi Pangkalan Data

Fail SQLite disimpan di:

| OS      | Laluan                                                                 |
| ------- | ---------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                          |
| macOS   | `~/.omniroute/storage.sqlite`                                          |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                              |
| Docker  | `/app/data/storage.sqlite` (boleh dikonfigurasikan melalui `DATA_DIR`) |

Fail pendamping:

- `storage.sqlite-wal` — log tulis awal
- `storage.sqlite-shm` — fail memori dikongsi
- `call_logs/` — artifak muatan permintaan (jika didayakan)

**Gantikan lokasi:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Seni Bina Modul Domain

Pangkalan data OmniRoute mempunyai **110 modul TypeScript peringkat atas** dalam `src/lib/db/`. Setiap modul domain:

- Memiliki satu atau lebih jadual khusus
- Mengeksport fungsi CRUD berjenis
- Tidak pernah mengakses jadual modul lain
- Menggunakan `getDbInstance()` daripada `core.ts` untuk mengakses DB

### 110 Modul DB Peringkat Atas

OmniRoute mempunyai **110 fail TypeScript peringkat atas** dalam `src/lib/db/`. Di bawah ialah sampel modul teras; lihat penyenaraian direktori untuk senarai lengkap:

| Modul                   | Jadual                                                         | Tanggungjawab                                                             |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Pendaftaran dan kelayakan penyedia melalui OAuth/kunci API                |
| `models.ts`             | `key_value` (data model)                                       | Takrifan model, keupayaan, penetapan harga                                |
| `combos.ts`             | `combos`                                                       | Konfigurasi dan susunan penghalaan kombo                                  |
| `apiKeys.ts`            | `api_keys`                                                     | Kitar hayat kunci API, skop, penjejakan kuota                             |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfigurasi sistem dan stor KV dikongsi                                   |
| `backup.ts`             | —                                                              | Operasi eksport/import sandaran                                           |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfigurasi proksi dan peraturan penghalaan                               |
| `prompts.ts`            | `prompt_templates`                                             | Templat gesaan boleh guna semula, pengurusan versi                        |
| `webhooks.ts`           | `webhooks`                                                     | Langganan dan log webhook berasaskan peristiwa                            |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Pengelogan audit bagi setiap permintaan (pilihan, volum tinggi)           |
| `domainState.ts`        | `domain_*` (5 jadual)                                          | Belanjawan domain, pemutus litar, sekatan, rantaian sandaran, sejarah kos |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Kunci API yang disenaraikan putih untuk MCP/A2A                           |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Penggunaan kuota sejarah                                                  |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Memetakan model kepada kombo lalai                                        |
| `cliToolState.ts`       | `cli_tool_state`                                               | Keadaan berterusan khusus CLI                                             |
| `encryption.ts`         | —                                                              | Pembantu untuk menyulitkan/menyahsulit medan                              |
| `readCache.ts`          | —                                                              | Cache dalam memori untuk operasi intensif baca                            |
| `secrets.ts`            | `key_value` (entri disulitkan)                                 | Storan rahsia disulitkan                                                  |
| `stateReset.ts`         | —                                                              | Menghapuskan/menetapkan semula keadaan DB untuk pengujian                 |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Konteks sesi untuk penyerahan ejen                                        |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Penjejakan penggunaan                                                     |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfigurasi pemampatan                                                    |

### Sempadan Modul

Peraturan seni bina teras: **modul tidak mengakses jadual modul lain secara langsung**. Untuk menggunakan data modul lain, import fungsi daripada modul tersebut.

```ts
// ❌ SALAH: SQL langsung daripada modul lain
db.prepare("SELECT * FROM provider_connections").all();

// ✅ BETUL: gunakan fungsi modul penyedia
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Peraturan ini dikuatkuasakan melalui semakan kod — tiada pemeriksaan statik, tetapi pelanggaran akan ditandakan.

---

## Skema Asas (17 jadual)

`core.ts` mentakrifkan 17 jadual asas dalam `SCHEMA_SQL`. Jadual-jadual ini dicipta oleh migrasi `001_initial_schema.sql` dan membentuk skema teras.

### Jadual Teras (dicipta dalam migrasi awal)

| Jadual                     | Tujuan                                | Lajur utama                                                             |
| -------------------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Bukti kelayakan penyedia (disulitkan) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Maklumat penghalaan nod penyedia      | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Storan KV umum                        | `namespace`, `key`, `value`                                             |
| `combos`                   | Takrif gabungan penghalaan            | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Kunci API untuk get laluan            | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata pangkalan data               | `key`, `value`                                                          |
| `usage_history`            | Rekod penggunaan permintaan           | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Muatan permintaan & respons           | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Log permintaan proksi                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Rantaian model kepada penyedia        | `model`, `chain`                                                        |
| `domain_budgets`           | Belanjawan perbelanjaan setiap domain | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Sejarah penetapan semula belanjawan   | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Penjejakan kos setiap domain          | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Keadaan had kadar domain              | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Keadaan pemutus litar setiap domain   | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache respons LLM                     | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Syot kilat kuota bersejarah           | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Jadual Tambahan (ditambah oleh migrasi kemudian)

Migrasi seterusnya menambah jadual seperti:

- `cli_tool_state` (migrasi 011) — keadaan alat CLI
- Jadual `mcp_*` — audit pelayan MCP
- Jadual `a2a_*` — keadaan tugas A2A
- Jadual `usage_*` — penjejakan penggunaan
- Jadual `plugin_*` — sistem pemalam
- `skill_executions` — sejarah pelaksanaan kemahiran
- Jadual `memory_*` — sistem memori
- Jadual `compression_*` — sistem pemampatan
- Jadual `webhook_*` — log penghantaran webhook
- Jadual `acp_*` — Protokol Klien Ejen
- Jadual `oneproxy_*` — pasaran 1proxy
- `proxy_assignments` — pengikatan skop proksi
- `detailed_call_artifacts` — metadata artifak log panggilan
- `quota_alert_history` — audit amaran kuota
- `command_code_auth_sessions` — sesi OAuth Command Code

Senarai penuh kira-kira 30+ jadual terdapat dalam `src/lib/db/migrations/`.

---

## Migrasi

OmniRoute menggunakan **migrasi berversi dan idempoten** dalam `src/lib/db/migrations/`. Setiap migrasi ialah satu fail SQL yang dinamakan `NNN_description.sql`.

### Penamaan Migrasi

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Cara Migrasi Dijalankan

Semasa permulaan, `migrationRunner.ts`:

1. Mencipta jadual `_omniroute_migrations` jika belum wujud
2. Membuat pertanyaan untuk mendapatkan migrasi yang telah digunakan
3. Menggunakan sebarang migrasi baharu mengikut turutan, setiap satu dalam transaksi
4. Merekodkan setiap migrasi yang digunakan berserta cap masa

```ts
// src/lib/db/migrationRunner.ts (dipermudahkan)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotensi

Migrasi mestilah **idempoten** — menjalankannya dua kali sepatutnya tidak menghasilkan sebarang perubahan:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Gunakan klausa `IF NOT EXISTS`, `IF EXISTS` dan `OR IGNORE` / `OR REPLACE` dengan sewajarnya.

### Menambah Migrasi Baharu

1. **Kenal pasti nombor seterusnya**: `ls src/lib/db/migrations/ | tail -1`
2. **Cipta fail**: `NNN_my_change.sql`
3. **Gunakan DDL yang selamat**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Isi semula data dengan berhati-hati**: gunakan `UPDATE ... WHERE ...` untuk mengendalikan baris sedia ada
5. **Uji pada salinan**: jangan sekali-kali menjalankan migrasi yang belum diuji pada persekitaran produksi

Contoh:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Perubahan yang tidak serasi dengan versi terdahulu** (contohnya, menggugurkan lajur) adalah rumit. OmniRoute TIDAK menyokong penurunan versi — sebaik sahaja migrasi digunakan, perubahan skema tersebut adalah kekal. Rancang dengan sewajarnya.

---

## Penyulitan Data Tersimpan

Medan sensitif (kunci API, token OAuth, rentetan sambungan) disulitkan semasa disimpan menggunakan **AES-256-GCM**.

### Cara Ia Berfungsi

```ts
// src/lib/db/encryption.ts (dipermudahkan)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Tempat Ia Digunakan

- `provider_connections.api_key` — disulitkan pada peringkat aplikasi
- `provider_connections.access_token`, `refresh_token`, `id_token` — disulitkan pada peringkat aplikasi
- Entri `key_value` dengan `namespace = "secrets"` — disulitkan pada peringkat aplikasi
- `proxy_registry.auth` — disulitkan pada peringkat aplikasi (jika ada)

### Kunci Penyulitan

Kunci penyulitan diperoleh daripada **frasa laluan** (ditetapkan melalui pemboleh ubah persekitaran `STORAGE_ENCRYPTION_KEY`) dan **salt** (disimpan dalam DB). Kedua-duanya diperlukan untuk menyahsulit data.

```bash
# Jana frasa laluan yang selamat
openssl rand -hex 32

# Tetapkan dalam .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritikal**: Kehilangan kunci penyulitan bermakna kehilangan akses kepada semua data yang disulitkan. **Sandarkan kunci secara berasingan daripada pangkalan data**.

### Perkara yang TIDAK Disulitkan

Atas sebab prestasi, perkara berikut disimpan dalam bentuk teks biasa:

- Nama paparan penyedia
- Takrifan model (sememangnya tersedia secara umum)
- Peraturan penghalaan
- Rekod penggunaan (tiada PII)

---

## Peringatan Penyulitan (v3.8.16+)

OmniRoute menggunakan **`migrateLegacyEncryptedString()`** untuk mengendalikan dua skim penyulitan secara telus:

- **Legasi** (sebelum v3.5.0): "penyulitan" berasaskan XOR (bukan kriptografi sebenar)
- **Semasa**: AES-256-GCM dengan IV dan tag pengesahan yang betul

Pembantu migrasi mengesan format legasi dan menyulitkannya semula menggunakan skim baharu ketika bacaan pertama. Ini bermakna anda boleh menaik taraf pangkalan data lama tanpa kehilangan kelayakan.

---

## Cache Bacaan

Untuk data yang kerap dibaca (model, penyedia, tetapan), `readCache.ts` menyediakan **cache dalam memori**:

```ts
// Dicache semasa permulaan, dibatalkan apabila ditulis
const providers = await getCachedProviders(); // Pantas, dalam memori
const fresh = await listProviders(); // Perlahan, mengakses DB
```

| Entiti yang dicache    | Kunci cache    | TTL              |
| ---------------------- | -------------- | ---------------- |
| `models`               | `models:v1`    | Sehingga ditulis |
| `provider_connections` | `providers:v1` | Sehingga ditulis |
| `settings`             | `settings:v1`  | Sehingga ditulis |
| `combos`               | `combos:v1`    | Sehingga ditulis |

Cache dibatalkan pada setiap penulisan ke jadual yang sepadan.

---

## Sandaran dan Pemulihan

### Sandaran Manual

```bash
# Gunakan CLI untuk mencipta sandaran setempat
omniroute backup create --name pre-migration

# Atau melalui API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Fail sandaran merangkumi:

- Semua jadual DB (disirikan kepada JSON)
- Artifak log panggilan (dikodkan dengan base64, pilihan)
- Tetapan + rahsia (disulitkan)
- Konfigurasi pemalam

### Pemulihan

```bash
# Melalui CLI
omniroute restore pre-migration

# Melalui API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Amaran**: Pemulihan menulis ganti keseluruhan DB. Hentikan semua klien terlebih dahulu.

### Sandaran Automatik

```bash
# Dayakan sandaran harian automatik melalui CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Jadual dilaksanakan pada bahagian pelayan oleh tugas latar belakang yang berjalan setiap 30 saat
(lalai) dan menilai ungkapan cron berdasarkan waktu tempatan pelayan.

| Pemboleh ubah                               | Lalai   | Penerangan                                                                                                                 |
| ------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Selang masa dalam ms (min `5000`). Mestilah kurang daripada 60 s untuk memastikan ia berada dalam minit cron yang sepadan. |

### Sandaran Langsung SQLite

Untuk membuat sandaran pangkalan data aktif tanpa masa henti:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ini menggunakan API sandaran dalam talian SQLite — selamat dijalankan semasa OmniRoute sedang berjalan.

---

## Penalaan Prestasi

### Mod WAL

WAL didayakan secara lalai. Untuk beban kerja dengan kadar tulis yang tinggi, pertimbangkan:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Titik semak setiap 1000 halaman
PRAGMA journal_size_limit = 67108864;  -- Had WAL 64MB
```

### Indeks

Indeks utama untuk prestasi (dicipta secara automatik oleh migrasi):

- `idx_models_provider` — carian model mengikut penyedia
- `idx_combo_targets_combo_id` — pengembangan sasaran kombo
- `idx_usage_history_api_key_timestamp` — analitik penggunaan
- `idx_quota_snapshots_api_key_window` — penjejakan kuota
- `idx_call_logs_timestamp` — pertanyaan log panggilan

Untuk menambah indeks baharu, cipta migrasi:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O Dipetakan Memori

Untuk pangkalan data yang sangat besar (>10GB), pemetaan memori boleh dilaraskan melalui pragma SQLite:

```sql
-- Tetapkan melalui pragma SQLite (laraskan dalam core.ts atau masa jalan)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Pemadatan

Tika OmniRoute yang berjalan dalam jangka masa panjang mendapat manfaat daripada pelaksanaan `VACUUM` sekali-sekala:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Jalankan setiap bulan semasa tempoh trafik rendah. (Mod WAL mengurangkan keperluan tersebut, tetapi tidak menghapuskannya.)

---

## Semakan Kesihatan

`src/lib/db/healthCheck.ts` menyediakan **diagnostik kesihatan peringkat DB**:

Kedua-dua kata kerja memerlukan pengesahan (`401` jika tiada). `GET` hanya menjalankan diagnosis; `POST` menjalankan
semakan yang sama dengan `autoRepair` didayakan.

```bash
GET  /api/db/health   # diagnosis
POST /api/db/health   # diagnosis + pembaikan
```

Respons ialah `DbHealthCheckResult` yang dihasilkan oleh `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domain budgets referenced API keys that no longer exist.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Medan             | Maksud                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` apabila `issues` kosong. `driver` tidak pernah mempengaruhinya.                                                                                                    |
| `issues[].type`   | Salah satu daripada `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                      |
| `repairedCount`   | Baris yang dibaiki semasa pelaksanaan ini; sentiasa `0` apabila `autoRepair` ialah false.                                                                                 |
| `backupCreated`   | Sama ada sandaran telah dibuat sebelum pembaikan.                                                                                                                         |
| `checkedAt`       | Cap masa ISO yang dikongsi oleh pelaksanaan dan sebarang nota pembaikan yang ditulisnya.                                                                                  |
| `driver.name`     | Pemacu SQLite yang menyediakan pangkalan data yang disemak.                                                                                                               |
| `driver.degraded` | `true` apabila penulisan tidak disandarkan secara kekal oleh fail pangkalan data — sandaran WASM `sql.js` (pengekalan keseluruhan fail) atau pangkalan data dalam memori. |

Muatan yang sama dikembalikan oleh alat MCP `omniroute_db_health_check`.

Jalankan `PRAGMA integrity_check` untuk mengesan kerosakan:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Sepatutnya memaparkan: ok
```

Jika ia mengembalikan apa-apa selain `ok`, **hentikan penggunaan pangkalan data dengan serta-merta** dan pulihkan daripada sandaran.

---

## Pemulihan Bencana

### Senario 1: Fail WAL Hilang

Fail `-wal` hilang tetapi `-shm` dan DB utama masih utuh:

```bash
# Pulih secara automatik apabila dibuka seterusnya
omniroute
```

Jika SQLite tidak dapat melakukan pemulihan automatik:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Senario 2: Fail DB Utama Rosak

Pulihkan daripada sandaran:

```bash
omniroute sync pull --merge   # atau: omniroute backup restore <backup-id>
```

### Senario 3: Kunci Penyulitan Hilang

**Pemulihan tidak boleh dilakukan** tanpa kunci tersebut. Medan yang disulitkan tidak boleh dibaca. Tambahkan semula semua penyedia secara manual dengan kelayakan baharu.

> **Mitigasi**: Sentiasa sandarkan kunci penyulitan secara berasingan, sebaik-baiknya dalam pengurus kata laluan atau KMS.

### Senario 4: Cakera Penuh

SQLite akan mengembalikan ralat `SQLITE_FULL`. Kosongkan ruang cakera, kemudian:

```bash
# Lakukan titik semak WAL untuk mengosongkan ruang
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operasi Lazim

### Periksa Jadual

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Kira Baris dalam Semua Jadual

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Tetapkan Semula (Padam) Semua Data

```bash
# Hentikan OmniRoute terlebih dahulu
omniroute stop

# Padam fail DB
rm ~/.omniroute/storage.sqlite*

# Mulakan semula (akan mencipta semula DB kosong)
omniroute
```

Untuk penetapan semula **terpilih** (kekalkan penyedia, padam data penggunaan):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Eksport Satu Jadual

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Penyelesaian Masalah

### "Pangkalan data dikunci"

Proses lain sedang memegang kunci tulis. Anda boleh:

- Tunggu sehingga proses lain selesai (semak `lsof | grep storage.sqlite`)
- Tamatkan proses lain
- Jika masalah berterusan, mulakan semula OmniRoute

### "Kekangan kunci asing gagal"

Modul domain melanggar integriti rujukan. Semak:

- Baris yatim dalam jadual bersandar
- Pemadaman lata yang tidak disebarkan
- Migrasi terkini yang mengubah kunci asing

Jalankan `PRAGMA foreign_key_check;` untuk mencari pelanggaran.

### "Kehabisan memori"

I/O berpeta memori SQLite melebihi had OS. Kurangkan melalui pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB dan bukannya 256MB
```

Atau nyahdayakannya:

```sql
PRAGMA mmap_size = 0;
```

### "Migrasi gagal di pertengahan proses"

Migrasi dijalankan dalam transaksi, jadi ia sepatutnya telah digulung balik. Jika tidak:

1. **Hentikan OmniRoute** (cegah percubaan selanjutnya)
2. **Semak keadaan DB** dengan `sqlite3`
3. **Baiki secara manual** migrasi separa
4. **Jalankan semula** OmniRoute (migrasi akan dicuba semula)

Untuk mencegah perkara ini, sentiasa uji migrasi pada salinan terlebih dahulu.

---

## Lihat Juga

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — jadual penggunaan
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — pemantauan kesihatan
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — aliran keluaran
- Sumber: `src/lib/db/` (80+ fail, ~25K baris kod)
