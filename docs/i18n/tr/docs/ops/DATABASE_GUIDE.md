# Database Schema & Operations Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Özet**: OmniRoute, birincil veri deposu olarak **WAL günlüklemeli SQLite** kullanır ve hassas alanlarda duran veriler için **AES-256-GCM** şifrelemesi uygular. Bu kılavuz şemayı, geçişleri, yedekleme/kurtarma işlemlerini ve operasyonel çalışma kılavuzlarını kapsar.

**Kaynaklar:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 temel tablo)
- `src/lib/db/migrationRunner.ts` — sürümlendirilmiş geçişler
- `src/lib/db/migrations/` — sürümlendirilmiş 167 SQL dosyası
- `src/lib/db/encryption.ts` — şifreleme yardımcıları
- `src/lib/db/backup.ts` — yedek dışa/içe aktarma
- `src/lib/db/healthCheck.ts` — durum tanılama

---

## Neden SQLite?

OmniRoute, çeşitli nedenlerle PostgreSQL/MySQL yerine SQLite'ı tercih etmiştir:

| Faktör             | SQLite                                  | PostgreSQL                                   |
| ------------------ | --------------------------------------- | -------------------------------------------- |
| **Dağıtım**        | Gömülü — ayrı sunucu gerekmez           | Sunucu kurulumu gerektirir                   |
| **Şifreleme**      | Uygulama katmanı (AES-256-GCM)          | Yerleşik TDE                                 |
| **Performans**     | Küçük/orta ölçekli iş yüklerinde hızlı  | Çok yoğun eşzamanlı yazmalarda daha iyi      |
| **Eşzamanlılık**   | WAL modu eşzamanlı okumalara izin verir | Tam MVCC                                     |
| **Yedekleme**      | Tek dosyalı kopya                       | `pg_dump` veya dosya sistemi anlık görüntüsü |
| **Kullanım alanı** | Kullanıcı başına kurulum, gömülü        | Çok kiracılı SaaS                            |

**Tek kullanıcılı, tek örnekli** dağıtımlarda (OmniRoute'un birincil kullanım alanı) SQLite daha basit ve daha hızlıdır.

### WAL Günlükleme

`core.ts`, veritabanını **WAL (Önden Yazmalı Günlükleme) modunda** açar:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL, yazma işlemleri sırasında **eşzamanlı okumalara** izin verir; bu, istekler kaydedilirken sorgular gerçekleştiren kontrol paneli için önemlidir.

Varsayılan önbellek boyutu **65.536 KiB'dir (64 MiB)**. SQLite, negatif bir
`cache_size` değerini KiB cinsinden yaklaşık bir üst sınır olarak yorumlar ve sayfaları gerektiğinde tahsis eder.
**Ayarlar > Sistem ve Depolama > Önbellek Boyutu**, **1 ile
1.000.000 KiB** arasındaki tam sayı değerlerini kabul eder; ayarın kaydedilmesi, değeri etkin veritabanı bağlantısına uygular
ve OmniRoute, kalıcı değeri başlangıçta geri yükler.

---

## Veritabanı Konumu

SQLite dosyası şurada saklanır:

| İşletim Sistemi | Yol                                                            |
| --------------- | -------------------------------------------------------------- |
| Linux           | `~/.omniroute/storage.sqlite`                                  |
| macOS           | `~/.omniroute/storage.sqlite`                                  |
| Windows         | `%USERPROFILE%\.omniroute\storage.sqlite`                      |
| Docker          | `/app/data/storage.sqlite` (`DATA_DIR` ile yapılandırılabilir) |

İlişkili dosyalar:

- `storage.sqlite-wal` — önden yazmalı günlük
- `storage.sqlite-shm` — paylaşımlı bellek dosyası
- `call_logs/` — istek yükü yapıtları (etkinse)

**Konumu geçersiz kılma:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Alan Modülü Mimarisi

OmniRoute'un veritabanında `src/lib/db/` altında **110 üst düzey TypeScript modülü** bulunur. Her alan modülü:

- Bir veya daha fazla belirli tablonun sahibidir
- Tür tanımlı CRUD işlevlerini dışa aktarır
- Başka bir modülün tablolarına hiçbir zaman erişmez
- Veritabanına erişmek için `core.ts` içindeki `getDbInstance()` işlevini kullanır

### 110 Üst Düzey Veritabanı Modülü

OmniRoute'un `src/lib/db/` altında **110 üst düzey TypeScript dosyası** bulunur. Aşağıda temel modüllerden bir örneklem yer almaktadır; tam liste için dizin içeriğine bakın:

| Modül                   | Tablolar                                                       | Sorumluluk                                                                       |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API anahtarı sağlayıcı kaydı ve kimlik bilgileri                           |
| `models.ts`             | `key_value` (model verileri)                                   | Model tanımları, yetenekler, fiyatlandırma                                       |
| `combos.ts`             | `combos`                                                       | Kombinasyon yönlendirme yapılandırmaları ve sıralaması                           |
| `apiKeys.ts`            | `api_keys`                                                     | API anahtarı yaşam döngüsü, kapsamlar, kota takibi                               |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistem yapılandırması ve paylaşılan KV deposu                                    |
| `backup.ts`             | —                                                              | Yedekleme dışa/içe aktarma işlemleri                                             |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy yapılandırmaları ve yönlendirme kuralları                                  |
| `prompts.ts`            | `prompt_templates`                                             | Yeniden kullanılabilir istem şablonları, sürüm oluşturma                         |
| `webhooks.ts`           | `webhooks`                                                     | Olay güdümlü webhook abonelikleri ve günlükleri                                  |
| `detailedLogs.ts`       | `request_detail_logs`                                          | İstek başına denetim günlüğü kaydı (isteğe bağlı, yüksek hacimli)                |
| `domainState.ts`        | `domain_*` (5 tablo)                                           | Alan bütçeleri, devre kesiciler, kilitlemeler, yedek zincirleri, maliyet geçmişi |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A için izin verilen API anahtarları                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Geçmiş kota kullanımı                                                            |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modelleri varsayılan kombinasyonlarla eşleme                                     |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI'ye özgü kalıcı durum                                                         |
| `encryption.ts`         | —                                                              | Alanları şifrelemeye/şifrelerini çözmeye yönelik yardımcı işlevler               |
| `readCache.ts`          | —                                                              | Okuma ağırlıklı işlemler için bellek içi önbellek                                |
| `secrets.ts`            | `key_value` (şifrelenmiş girdiler)                             | Şifrelenmiş gizli bilgi depolama                                                 |
| `stateReset.ts`         | —                                                              | Test için veritabanı durumunu silme/sıfırlama                                    |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Aracı devri için oturum bağlamı                                                  |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Kullanım takibi                                                                  |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Sıkıştırma yapılandırması                                                        |

### Modül Sınırları

Temel bir mimari kural: **modüller birbirlerinin tablolarına doğrudan erişmez**. Başka bir modülün verileriyle çalışmak için işlevi o modülden içe aktarın.

```ts
// ❌ YANLIŞ: başka bir modülden doğrudan SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ DOĞRU: providers modülü işlevini kullanın
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Bu kural kod incelemesiyle uygulanır — statik bir denetim yoktur, ancak ihlaller işaretlenir.

---

## Temel Şema (17 tablo)

`core.ts`, `SCHEMA_SQL` içindeki 17 temel tabloyu tanımlar. Bunlar `001_initial_schema.sql` migrasyonu tarafından oluşturulur ve çekirdek şemayı meydana getirir.

### Çekirdek Tablolar (ilk migrasyonda oluşturulur)

| Tablo                      | Amaç                                     | Temel sütunlar                                                          |
| -------------------------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Sağlayıcı kimlik bilgileri (şifrelenmiş) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Sağlayıcı düğümü yönlendirme bilgileri   | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Genel KV deposu                          | `namespace`, `key`, `value`                                             |
| `combos`                   | Yönlendirme kombinasyonu tanımları       | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Ağ geçidi için API anahtarları           | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Veritabanı meta verileri                 | `key`, `value`                                                          |
| `usage_history`            | İstek kullanım kayıtları                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | İstek yükleri ve yanıtları               | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proxy istek günlükleri                   | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modelden sağlayıcıya geçiş zincirleri    | `model`, `chain`                                                        |
| `domain_budgets`           | Alan adı başına harcama bütçeleri        | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Bütçe sıfırlama geçmişi                  | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Alan adı başına maliyet takibi           | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Alan adı hız sınırı durumu               | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Alan adı başına devre kesici durumu      | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM yanıt önbelleği                      | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Geçmiş kota anlık görüntüleri            | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Ek Tablolar (sonraki migrasyonlarla eklenir)

Sonraki migrasyonlar aşağıdaki gibi tablolar ekler:

- `cli_tool_state` (migrasyon 011) — CLI aracı durumu
- `mcp_*` tabloları — MCP sunucusu denetimi
- `a2a_*` tabloları — A2A görev durumu
- `usage_*` tabloları — kullanım takibi
- `plugin_*` tabloları — eklenti sistemi
- `skill_executions` — beceri yürütme geçmişi
- `memory_*` tabloları — bellek sistemi
- `compression_*` tabloları — sıkıştırma sistemi
- `webhook_*` tabloları — webhook teslimat günlüğü
- `acp_*` tabloları — Agent Client Protocol
- `oneproxy_*` tabloları — 1proxy pazaryeri
- `proxy_assignments` — proxy kapsam bağlamaları
- `detailed_call_artifacts` — çağrı günlüğü yapıtlarının meta verileri
- `quota_alert_history` — kota uyarısı denetimi
- `command_code_auth_sessions` — Command Code OAuth oturumları

Yaklaşık 30'dan fazla tablonun tam listesi `src/lib/db/migrations/` içindedir.

---

## Geçişler

OmniRoute, `src/lib/db/migrations/` dizininde **sürümlendirilmiş ve idempotent geçişler** kullanır. Her geçiş, `NNN_description.sql` olarak adlandırılan tek bir SQL dosyasıdır.

### Geçişlerin Adlandırılması

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Geçişler Nasıl Çalıştırılır?

Başlangıçta `migrationRunner.ts`:

1. Mevcut değilse `_omniroute_migrations` tablosunu oluşturur
2. Daha önce uygulanmış geçişleri sorgular
3. Yeni geçişleri sırayla ve her birini ayrı bir işlem içinde uygular
4. Uygulanan her geçişi zaman damgasıyla kaydeder

```ts
// src/lib/db/migrationRunner.ts (basitleştirilmiş)
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

Geçişler **idempotent** olmalıdır — iki kez çalıştırılmaları herhangi bir değişikliğe yol açmamalıdır:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS` ve `OR IGNORE` / `OR REPLACE` ifadelerini gerektiği ölçüde kullanın.

### Yeni Bir Geçiş Ekleme

1. **Sonraki numarayı belirleyin**: `ls src/lib/db/migrations/ | tail -1`
2. **Dosyayı oluşturun**: `NNN_my_change.sql`
3. **Güvenli DDL kullanın**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Verileri dikkatlice tamamlayın**: mevcut satırları işlemek için `UPDATE ... WHERE ...` kullanın
5. **Bir kopya üzerinde test edin**: test edilmemiş geçişleri üretim ortamında asla çalıştırmayın

Örnek:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Geriye dönük uyumsuz değişiklikler** (ör. sütunların kaldırılması) karmaşıktır. OmniRoute sürüm düşürmeyi DESTEKLEMEZ — bir geçiş uygulandıktan sonra şema değişikliği kalıcıdır. Planlamanızı buna göre yapın.

---

## Bekleyen Verilerin Şifrelenmesi

Hassas alanlar (API anahtarları, OAuth belirteçleri, bağlantı dizeleri) bekleme durumundayken **AES-256-GCM** kullanılarak şifrelenir.

### Nasıl Çalışır?

```ts
// src/lib/db/encryption.ts (basitleştirilmiş)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Nerelerde Kullanılır?

- `provider_connections.api_key` — uygulama düzeyinde şifrelenir
- `provider_connections.access_token`, `refresh_token`, `id_token` — uygulama düzeyinde şifrelenir
- `namespace = "secrets"` değerine sahip `key_value` girdileri — uygulama düzeyinde şifrelenir
- `proxy_registry.auth` — mevcutsa uygulama düzeyinde şifrelenir

### Şifreleme Anahtarı

Şifreleme anahtarı, bir **paroladan** (`STORAGE_ENCRYPTION_KEY` ortam değişkeni aracılığıyla ayarlanır) ve bir **salt değerinden** (veritabanında saklanır) türetilir. Verilerin şifresini çözmek için her ikisi de gereklidir.

```bash
# Güvenli bir parola oluşturun
openssl rand -hex 32

# .env dosyasında ayarlayın
STORAGE_ENCRYPTION_KEY=<anahtarınız>
```

> **Kritik**: Şifreleme anahtarının kaybedilmesi, şifrelenmiş tüm verilere erişimin kaybedilmesi anlamına gelir. **Anahtarı veritabanından ayrı olarak yedekleyin**.

### Şifrelenmeyenler

Performans nedenleriyle aşağıdakiler düz metin olarak saklanır:

- Sağlayıcı görünen adları
- Model tanımları (zaten herkese açık)
- Yönlendirme kuralları
- Kullanım kayıtları (kişisel olarak tanımlanabilir bilgi içermez)

---

## Şifrelemeyle İlgili Uyarılar (v3.8.16+)

OmniRoute, iki şifreleme şemasını şeffaf biçimde işlemek için **`migrateLegacyEncryptedString()`** kullanır:

- **Eski** (v3.5.0 öncesi): XOR tabanlı "şifreleme" (gerçek kriptografi değildir)
- **Güncel**: Uygun IV ve kimlik doğrulama etiketiyle AES-256-GCM

Geçiş yardımcısı eski biçimi algılar ve ilk okuma sırasında veriyi yeni şemayla yeniden şifreler. Bu sayede kimlik bilgilerini kaybetmeden eski bir veritabanını yükseltebilirsiniz.

---

## Okuma Önbelleği

Sık okunan veriler (modeller, sağlayıcılar, ayarlar) için `readCache.ts`, **bellek içi önbellek** sağlar:

```ts
// Başlangıçta önbelleğe alınır, yazma sırasında geçersiz kılınır
const providers = await getCachedProviders(); // Hızlı, bellek içi
const fresh = await listProviders(); // Yavaş, veritabanına erişir
```

| Önbelleğe alınan varlık | Önbellek anahtarı | TTL                  |
| ----------------------- | ----------------- | -------------------- |
| `models`                | `models:v1`       | Yazma işlemine kadar |
| `provider_connections`  | `providers:v1`    | Yazma işlemine kadar |
| `settings`              | `settings:v1`     | Yazma işlemine kadar |
| `combos`                | `combos:v1`       | Yazma işlemine kadar |

İlgili tabloya yapılan her yazma işleminde önbellek geçersiz kılınır.

---

## Yedekleme ve Kurtarma

### Manuel Yedekleme

```bash
# Yerel bir yedek oluşturmak için CLI'ı kullanın
omniroute backup create --name pre-migration

# Veya API aracılığıyla
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Yedekleme dosyası şunları içerir:

- Tüm veritabanı tabloları (JSON olarak serileştirilmiş)
- Çağrı günlüğü eserleri (base64 kodlu, isteğe bağlı)
- Ayarlar + gizli bilgiler (şifrelenmiş)
- Eklenti yapılandırması

### Geri Yükleme

```bash
# CLI aracılığıyla
omniroute restore pre-migration

# API aracılığıyla
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Uyarı**: Geri yükleme işlemi tüm veritabanının üzerine yazar. Önce tüm istemcileri durdurun.

### Otomatik Yedeklemeler

```bash
# CLI aracılığıyla otomatik günlük yedeklemeleri etkinleştirin
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Zamanlama, varsayılan olarak her 30 saniyede bir tetiklenen ve cron ifadesini sunucunun yerel saatine göre değerlendiren bir arka plan görevi tarafından sunucu tarafında yürütülür.

| Değişken                                    | Varsayılan | Açıklama                                                                                                                                       |
| ------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`    | Milisaniye cinsinden tetikleme aralığı (en az `5000`). Eşleşen cron dakikasına güvenilir biçimde denk gelmek için 60 saniyeden kısa olmalıdır. |

### SQLite Çalışırken Yedekleme

Çalışan bir veritabanını kesinti olmadan yedeklemek için:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Bu komut, SQLite'ın çevrimiçi yedekleme API'sini kullanır — OmniRoute çalışırken güvenle yürütülebilir.

---

## Performans Ayarlama

### WAL Modu

WAL varsayılan olarak etkindir. Yoğun yazma iş yükleri için şunları değerlendirin:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Her 1000 sayfada bir checkpoint oluştur
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL sınırı
```

### İndeksler

Performans için temel indeksler (migration'lar tarafından otomatik olarak oluşturulur):

- `idx_models_provider` — sağlayıcıya göre model aramaları
- `idx_combo_targets_combo_id` — combo hedeflerini genişletme
- `idx_usage_history_api_key_timestamp` — kullanım analizleri
- `idx_quota_snapshots_api_key_window` — kota takibi
- `idx_call_logs_timestamp` — çağrı günlüğü sorguları

Yeni bir indeks eklemek için bir migration oluşturun:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Bellek Eşlemeli G/Ç

Çok büyük veritabanları (>10GB) için bellek eşleme, SQLite pragma aracılığıyla ayarlanabilir:

```sql
-- SQLite pragma aracılığıyla ayarla (core.ts veya çalışma zamanında düzenleyin)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Sıkıştırma

Uzun süre çalışan OmniRoute örnekleri, ara sıra `VACUUM` çalıştırılmasından fayda sağlar:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Trafiğin düşük olduğu zaman aralıklarında ayda bir çalıştırın. (WAL modu ihtiyacı azaltır ancak tamamen ortadan kaldırmaz.)

---

## Sistem Durumu Kontrolü

`src/lib/db/healthCheck.ts`, **veritabanı düzeyinde sistem durumu tanılaması** sağlar:

Her iki fiil de kimlik doğrulaması gerektirir (aksi takdirde `401`). `GET` yalnızca tanılama yapar; `POST`, aynı kontrolü `autoRepair` etkinleştirilmiş olarak çalıştırır.

```bash
GET  /api/db/health   # tanıla
POST /api/db/health   # tanıla + onar
```

Yanıt, `runDbHealthCheck()` tarafından üretilen `DbHealthCheckResult` değeridir
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Etki alanı bütçeleri, artık mevcut olmayan API anahtarlarına başvuruyordu.",
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

| Alan              | Anlamı                                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` boş olduğunda `true` olur. `driver` bunu hiçbir zaman etkilemez.                                                                                                         |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` değerlerinden biri.                                                                               |
| `repairedCount`   | Bu çalıştırma sırasında onarılan satırlar; `autoRepair` false olduğunda her zaman `0` olur.                                                                                       |
| `backupCreated`   | Onarımdan önce yedek alınıp alınmadığı.                                                                                                                                           |
| `checkedAt`       | Çalıştırma ile bu çalıştırmanın yazdığı tüm onarım notları tarafından paylaşılan ISO zaman damgası.                                                                               |
| `driver.name`     | Kontrol edilen veritabanına hizmet veren SQLite sürücüsü.                                                                                                                         |
| `driver.degraded` | Yazmalar veritabanı dosyası tarafından kalıcı şekilde desteklenmediğinde `true` olur — `sql.js` WASM fallback'i (tüm dosyanın kalıcılaştırılması) veya bellek içi bir veritabanı. |

Aynı yük, `omniroute_db_health_check` MCP aracı tarafından da döndürülür.

Bozulmayı tespit etmek için `PRAGMA integrity_check` çalıştırın:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Şunu yazdırmalıdır: ok
```

`ok` dışında herhangi bir sonuç döndürürse **veritabanını kullanmayı derhal bırakın** ve yedekten geri yükleyin.

---

## Felaket Kurtarma

### Senaryo 1: WAL Dosyası Kayboldu

`-wal` dosyası eksik, ancak `-shm` ve ana veritabanı sağlam:

```bash
# Bir sonraki açılışta otomatik olarak kurtarılır
omniroute
```

SQLite otomatik olarak kurtaramazsa:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Senaryo 2: Ana Veritabanı Dosyası Bozuldu

Yedekten geri yükleyin:

```bash
omniroute sync pull --merge   # veya: omniroute backup restore <backup-id>
```

### Senaryo 3: Şifreleme Anahtarı Kayboldu

Anahtar olmadan **kurtarma mümkün değildir**. Şifrelenmiş alanlar okunamaz. Tüm sağlayıcıları yeni kimlik bilgileriyle manuel olarak yeniden ekleyin.

> **Risk azaltma**: Şifreleme anahtarını her zaman ayrı bir yerde, tercihen bir parola yöneticisinde veya KMS'de yedekleyin.

### Senaryo 4: Disk Dolu

SQLite, `SQLITE_FULL` hataları döndürür. Diskte yer açın, ardından:

```bash
# Yer açmak için WAL denetim noktası oluşturun
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Yaygın İşlemler

### Bir Tabloyu İnceleme

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Tüm Tablolardaki Satırları Sayma

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Tüm Verileri Sıfırlama (Silme)

```bash
# Önce OmniRoute'u durdurun
omniroute stop

# Veritabanı dosyasını silin
rm ~/.omniroute/storage.sqlite*

# Yeniden başlatın (boş veritabanı yeniden oluşturulur)
omniroute
```

**Seçici** sıfırlama için (sağlayıcıları koruyup kullanım verilerini silme):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Tek Bir Tabloyu Dışa Aktarma

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Sorun Giderme

### "Veritabanı kilitli"

Başka bir işlem, yazma kilidini tutuyor. Şunlardan birini yapın:

- Diğer işlemin tamamlanmasını bekleyin (`lsof | grep storage.sqlite` ile kontrol edin)
- Diğer işlemi sonlandırın
- Sorun devam ederse OmniRoute'u yeniden başlatın

### "Yabancı anahtar kısıtlaması başarısız oldu"

Bir alan modülü, başvuru bütünlüğünü ihlal ediyor. Şunları kontrol edin:

- Bağımlı tablolardaki yetim satırlar
- Yayılmayan kademeli silmeler
- Yabancı anahtarı değiştiren yakın tarihli bir geçiş

İhlalleri bulmak için `PRAGMA foreign_key_check;` komutunu çalıştırın.

### "Bellek yetersiz"

SQLite'ın bellek eşlemeli G/Ç kullanımı, işletim sistemi sınırını aşıyor. SQLite pragma'sı aracılığıyla azaltın:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB yerine 128MB
```

Veya devre dışı bırakın:

```sql
PRAGMA mmap_size = 0;
```

### "Geçiş yarıda başarısız oldu"

Geçiş bir işlem içinde çalıştırıldığı için geri alınmış olmalıdır. Alınmadıysa:

1. **OmniRoute'u durdurun** (daha fazla denemeyi önleyin)
2. `sqlite3` ile **veritabanı durumunu kontrol edin**
3. Kısmi geçişi **manuel olarak düzeltin**
4. OmniRoute'u **yeniden çalıştırın** (geçiş yeniden denenecektir)

Bunu önlemek için geçişleri her zaman önce bir kopya üzerinde test edin.

---

## Ayrıca Bakınız

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — kullanım tabloları
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — sistem durumu izleme
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — sürüm akışı
- Kaynak: `src/lib/db/` (80+ dosya, ~25K kod satırı)
