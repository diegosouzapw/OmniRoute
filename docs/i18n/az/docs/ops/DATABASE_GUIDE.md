# Database Schema & Operations Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Qısa xülasə**: OmniRoute əsas məlumat anbarı kimi **WAL jurnallaşdırması ilə SQLite** istifadə edir və həssas sahələr saxlanma zamanı **AES-256-GCM** ilə şifrələnir. Bu təlimatda sxem, miqrasiyalar, ehtiyat nüsxələmə/bərpa və əməliyyat təlimatları əhatə olunur.

**Mənbələr:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 əsas cədvəl)
- `src/lib/db/migrationRunner.ts` — versiyalaşdırılmış miqrasiyalar
- `src/lib/db/migrations/` — 167 versiyalaşdırılmış SQL faylı
- `src/lib/db/encryption.ts` — şifrələmə köməkçiləri
- `src/lib/db/backup.ts` — ehtiyat nüsxənin ixracı/idxalı
- `src/lib/db/healthCheck.ts` — sağlamlıq diaqnostikası

---

## Niyə SQLite?

OmniRoute bir neçə səbəbə görə PostgreSQL/MySQL əvəzinə SQLite seçib:

| Amil                   | SQLite                                   | PostgreSQL                                       |
| ---------------------- | ---------------------------------------- | ------------------------------------------------ |
| **Yerləşdirmə**        | Daxili — ayrıca server tələb etmir       | Server quraşdırılması tələb edir                 |
| **Şifrələmə**          | Tətbiq səviyyəsində (AES-256-GCM)        | Daxili TDE                                       |
| **Məhsuldarlıq**       | Kiçik/orta iş yükləri üçün daha sürətli  | Böyük həcmli paralel yazmalar üçün daha yaxşıdır |
| **Paralellik**         | WAL rejimi paralel oxumalara imkan verir | Tam MVCC                                         |
| **Ehtiyat nüsxə**      | Tək faylın kopyalanması                  | `pg_dump` və ya fayl sistemi anlıq görüntüsü     |
| **İstifadə ssenarisi** | Hər istifadəçi üçün quraşdırma, daxili   | Çoxicarəçili SaaS                                |

**Tək istifadəçili, tək instanslı** yerləşdirmələr (OmniRoute-un əsas istifadə ssenarisi) üçün SQLite daha sadə və sürətlidir.

### WAL jurnallaşdırması

`core.ts` verilənlər bazasını **WAL (qabaqcadan yazma jurnalı) rejimində** açır:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL yazma zamanı **paralel oxumalara** imkan verir — bu, sorğular qeydə alınarkən məlumatları sorğulayan idarə paneli üçün vacibdir.

Standart keş ölçüsü **65,536 KiB (64 MiB)** təşkil edir. SQLite mənfi
`cache_size` dəyərini KiB ilə təxmini yuxarı hədd kimi şərh edir və səhifələri tələb olunduqca ayırır.
**Parametrlər > Sistem və yaddaş > Keş ölçüsü** bölməsi **1-dən
1,000,000 KiB-dək** tam ədəd dəyərləri qəbul edir; parametrin yadda saxlanması onu aktiv verilənlər bazası bağlantısına tətbiq edir,
OmniRoute isə saxlanılmış dəyəri başlanğıc zamanı bərpa edir.

---

## Verilənlər bazasının yeri

SQLite faylı burada saxlanılır:

| ƏS      | Yol                                                                          |
| ------- | ---------------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                                |
| macOS   | `~/.omniroute/storage.sqlite`                                                |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                                    |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` vasitəsilə konfiqurasiya edilə bilər) |

Əlaqəli fayllar:

- `storage.sqlite-wal` — qabaqcadan yazma jurnalı
- `storage.sqlite-shm` — ortaq yaddaş faylı
- `call_logs/` — sorğu faydalı yükü artefaktları (aktivləşdirildiyi halda)

**Yeri dəyişdirin:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domen Modulu Arxitekturası

OmniRoute-un verilənlər bazasında `src/lib/db/` daxilində **110 üst səviyyəli TypeScript modulu** var. Hər bir domen modulu:

- Bir və ya daha çox konkret cədvələ sahibdir
- Tipləşdirilmiş CRUD funksiyalarını ixrac edir
- Heç vaxt başqa modulun cədvəllərinə toxunmur
- Verilənlər bazasına daxil olmaq üçün `core.ts` faylındakı `getDbInstance()` funksiyasından istifadə edir

### 110 Üst Səviyyəli Verilənlər Bazası Modulu

OmniRoute-un `src/lib/db/` daxilində **110 üst səviyyəli TypeScript faylı** var. Aşağıda əsas modullardan bəziləri göstərilib; tam siyahı üçün qovluq siyahısına baxın:

| Modul                   | Cədvəllər                                                      | Məsuliyyət                                                                               |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API açarı provayderinin qeydiyyatı və giriş məlumatları                            |
| `models.ts`             | `key_value` (model məlumatları)                                | Model tərifləri, imkanları və qiymətləri                                                 |
| `combos.ts`             | `combos`                                                       | Kombinasiya marşrutlaşdırma konfiqurasiyaları və sıralama                                |
| `apiKeys.ts`            | `api_keys`                                                     | API açarlarının həyat dövrü, əhatə dairələri və kvota izlənməsi                          |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistem konfiqurasiyası və ortaq KV yaddaşı                                               |
| `backup.ts`             | —                                                              | Ehtiyat nüsxənin ixracı/idxalı əməliyyatları                                             |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proksi konfiqurasiyaları və marşrutlaşdırma qaydaları                                    |
| `prompts.ts`            | `prompt_templates`                                             | Təkrar istifadə edilə bilən sorğu şablonları və versiyalaşdırma                          |
| `webhooks.ts`           | `webhooks`                                                     | Hadisə əsaslı vebhuk abunəlikləri və jurnalları                                          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Hər sorğu üzrə audit jurnallaşdırması (ixtiyari, yüksək həcmli)                          |
| `domainState.ts`        | `domain_*` (5 cədvəl)                                          | Domen büdcələri, dövrə açarları, bloklamalar, ehtiyat keçid zəncirləri və xərc tarixçəsi |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A üçün icazə siyahısına daxil edilmiş API açarları                                 |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Tarixi kvota istifadəsi                                                                  |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modellərin standart kombinasiyalarla əlaqələndirilməsi                                   |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-yə xas davamlı vəziyyət                                                              |
| `encryption.ts`         | —                                                              | Sahələrin şifrələnməsi/deşifrələnməsi üçün köməkçi funksiyalar                           |
| `readCache.ts`          | —                                                              | Oxuma intensiv əməliyyatlar üçün yaddaşdaxili keş                                        |
| `secrets.ts`            | `key_value` (şifrələnmiş qeydlər)                              | Şifrələnmiş məxfi məlumatların saxlanması                                                |
| `stateReset.ts`         | —                                                              | Sınaq üçün verilənlər bazası vəziyyətinin silinməsi/sıfırlanması                         |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Agent ötürməsi üçün sessiya konteksti                                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | İstifadənin izlənməsi                                                                    |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Sıxılma konfiqurasiyası                                                                  |

### Modul Sərhədləri

Əsas arxitektura qaydası: **modullar bir-birinin cədvəllərinə birbaşa daxil olmur**. Başqa modulun məlumatları ilə işləmək üçün həmin moduldan funksiyanı idxal edin.

```ts
// ❌ YANLIŞ: başqa moduldan birbaşa SQL sorğusu
db.prepare("SELECT * FROM provider_connections").all();

// ✅ DÜZGÜN: providers modulunun funksiyasından istifadə edin
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Bu qaydanın tətbiqi kod yoxlaması vasitəsilə təmin edilir — statik yoxlama yoxdur, lakin pozuntular işarələnir.

---

## Əsas sxem (17 cədvəl)

`core.ts` faylı `SCHEMA_SQL` daxilindəki 17 əsas cədvəli müəyyən edir. Bunlar `001_initial_schema.sql` miqrasiyası tərəfindən yaradılır və əsas sxemi təşkil edir.

### Əsas cədvəllər (ilkin miqrasiya zamanı yaradılır)

| Cədvəl                     | Təyinatı                                  | Əsas sütunlar                                                           |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Provayder giriş məlumatları (şifrələnmiş) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Provayder qovşaqlarının marşrut məlumatı  | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ümumi KV yaddaşı                          | `namespace`, `key`, `value`                                             |
| `combos`                   | Marşrutlaşdırma kombinasiyalarının tərifi | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Şlüz üçün API açarları                    | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Verilənlər bazasının metaməlumatları      | `key`, `value`                                                          |
| `usage_history`            | Sorğu istifadəsi qeydləri                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Sorğu faydalı yükləri və cavabları        | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proksi sorğularının jurnalları            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modeldən provayderə keçid zəncirləri      | `model`, `chain`                                                        |
| `domain_budgets`           | Domen üzrə xərc büdcələri                 | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Büdcə sıfırlama tarixçəsi                 | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Domen üzrə xərclərin izlənməsi            | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domenin sürət məhdudiyyəti vəziyyəti      | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Domen üzrə dövrə açarının vəziyyəti       | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM cavab keşi                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Tarixi kvota anlıq görüntüləri            | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Əlavə cədvəllər (sonrakı miqrasiyalarla əlavə edilib)

Sonrakı miqrasiyalar aşağıdakı kimi cədvəllər əlavə edir:

- `cli_tool_state` (miqrasiya 011) — CLI alətinin vəziyyəti
- `mcp_*` cədvəlləri — MCP server auditi
- `a2a_*` cədvəlləri — A2A tapşırıq vəziyyəti
- `usage_*` cədvəlləri — istifadənin izlənməsi
- `plugin_*` cədvəlləri — plagin sistemi
- `skill_executions` — bacarıqların icra tarixçəsi
- `memory_*` cədvəlləri — yaddaş sistemi
- `compression_*` cədvəlləri — sıxılma sistemi
- `webhook_*` cədvəlləri — webhook çatdırılma jurnalı
- `acp_*` cədvəlləri — Agent Müştəri Protokolu
- `oneproxy_*` cədvəlləri — 1proxy bazarı
- `proxy_assignments` — proksi əhatə dairəsi əlaqələndirmələri
- `detailed_call_artifacts` — çağırış jurnalı artefaktlarının metaməlumatları
- `quota_alert_history` — kvota xəbərdarlıqlarının auditi
- `command_code_auth_sessions` — Command Code OAuth sessiyaları

Təxminən 30-dan çox cədvəlin tam siyahısı `src/lib/db/migrations/` daxilindədir.

---

## Miqrasiyalar

OmniRoute `src/lib/db/migrations/` qovluğunda **versiyalaşdırılmış, idempotent miqrasiyalardan** istifadə edir. Hər miqrasiya `NNN_description.sql` formatında adlandırılmış ayrıca SQL faylıdır.

### Miqrasiyaların adlandırılması

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Miqrasiyalar necə icra olunur

Tətbiq başladıqda `migrationRunner.ts`:

1. Mövcud deyilsə, `_omniroute_migrations` cədvəlini yaradır
2. Artıq tətbiq edilmiş miqrasiyaları sorğulayır
3. Bütün yeni miqrasiyaları sıra ilə və hər birini ayrıca tranzaksiyada tətbiq edir
4. Tətbiq edilmiş hər miqrasiyanı zaman nişanı ilə qeydə alır

```ts
// src/lib/db/migrationRunner.ts (sadələşdirilib)
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

### İdempotentlik

Miqrasiyalar **idempotent** olmalıdır — onların iki dəfə icrası heç bir əməliyyatla nəticələnməməlidir:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS` və `OR IGNORE` / `OR REPLACE` bəndlərindən geniş şəkildə istifadə edin.

### Yeni miqrasiyanın əlavə edilməsi

1. **Növbəti nömrəni müəyyən edin**: `ls src/lib/db/migrations/ | tail -1`
2. **Faylı yaradın**: `NNN_my_change.sql`
3. **Təhlükəsiz DDL-dən istifadə edin**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Məlumatları ehtiyatla doldurun**: mövcud sətirləri emal etmək üçün `UPDATE ... WHERE ...` istifadə edin
5. **Nüsxə üzərində sınaqdan keçirin**: sınaqdan keçirilməmiş miqrasiyaları heç vaxt istehsal mühitində icra etməyin

Nümunə:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Geriyə uyğun olmayan dəyişikliklər** (məsələn, sütunların silinməsi) mürəkkəbdir. OmniRoute əvvəlki versiyaya qayıtmanı dəstəkləmir — miqrasiya tətbiq edildikdən sonra sxem dəyişikliyi qalıcı olur. Planlaşdırarkən bunu nəzərə alın.

---

## Saxlanılan məlumatların şifrələnməsi

Həssas sahələr (API açarları, OAuth tokenləri, bağlantı sətirləri) saxlanılarkən **AES-256-GCM** vasitəsilə şifrələnir.

### İş prinsipi

```ts
// src/lib/db/encryption.ts (sadələşdirilib)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### İstifadə edildiyi yerlər

- `provider_connections.api_key` — tətbiq səviyyəsində şifrələnir
- `provider_connections.access_token`, `refresh_token`, `id_token` — tətbiq səviyyəsində şifrələnir
- `namespace = "secrets"` olan `key_value` qeydləri — tətbiq səviyyəsində şifrələnir
- `proxy_registry.auth` — mövcud olduqda tətbiq səviyyəsində şifrələnir

### Şifrələmə açarı

Şifrələmə açarı **parol ifadəsindən** (`STORAGE_ENCRYPTION_KEY` mühit dəyişəni vasitəsilə təyin edilir) və **duzdan** (DB-də saxlanılır) yaradılır. Məlumatların şifrəsini açmaq üçün hər ikisi tələb olunur.

```bash
# Təhlükəsiz parol ifadəsi yaradın
openssl rand -hex 32

# .env faylında təyin edin
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritik**: Şifrələmə açarının itirilməsi bütün şifrələnmiş məlumatlara girişin itirilməsi deməkdir. **Açarın ehtiyat nüsxəsini verilənlər bazasından ayrı saxlayın**.

### Nələr şifrələnmir

Performans səbəblərinə görə aşağıdakılar açıq mətn şəklində saxlanılır:

- Provayderlərin görünən adları
- Model tərifləri (onsuz da açıqdır)
- Marşrutlaşdırma qaydaları
- İstifadə qeydləri (PII yoxdur)

---

## Şifrələmə ilə bağlı məhdudiyyətlər (v3.8.16+)

OmniRoute iki şifrələmə sxemini şəffaf şəkildə idarə etmək üçün **`migrateLegacyEncryptedString()`** funksiyasından istifadə edir:

- **Köhnə** (v3.5.0-dan əvvəl): XOR əsaslı "şifrələmə" (həqiqi kriptoqrafiya deyil)
- **Cari**: Düzgün IV və autentifikasiya teqi ilə AES-256-GCM

Miqrasiya köməkçisi köhnə formatı aşkarlayır və ilk oxuma zamanı məlumatı yeni sxemlə yenidən şifrələyir. Bu, giriş məlumatlarını itirmədən köhnə verilənlər bazasını yeniləməyə imkan verir.

---

## Oxuma keşi

Tez-tez oxunan məlumatlar (modellər, provayderlər, parametrlər) üçün `readCache.ts` **yaddaşdaxili keş** təqdim edir:

```ts
// Başlanğıcda keşlənir, yazma zamanı etibarsız edilir
const providers = await getCachedProviders(); // Sürətli, yaddaşdaxili
const fresh = await listProviders(); // Yavaş, verilənlər bazasına müraciət edir
```

| Keşlənən obyekt        | Keş açarı      | TTL           |
| ---------------------- | -------------- | ------------- |
| `models`               | `models:v1`    | Yazmaya qədər |
| `provider_connections` | `providers:v1` | Yazmaya qədər |
| `settings`             | `settings:v1`  | Yazmaya qədər |
| `combos`               | `combos:v1`    | Yazmaya qədər |

Müvafiq cədvələ hər yazma zamanı keş etibarsız edilir.

---

## Ehtiyat nüsxələmə və bərpa

### Əl ilə ehtiyat nüsxələmə

```bash
# Lokal ehtiyat nüsxə yaratmaq üçün CLI-dan istifadə edin
omniroute backup create --name pre-migration

# Və ya API vasitəsilə
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Ehtiyat nüsxə faylına aşağıdakılar daxildir:

- Bütün verilənlər bazası cədvəlləri (JSON formatına seriallaşdırılmış)
- Çağırış jurnalı artefaktları (base64 ilə kodlaşdırılmış, istəyə bağlı)
- Parametrlər + məxfi məlumatlar (şifrələnmiş)
- Plagin konfiqurasiyası

### Bərpa

```bash
# CLI vasitəsilə
omniroute restore pre-migration

# API vasitəsilə
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Xəbərdarlıq**: Bərpa bütün verilənlər bazasının üzərinə yazır. Əvvəlcə bütün klientləri dayandırın.

### Avtomatlaşdırılmış ehtiyat nüsxələr

```bash
# CLI vasitəsilə gündəlik avtomatik ehtiyat nüsxələməni aktivləşdirin
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Cədvəl server tərəfində, hər 30 saniyədən bir (standart olaraq) işə düşən və cron ifadəsini serverin yerli vaxtına əsasən qiymətləndirən fon tapşırığı tərəfindən icra edilir.

| Dəyişən                                     | Standart | Təsvir                                                                                                                              |
| ------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Millisaniyə ilə işə düşmə intervalı (minimum `5000`). Uyğun cron dəqiqəsinə etibarlı şəkildə düşmək üçün 60 san-dən qısa olmalıdır. |

### SQLite işlək ehtiyat nüsxəsi

İşlək verilənlər bazasının fasiləsiz ehtiyat nüsxələnməsi üçün:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Bu, SQLite-ın onlayn ehtiyat nüsxələmə API-sindən istifadə edir — OmniRoute işləyərkən icra edilməsi təhlükəsizdir.

---

## Performansın Tənzimlənməsi

### WAL Rejimi

WAL standart olaraq aktivdir. Çoxlu yazma əməliyyatları olan iş yükləri üçün bunları nəzərdən keçirin:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Hər 1000 səhifədən bir yoxlama nöqtəsi yaradın
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL limiti
```

### İndekslər

Performans üçün əsas indekslər (miqrasiyalar tərəfindən avtomatik yaradılır):

- `idx_models_provider` — provayder üzrə model axtarışları
- `idx_combo_targets_combo_id` — kombinasiya hədəflərinin genişləndirilməsi
- `idx_usage_history_api_key_timestamp` — istifadə analitikası
- `idx_quota_snapshots_api_key_window` — kvotanın izlənməsi
- `idx_call_logs_timestamp` — çağırış jurnalı sorğuları

Yeni indeks əlavə etmək üçün miqrasiya yaradın:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Yaddaşla Xəritələnmiş Giriş-Çıxış

Çox böyük verilənlər bazaları (>10GB) üçün yaddaş xəritələnməsi SQLite pragma vasitəsilə tənzimlənə bilər:

```sql
-- SQLite pragma vasitəsilə təyin edin (core.ts və ya icra mühitində tənzimləyin)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Sıxlaşdırma

Uzun müddət işləyən OmniRoute instansiyaları ara-sıra `VACUUM` əməliyyatından faydalanır:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Aşağı trafik dövrlərində ayda bir dəfə işə salın. (WAL rejimi ehtiyacı azaldır, lakin tamamilə aradan qaldırmır.)

---

## Sağlamlıq Yoxlaması

`src/lib/db/healthCheck.ts` **verilənlər bazası səviyyəsində sağlamlıq diaqnostikası** təmin edir:

Hər iki metod autentifikasiya tələb edir (əks halda `401`). `GET` yalnız diaqnostika aparır; `POST` isə
eyni yoxlamanı `autoRepair` aktiv olmaqla işə salır.

```bash
GET  /api/db/health   # diaqnostika apar
POST /api/db/health   # diaqnostika apar + təmir et
```

Cavab `runDbHealthCheck()` tərəfindən yaradılan `DbHealthCheckResult` nəticəsidir
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domen büdcələri artıq mövcud olmayan API açarlarına istinad edirdi.",
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

| Sahə              | Mənası                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `issues` boş olduqda `true` olur. `driver` buna heç vaxt təsir etmir.                                                                                                          |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` dəyərlərindən biri.                                                                            |
| `repairedCount`   | Bu icra zamanı təmir edilən sətirlər; `autoRepair` false olduqda həmişə `0` olur.                                                                                              |
| `backupCreated`   | Təmir edilməzdən əvvəl ehtiyat nüsxənin yaradılıb-yaradılmadığı.                                                                                                               |
| `checkedAt`       | İcra və onun yazdığı hər hansı təmir qeydi üçün ortaq olan ISO vaxt möhürü.                                                                                                    |
| `driver.name`     | Yoxlanılan verilənlər bazasına xidmət göstərən SQLite drayveri.                                                                                                                |
| `driver.degraded` | Yazmalar verilənlər bazası faylında davamlı şəkildə saxlanmadıqda `true` olur — `sql.js` WASM ehtiyat variantı (bütün faylın saxlanması) və ya yaddaşdaxili verilənlər bazası. |

Eyni faydalı yük `omniroute_db_health_check` MCP aləti tərəfindən qaytarılır.

Zədələnməni aşkarlamaq üçün `PRAGMA integrity_check` əmrini işə salın:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Çap edilməlidir: ok
```

`ok` xaricində hər hansı nəticə qaytararsa, **verilənlər bazasından istifadəni dərhal dayandırın** və onu ehtiyat nüsxədən bərpa edin.

---

## Fəlakətdən Sonra Bərpa

### Ssenari 1: WAL Faylı İtib

`-wal` faylı yoxdur, lakin `-shm` faylı və əsas verilənlər bazası bütövdür:

```bash
# Növbəti açılışda avtomatik bərpa olunur
omniroute
```

SQLite avtomatik bərpa edə bilmirsə:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Ssenari 2: Əsas Verilənlər Bazası Faylı Zədələnib

Ehtiyat nüsxədən bərpa edin:

```bash
omniroute sync pull --merge   # və ya: omniroute backup restore <backup-id>
```

### Ssenari 3: Şifrələmə Açarı İtib

Açar olmadan **bərpa mümkün deyil**. Şifrələnmiş sahələri oxumaq mümkün deyil. Bütün provayderləri yeni giriş məlumatları ilə əl ilə yenidən əlavə edin.

> **Qarşısının alınması**: Şifrələmə açarının ehtiyat nüsxəsini həmişə ayrıca, ideal olaraq parol menecerində və ya KMS-də saxlayın.

### Ssenari 4: Disk Doludur

SQLite `SQLITE_FULL` xətaları qaytaracaq. Diskdə yer boşaldın, sonra:

```bash
# Yer boşaltmaq üçün WAL yoxlama nöqtəsi yaradın
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Ümumi Əməliyyatlar

### Cədvəli Yoxlamaq

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Bütün Cədvəllərdəki Sətirləri Saymaq

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Bütün Məlumatları Sıfırlamaq (Silmək)

```bash
# Əvvəlcə OmniRoute-u dayandırın
omniroute stop

# Verilənlər bazası faylını silin
rm ~/.omniroute/storage.sqlite*

# Yenidən başladın (boş verilənlər bazası yenidən yaradılacaq)
omniroute
```

**Seçimli** sıfırlama üçün (provayderləri saxlayıb istifadə məlumatlarını silmək):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Tək Cədvəli Eksport Etmək

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Nasazlıqların Aradan Qaldırılması

### "Verilənlər bazası kilidlənib"

Başqa proses yazma kilidini saxlayır. Aşağıdakılardan birini edin:

- Digər prosesin bitməsini gözləyin (`lsof | grep storage.sqlite` ilə yoxlayın)
- Digər prosesi dayandırın
- Problem davam edərsə, OmniRoute-u yenidən başladın

### "Xarici açar məhdudiyyəti pozulub"

Domen modulu istinad bütövlüyünü pozur. Aşağıdakıları yoxlayın:

- Asılı cədvəllərdə əlaqəsiz qalmış sətirlər
- Tətbiq edilməmiş kaskad silmələri
- Xarici açarı dəyişdirmiş son miqrasiya

Pozuntuları tapmaq üçün `PRAGMA foreign_key_check;` əmrini icra edin.

### "Yaddaş çatışmır"

SQLite-ın yaddaşla əlaqələndirilmiş giriş-çıxış əməliyyatları əməliyyat sisteminin limitini aşır. SQLite pragma-sı vasitəsilə ölçünü azaldın:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB əvəzinə 128MB
```

Və ya deaktiv edin:

```sql
PRAGMA mmap_size = 0;
```

### "Miqrasiya yarıda uğursuz oldu"

Miqrasiya tranzaksiya daxilində icra edildiyi üçün geri qaytarılmalı idi. Əgər qaytarılmayıbsa:

1. **OmniRoute-u dayandırın** (sonrakı cəhdlərin qarşısını alın)
2. `sqlite3` ilə **verilənlər bazasının vəziyyətini yoxlayın**
3. Qismən tətbiq edilmiş miqrasiyanı **əl ilə düzəldin**
4. OmniRoute-u **yenidən başladın** (miqrasiya yenidən sınanacaq)

Bunun qarşısını almaq üçün miqrasiyaları həmişə əvvəlcə nüsxə üzərində sınaqdan keçirin.

---

## Həmçinin Baxın

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — istifadə cədvəlləri
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — sağlamlıq monitorinqi
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — buraxılış prosesi
- Mənbə: `src/lib/db/` (80-dən çox fayl, təxminən 25 min kod sətri)
