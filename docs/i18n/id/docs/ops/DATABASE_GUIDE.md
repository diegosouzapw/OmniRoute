# Database Schema & Operations Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute menggunakan **SQLite dengan penjurnalan WAL** sebagai penyimpanan utamanya, dengan enkripsi **AES-256-GCM** untuk data sensitif yang tersimpan. Panduan ini membahas skema, migrasi, pencadangan/pemulihan, dan panduan operasional.

**Sumber:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabel dasar)
- `src/lib/db/migrationRunner.ts` — migrasi berversi
- `src/lib/db/migrations/` — 167 file SQL berversi
- `src/lib/db/encryption.ts` — fungsi bantuan enkripsi
- `src/lib/db/backup.ts` — ekspor/impor cadangan
- `src/lib/db/healthCheck.ts` — diagnostik kesehatan

---

## Mengapa SQLite?

OmniRoute memilih SQLite dibandingkan PostgreSQL/MySQL karena beberapa alasan:

| Faktor               | SQLite                                       | PostgreSQL                                         |
| -------------------- | -------------------------------------------- | -------------------------------------------------- |
| **Penerapan**        | Tertanam — tidak memerlukan server terpisah  | Memerlukan penyiapan server                        |
| **Enkripsi**         | Lapisan aplikasi (AES-256-GCM)               | TDE bawaan                                         |
| **Performa**         | Lebih cepat untuk beban kerja kecil/menengah | Lebih baik untuk penulisan serentak berskala besar |
| **Konkurensi**       | Mode WAL memungkinkan pembacaan serentak     | MVCC penuh                                         |
| **Pencadangan**      | Penyalinan satu file                         | `pg_dump` atau snapshot sistem file                |
| **Kasus penggunaan** | Instalasi per pengguna, tertanam             | SaaS multi-tenant                                  |

Untuk penerapan **pengguna tunggal, instans tunggal** (kasus penggunaan utama OmniRoute), SQLite lebih sederhana dan lebih cepat.

### Penjurnalan WAL

`core.ts` membuka basis data dengan **mode WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL memungkinkan **pembacaan serentak** selama proses penulisan — hal ini penting untuk dasbor, yang menjalankan kueri ketika permintaan sedang dicatat.

Ukuran cache default adalah **65.536 KiB (64 MiB)**. SQLite menafsirkan nilai negatif
`cache_size` sebagai perkiraan batas atas dalam KiB dan mengalokasikan halaman sesuai kebutuhan.
**Pengaturan > Sistem & Penyimpanan > Ukuran Cache** menerima nilai bilangan bulat dari **1 hingga
1.000.000 KiB**; menyimpan pengaturan akan menerapkannya ke koneksi basis data aktif,
dan OmniRoute memulihkan nilai yang tersimpan saat dimulai.

---

## Lokasi Basis Data

File SQLite disimpan di:

| OS      | Jalur                                                               |
| ------- | ------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                       |
| macOS   | `~/.omniroute/storage.sqlite`                                       |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                           |
| Docker  | `/app/data/storage.sqlite` (dapat dikonfigurasi melalui `DATA_DIR`) |

File pendamping:

- `storage.sqlite-wal` — log write-ahead
- `storage.sqlite-shm` — file memori bersama
- `call_logs/` — artefak payload permintaan (jika diaktifkan)

**Ganti lokasi:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arsitektur Modul Domain

Database OmniRoute memiliki **110 modul TypeScript tingkat atas** di `src/lib/db/`. Setiap modul domain:

- Memiliki satu atau beberapa tabel tertentu
- Mengekspor fungsi CRUD yang memiliki tipe
- Tidak pernah mengakses tabel milik modul lain
- Menggunakan `getDbInstance()` dari `core.ts` untuk mengakses DB

### 110 Modul DB Tingkat Atas

OmniRoute memiliki **110 file TypeScript tingkat atas** di `src/lib/db/`. Berikut adalah beberapa contoh modul inti; lihat daftar direktori untuk daftar lengkapnya:

| Modul                   | Tabel                                                          | Tanggung Jawab                                                               |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Pendaftaran dan kredensial penyedia melalui OAuth/kunci API                  |
| `models.ts`             | `key_value` (data model)                                       | Definisi model, kapabilitas, harga                                           |
| `combos.ts`             | `combos`                                                       | Konfigurasi dan urutan perutean kombo                                        |
| `apiKeys.ts`            | `api_keys`                                                     | Siklus hidup kunci API, cakupan, pelacakan kuota                             |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfigurasi sistem dan penyimpanan KV bersama                                |
| `backup.ts`             | —                                                              | Operasi ekspor/impor cadangan                                                |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfigurasi proksi dan aturan perutean                                       |
| `prompts.ts`            | `prompt_templates`                                             | Templat prompt yang dapat digunakan kembali, pembuatan versi                 |
| `webhooks.ts`           | `webhooks`                                                     | Langganan dan log webhook berbasis peristiwa                                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Pencatatan audit per permintaan (opsional, volume tinggi)                    |
| `domainState.ts`        | `domain_*` (5 tabel)                                           | Anggaran domain, pemutus sirkuit, penguncian, rantai fallback, riwayat biaya |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Kunci API yang diizinkan untuk MCP/A2A                                       |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Riwayat penggunaan kuota                                                     |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Memetakan model ke kombo default                                             |
| `cliToolState.ts`       | `cli_tool_state`                                               | Status persisten khusus CLI                                                  |
| `encryption.ts`         | —                                                              | Fungsi pembantu untuk mengenkripsi/mendekripsi bidang                        |
| `readCache.ts`          | —                                                              | Cache dalam memori untuk operasi yang banyak melakukan pembacaan             |
| `secrets.ts`            | `key_value` (entri terenkripsi)                                | Penyimpanan rahasia terenkripsi                                              |
| `stateReset.ts`         | —                                                              | Menghapus/mengatur ulang status DB untuk pengujian                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Konteks sesi untuk serah terima agen                                         |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Pelacakan penggunaan                                                         |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfigurasi kompresi                                                         |

### Batasan Modul

Aturan arsitektur inti: **modul tidak mengakses tabel milik modul lain secara langsung**. Untuk bekerja dengan data modul lain, impor fungsi dari modul tersebut.

```ts
// ❌ SALAH: SQL langsung dari modul lain
db.prepare("SELECT * FROM provider_connections").all();

// ✅ BENAR: gunakan fungsi dari modul providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Aturan ini diberlakukan melalui tinjauan kode — tidak ada pemeriksaan statis, tetapi pelanggaran akan ditandai.

---

## Skema Dasar (17 tabel)

`core.ts` mendefinisikan 17 tabel dasar dalam `SCHEMA_SQL`. Tabel-tabel ini dibuat oleh migrasi `001_initial_schema.sql` dan membentuk skema inti.

### Tabel Inti (dibuat dalam migrasi awal)

| Tabel                      | Tujuan                            | Kolom utama                                                             |
| -------------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Kredensial penyedia (terenkripsi) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informasi perutean node penyedia  | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Penyimpanan KV umum               | `namespace`, `key`, `value`                                             |
| `combos`                   | Definisi kombinasi perutean       | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Kunci API untuk gateway           | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata basis data               | `key`, `value`                                                          |
| `usage_history`            | Catatan penggunaan permintaan     | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Muatan permintaan & respons       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Log permintaan proksi             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Rantai model-ke-penyedia          | `model`, `chain`                                                        |
| `domain_budgets`           | Anggaran pengeluaran per domain   | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Riwayat pengaturan ulang anggaran | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Pelacakan biaya per domain        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Status pembatasan laju domain     | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Status circuit breaker per domain | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache respons LLM                 | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Snapshot kuota historis           | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabel Tambahan (ditambahkan oleh migrasi berikutnya)

Migrasi berikutnya menambahkan tabel seperti:

- `cli_tool_state` (migrasi 011) — status alat CLI
- Tabel `mcp_*` — audit server MCP
- Tabel `a2a_*` — status tugas A2A
- Tabel `usage_*` — pelacakan penggunaan
- Tabel `plugin_*` — sistem plugin
- `skill_executions` — riwayat eksekusi keterampilan
- Tabel `memory_*` — sistem memori
- Tabel `compression_*` — sistem kompresi
- Tabel `webhook_*` — log pengiriman webhook
- Tabel `acp_*` — Agent Client Protocol
- Tabel `oneproxy_*` — marketplace 1proxy
- `proxy_assignments` — pengikatan cakupan proksi
- `detailed_call_artifacts` — metadata artefak log panggilan
- `quota_alert_history` — audit peringatan kuota
- `command_code_auth_sessions` — sesi OAuth Command Code

Daftar lengkap sekitar 30+ tabel tersedia di `src/lib/db/migrations/`.

---

## Migrasi

OmniRoute menggunakan **migrasi berversi dan idempoten** di `src/lib/db/migrations/`. Setiap migrasi merupakan satu file SQL bernama `NNN_description.sql`.

### Penamaan Migrasi

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Cara Migrasi Dijalankan

Saat aplikasi dimulai, `migrationRunner.ts`:

1. Membuat tabel `_omniroute_migrations` jika belum ada
2. Mencari migrasi yang sudah diterapkan
3. Menerapkan setiap migrasi baru secara berurutan, masing-masing dalam satu transaksi
4. Mencatat setiap migrasi yang diterapkan beserta stempel waktunya

```ts
// src/lib/db/migrationRunner.ts (disederhanakan)
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

Migrasi harus **idempoten** — menjalankannya dua kali seharusnya tidak melakukan apa pun:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Gunakan klausa `IF NOT EXISTS`, `IF EXISTS`, dan `OR IGNORE` / `OR REPLACE` secara luas.

### Menambahkan Migrasi Baru

1. **Identifikasi nomor berikutnya**: `ls src/lib/db/migrations/ | tail -1`
2. **Buat file**: `NNN_my_change.sql`
3. **Gunakan DDL yang aman**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Isi ulang data dengan hati-hati**: gunakan `UPDATE ... WHERE ...` untuk menangani baris yang sudah ada
5. **Uji pada salinan**: jangan pernah menjalankan migrasi yang belum diuji di lingkungan produksi

Contoh:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Perubahan yang tidak kompatibel dengan versi sebelumnya** (misalnya, menghapus kolom) cukup rumit. OmniRoute TIDAK mendukung penurunan versi — setelah suatu migrasi diterapkan, perubahan skema tersebut bersifat permanen. Rencanakan dengan tepat.

---

## Enkripsi Data Tersimpan

Kolom sensitif (kunci API, token OAuth, string koneksi) dienkripsi saat disimpan menggunakan **AES-256-GCM**.

### Cara Kerjanya

```ts
// src/lib/db/encryption.ts (disederhanakan)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Tempat Penggunaannya

- `provider_connections.api_key` — dienkripsi pada tingkat aplikasi
- `provider_connections.access_token`, `refresh_token`, `id_token` — dienkripsi pada tingkat aplikasi
- Entri `key_value` dengan `namespace = "secrets"` — dienkripsi pada tingkat aplikasi
- `proxy_registry.auth` — dienkripsi pada tingkat aplikasi (jika ada)

### Kunci Enkripsi

Kunci enkripsi diturunkan dari sebuah **frasa sandi** (ditetapkan melalui variabel lingkungan `STORAGE_ENCRYPTION_KEY`) dan sebuah **salt** (disimpan di DB). Keduanya diperlukan untuk mendekripsi data.

```bash
# Buat frasa sandi yang aman
openssl rand -hex 32

# Tetapkan di .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Penting**: Kehilangan kunci enkripsi berarti kehilangan akses ke seluruh data terenkripsi. **Cadangkan kunci secara terpisah dari basis data**.

### Data yang TIDAK Dienkripsi

Demi alasan performa, data berikut disimpan dalam bentuk teks biasa:

- Nama tampilan penyedia
- Definisi model (sudah tersedia untuk publik)
- Aturan perutean
- Catatan penggunaan (tanpa PII)

---

## Catatan Penting Enkripsi (v3.8.16+)

OmniRoute menggunakan **`migrateLegacyEncryptedString()`** untuk menangani dua skema enkripsi secara transparan:

- **Lama** (sebelum v3.5.0): "enkripsi" berbasis XOR (bukan kriptografi yang sebenarnya)
- **Saat ini**: AES-256-GCM dengan IV dan tag autentikasi yang tepat

Helper migrasi mendeteksi format lama dan mengenkripsi ulang menggunakan skema baru saat pertama kali dibaca. Artinya, Anda dapat memutakhirkan database lama tanpa kehilangan kredensial.

---

## Cache Baca

Untuk data yang sering dibaca (model, penyedia, pengaturan), `readCache.ts` menyediakan **cache dalam memori**:

```ts
// Di-cache saat startup, diinvalidasi saat penulisan
const providers = await getCachedProviders(); // Cepat, dalam memori
const fresh = await listProviders(); // Lambat, mengakses DB
```

| Entitas yang di-cache  | Kunci cache    | TTL                  |
| ---------------------- | -------------- | -------------------- |
| `models`               | `models:v1`    | Hingga ada penulisan |
| `provider_connections` | `providers:v1` | Hingga ada penulisan |
| `settings`             | `settings:v1`  | Hingga ada penulisan |
| `combos`               | `combos:v1`    | Hingga ada penulisan |

Cache diinvalidasi setiap kali terjadi penulisan ke tabel terkait.

---

## Pencadangan dan Pemulihan

### Pencadangan Manual

```bash
# Gunakan CLI untuk membuat cadangan lokal
omniroute backup create --name pre-migration

# Atau melalui API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

File cadangan mencakup:

- Semua tabel DB (diserialisasi ke JSON)
- Artefak log panggilan (dikodekan dengan base64, opsional)
- Pengaturan + rahasia (dienkripsi)
- Konfigurasi plugin

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

> **Peringatan**: Pemulihan akan menimpa seluruh DB. Hentikan semua klien terlebih dahulu.

### Pencadangan Otomatis

```bash
# Aktifkan pencadangan harian otomatis melalui CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Jadwal dijalankan di sisi server oleh tugas latar belakang yang berdetak setiap 30 detik
(secara default) dan mengevaluasi ekspresi cron berdasarkan waktu lokal server.

| Variabel                                    | Default | Deskripsi                                                                                                                |
| ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Interval detak dalam ms (min `5000`). Harus lebih pendek dari 60 dtk agar dapat tepat masuk dalam menit cron yang cocok. |

### Pencadangan Langsung SQLite

Untuk pencadangan DB aktif tanpa waktu henti:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Perintah ini menggunakan API pencadangan online SQLite — aman dijalankan saat OmniRoute sedang berjalan.

---

## Penyetelan Performa

### Mode WAL

WAL diaktifkan secara default. Untuk beban kerja dengan operasi tulis tinggi, pertimbangkan:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint setiap 1000 halaman
PRAGMA journal_size_limit = 67108864;  -- Batas WAL 64MB
```

### Indeks

Indeks utama untuk performa (dibuat secara otomatis oleh migrasi):

- `idx_models_provider` — pencarian model berdasarkan penyedia
- `idx_combo_targets_combo_id` — ekspansi target combo
- `idx_usage_history_api_key_timestamp` — analitik penggunaan
- `idx_quota_snapshots_api_key_window` — pelacakan kuota
- `idx_call_logs_timestamp` — kueri log panggilan

Untuk menambahkan indeks baru, buat migrasi:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O yang Dipetakan ke Memori

Untuk basis data yang sangat besar (>10GB), pemetaan memori dapat disesuaikan melalui pragma SQLite:

```sql
-- Tetapkan melalui pragma SQLite (sesuaikan di core.ts atau saat runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Pemadatan

Instans OmniRoute yang berjalan dalam jangka panjang akan mendapat manfaat dari menjalankan `VACUUM` sesekali:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Jalankan setiap bulan pada periode dengan lalu lintas rendah. (Mode WAL mengurangi kebutuhan tersebut, tetapi tidak menghilangkannya.)

---

## Pemeriksaan Kesehatan

`src/lib/db/healthCheck.ts` menyediakan **diagnostik kesehatan tingkat basis data**:

Kedua verba memerlukan autentikasi (`401` jika tidak ada). `GET` hanya melakukan diagnosis; `POST` menjalankan
pemeriksaan yang sama dengan `autoRepair` diaktifkan.

```bash
GET  /api/db/health   # diagnosis
POST /api/db/health   # diagnosis + perbaikan
```

Responsnya adalah `DbHealthCheckResult` yang dihasilkan oleh `runDbHealthCheck()`
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

| Kolom             | Arti                                                                                                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` jika `issues` kosong. `driver` tidak pernah memengaruhinya.                                                                                                    |
| `issues[].type`   | Salah satu dari `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                      |
| `repairedCount`   | Baris yang diperbaiki selama proses ini; selalu `0` jika `autoRepair` bernilai false.                                                                                 |
| `backupCreated`   | Apakah cadangan dibuat sebelum melakukan perbaikan.                                                                                                                   |
| `checkedAt`       | Stempel waktu ISO yang digunakan bersama oleh proses ini dan catatan perbaikan apa pun yang ditulisnya.                                                               |
| `driver.name`     | Driver SQLite yang melayani basis data yang diperiksa.                                                                                                                |
| `driver.degraded` | `true` jika operasi tulis tidak disimpan secara persisten dalam berkas basis data — fallback WASM `sql.js` (persistensi seluruh berkas) atau basis data dalam memori. |

Payload yang sama dikembalikan oleh alat MCP `omniroute_db_health_check`.

Jalankan `PRAGMA integrity_check` untuk mendeteksi kerusakan:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Seharusnya menampilkan: ok
```

Jika perintah tersebut mengembalikan hasil selain `ok`, **segera hentikan penggunaan basis data** dan pulihkan dari cadangan.

---

## Pemulihan Bencana

### Skenario 1: File WAL Hilang

File `-wal` hilang, tetapi `-shm` dan DB utama masih utuh:

```bash
# Pulih secara otomatis saat dibuka berikutnya
omniroute
```

Jika SQLite tidak dapat melakukan pemulihan otomatis:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Skenario 2: File DB Utama Rusak

Pulihkan dari cadangan:

```bash
omniroute sync pull --merge   # atau: omniroute backup restore <backup-id>
```

### Skenario 3: Kunci Enkripsi Hilang

**Pemulihan tidak dapat dilakukan** tanpa kunci tersebut. Bidang yang dienkripsi tidak dapat dibaca. Tambahkan kembali semua penyedia secara manual menggunakan kredensial baru.

> **Mitigasi**: Selalu cadangkan kunci enkripsi secara terpisah, idealnya di pengelola kata sandi atau KMS.

### Skenario 4: Disk Penuh

SQLite akan menghasilkan galat `SQLITE_FULL`. Kosongkan ruang disk, lalu:

```bash
# Lakukan checkpoint WAL untuk mengosongkan ruang
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operasi Umum

### Memeriksa Tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Menghitung Baris di Semua Tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Mengatur Ulang (Menghapus) Semua Data

```bash
# Hentikan OmniRoute terlebih dahulu
omniroute stop

# Hapus file DB
rm ~/.omniroute/storage.sqlite*

# Mulai ulang (akan membuat ulang DB kosong)
omniroute
```

Untuk pengaturan ulang **selektif** (pertahankan penyedia, hapus data penggunaan):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Mengekspor Satu Tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Pemecahan Masalah

### "Database terkunci"

Proses lain sedang menahan kunci tulis. Anda dapat:

- Menunggu hingga proses lain selesai (periksa `lsof | grep storage.sqlite`)
- Menghentikan paksa proses lain
- Jika masalah berlanjut, mulai ulang OmniRoute

### "Batasan kunci asing gagal"

Modul domain melanggar integritas referensial. Periksa:

- Baris tanpa induk di tabel dependen
- Penghapusan berantai yang tidak diterapkan
- Migrasi terbaru yang mengubah kunci asing

Jalankan `PRAGMA foreign_key_check;` untuk menemukan pelanggaran.

### "Kehabisan memori"

I/O yang dipetakan ke memori milik SQLite melampaui batas OS. Kurangi melalui pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB, bukan 256MB
```

Atau nonaktifkan:

```sql
PRAGMA mmap_size = 0;
```

### "Migrasi gagal di tengah proses"

Migrasi berjalan dalam sebuah transaksi, jadi perubahan seharusnya telah dibatalkan. Jika tidak:

1. **Hentikan OmniRoute** (cegah percobaan lebih lanjut)
2. **Periksa status DB** dengan `sqlite3`
3. **Perbaiki secara manual** migrasi parsial tersebut
4. **Jalankan ulang** OmniRoute (migrasi akan dicoba kembali)

Untuk mencegah hal ini, selalu uji migrasi pada salinan terlebih dahulu.

---

## Lihat Juga

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabel penggunaan
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — pemantauan kesehatan
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — alur rilis
- Sumber: `src/lib/db/` (80+ file, ~25 ribu baris kode)
