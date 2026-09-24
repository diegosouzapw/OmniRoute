# Database Schema & Operations Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Qisqacha**: OmniRoute asosiy maʼlumotlar ombori sifatida **WAL jurnallash bilan SQLite** dan, maxfiy maydonlarni saqlashda esa **AES-256-GCM** shifrlashidan foydalanadi. Ushbu qoʻllanmada sxema, migratsiyalar, zaxiralash/tiklash va operatsion yoʻriqnomalar yoritiladi.

**Manbalar:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 ta asosiy jadval)
- `src/lib/db/migrationRunner.ts` — versiyalangan migratsiyalar
- `src/lib/db/migrations/` — 167 ta versiyalangan SQL fayli
- `src/lib/db/encryption.ts` — shifrlash yordamchi vositalari
- `src/lib/db/backup.ts` — zaxira nusxasini eksport/import qilish
- `src/lib/db/healthCheck.ts` — holat diagnostikasi

---

## Nega SQLite?

OmniRoute bir nechta sababga koʻra PostgreSQL/MySQL oʻrniga SQLiteʼni tanladi:

| Omil                   | SQLite                                       | PostgreSQL                                   |
| ---------------------- | -------------------------------------------- | -------------------------------------------- |
| **Joylashtirish**      | Ichki — alohida server talab qilinmaydi      | Serverni sozlash talab qilinadi              |
| **Shifrlash**          | Ilova qatlami (AES-256-GCM)                  | Ichki TDE                                    |
| **Unumdorlik**         | Kichik/oʻrta ish yuklari uchun tezroq        | Juda katta parallel yozuvlar uchun yaxshiroq |
| **Parallellik**        | WAL rejimi parallel oʻqishga imkon beradi    | Toʻliq MVCC                                  |
| **Zaxiralash**         | Bitta faylni nusxalash                       | `pg_dump` yoki fayl tizimi oniy nusxasi      |
| **Foydalanish holati** | Har bir foydalanuvchi uchun oʻrnatish, ichki | Koʻp ijarachili SaaS                         |

**Bitta foydalanuvchili, bitta nusxali** joylashtirishlar (OmniRouteʼning asosiy foydalanish holati) uchun SQLite sodda va tezroq.

### WAL jurnallash

`core.ts` maʼlumotlar bazasini **WAL (oldindan yozish jurnali) rejimida** ochadi:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL yozish vaqtida **parallel oʻqishlarga** imkon beradi — bu soʻrovlar qayd etilayotgan paytda soʻrov yuboradigan boshqaruv paneli uchun muhim.

Standart kesh hajmi **65,536 KiB (64 MiB)**. SQLite manfiy
`cache_size` qiymatini KiBʼdagi taxminiy yuqori chegara sifatida talqin qiladi va sahifalarni talabga qarab ajratadi.
**Sozlamalar > Tizim va xotira > Kesh hajmi** boʻlimi **1 dan
1,000,000 KiB** gacha boʻlgan butun sonlarni qabul qiladi; sozlamani saqlash uni ishlayotgan maʼlumotlar bazasi ulanishiga qoʻllaydi,
OmniRoute esa saqlangan qiymatni ishga tushirish vaqtida tiklaydi.

---

## Maʼlumotlar bazasi joylashuvi

SQLite fayli quyidagi manzilda saqlanadi:

| OT      | Yoʻl                                                     |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` orqali sozlanadi) |

Yordamchi fayllar:

- `storage.sqlite-wal` — oldindan yozish jurnali
- `storage.sqlite-shm` — umumiy xotira fayli
- `call_logs/` — soʻrov yuklamasi artefaktlari (agar yoqilgan boʻlsa)

**Joylashuvni almashtirish:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domen moduli arxitekturasi

OmniRoute ma’lumotlar bazasida `src/lib/db/` ichida **110 ta yuqori darajadagi TypeScript moduli** mavjud. Har bir domen moduli:

- Bir yoki bir nechta muayyan jadvalga egalik qiladi
- Tiplashtirilgan CRUD funksiyalarini eksport qiladi
- Boshqa modul jadvallariga hech qachon bevosita murojaat qilmaydi
- Ma’lumotlar bazasiga kirish uchun `core.ts` ichidagi `getDbInstance()` funksiyasidan foydalanadi

### Yuqori darajadagi 110 ta ma’lumotlar bazasi moduli

OmniRoute’da `src/lib/db/` ichida **110 ta yuqori darajadagi TypeScript fayli** mavjud. Quyida asosiy modullardan ayrimlari keltirilgan; to‘liq ro‘yxat uchun katalog tarkibiga qarang:

| Modul                   | Jadvallar                                                      | Vazifasi                                                                                   |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | OAuth/API kaliti provayderlarini ro‘yxatdan o‘tkazish va hisob ma’lumotlari                |
| `models.ts`             | `key_value` (model ma’lumotlari)                               | Model ta’riflari, imkoniyatlari va narxlari                                                |
| `combos.ts`             | `combos`                                                       | Kombinatsiyali marshrutlash konfiguratsiyalari va tartiblash                               |
| `apiKeys.ts`            | `api_keys`                                                     | API kalitlarining hayot sikli, qamrovlari va kvotalarni kuzatish                           |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Tizim konfiguratsiyasi va umumiy KV ombori                                                 |
| `backup.ts`             | —                                                              | Zaxira nusxasini eksport/import qilish amallari                                            |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proksi konfiguratsiyalari va marshrutlash qoidalari                                        |
| `prompts.ts`            | `prompt_templates`                                             | Qayta foydalaniladigan prompt shablonlari va versiyalash                                   |
| `webhooks.ts`           | `webhooks`                                                     | Hodisalarga asoslangan webhook obunalari va jurnallari                                     |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Har bir so‘rov bo‘yicha audit jurnali (ixtiyoriy, katta hajmli)                            |
| `domainState.ts`        | `domain_*` (5 ta jadval)                                       | Domen budjetlari, avtomatik uzgichlar, bloklashlar, zaxira zanjirlari va xarajatlar tarixi |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A uchun ruxsat etilgan API kalitlari                                                 |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Kvotadan foydalanish tarixi                                                                |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modellarni standart kombinatsiyalarga moslashtirish                                        |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI’ga xos doimiy holat                                                                    |
| `encryption.ts`         | —                                                              | Maydonlarni shifrlash/deshifrlash uchun yordamchi vositalar                                |
| `readCache.ts`          | —                                                              | O‘qish amallari ko‘p bo‘lgan holatlar uchun xotira ichidagi kesh                           |
| `secrets.ts`            | `key_value` (shifrlangan yozuvlar)                             | Shifrlangan maxfiy ma’lumotlar ombori                                                      |
| `stateReset.ts`         | —                                                              | Sinov uchun ma’lumotlar bazasi holatini tozalash/qayta o‘rnatish                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Agentga topshirish uchun seans konteksti                                                   |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Foydalanishni kuzatish                                                                     |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Siqish konfiguratsiyasi                                                                    |

### Modul chegaralari

Asosiy arxitektura qoidasi: **modullar bir-birining jadvallariga to‘g‘ridan-to‘g‘ri murojaat qilmaydi**. Boshqa modul ma’lumotlari bilan ishlash uchun o‘sha moduldagi funksiyani import qiling.

```ts
// ❌ NOTO‘G‘RI: boshqa modulga tegishli jadvalga to‘g‘ridan-to‘g‘ri SQL so‘rovi
db.prepare("SELECT * FROM provider_connections").all();

// ✅ TO‘G‘RI: providers moduli funksiyasidan foydalaning
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Bu qoida kodni ko‘rib chiqish jarayonida nazorat qilinadi — statik tekshiruv mavjud emas, ammo qoida buzilishlari belgilab qo‘yiladi.

---

## Asosiy sxema (17 ta jadval)

`core.ts` fayli `SCHEMA_SQL` ichidagi 17 ta asosiy jadvalni belgilaydi. Ular `001_initial_schema.sql` migratsiyasi orqali yaratiladi va asosiy sxemani tashkil etadi.

### Asosiy jadvallar (dastlabki migratsiyada yaratiladi)

| Jadval                     | Vazifasi                                       | Asosiy ustunlar                                                         |
| -------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Provayder hisob maʼlumotlari (shifrlangan)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Provayder tugunining marshrutlash maʼlumotlari | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Umumiy KV ombori                               | `namespace`, `key`, `value`                                             |
| `combos`                   | Marshrutlash kombinatsiyasi taʼriflari         | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Shlyuz uchun API kalitlari                     | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Maʼlumotlar bazasi metamaʼlumotlari            | `key`, `value`                                                          |
| `usage_history`            | Soʻrovlardan foydalanish yozuvlari             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Soʻrov yuklamalari va javoblar                 | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proksi soʻrovlari jurnali                      | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modeldan provayderga oʻtish zanjirlari         | `model`, `chain`                                                        |
| `domain_budgets`           | Har bir domen uchun xarajat budjeti            | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Budjetni tiklash tarixi                        | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Har bir domen boʻyicha xarajatlarni kuzatish   | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domen tezlik cheklovi holati                   | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Har bir domen uchun zanjir uzgich holati       | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM javoblari keshi                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Kvotaning tarixiy oniy tasvirlari              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Qoʻshimcha jadvallar (keyingi migratsiyalarda qoʻshilgan)

Keyingi migratsiyalar quyidagi jadvallarni qoʻshadi:

- `cli_tool_state` (011-migratsiya) — CLI vositasi holati
- `mcp_*` jadvallari — MCP serveri auditi
- `a2a_*` jadvallari — A2A vazifasi holati
- `usage_*` jadvallari — foydalanishni kuzatish
- `plugin_*` jadvallari — plagin tizimi
- `skill_executions` — koʻnikmalarni bajarish tarixi
- `memory_*` jadvallari — xotira tizimi
- `compression_*` jadvallari — siqish tizimi
- `webhook_*` jadvallari — webhook yetkazib berish jurnali
- `acp_*` jadvallari — Agent Client Protocol
- `oneproxy_*` jadvallari — 1proxy marketpleysi
- `proxy_assignments` — proksi doirasi bogʻlanishlari
- `detailed_call_artifacts` — chaqiruv jurnali artefaktlari metamaʼlumotlari
- `quota_alert_history` — kvota ogohlantirishlari auditi
- `command_code_auth_sessions` — Command Code OAuth seanslari

Taxminan 30 dan ortiq jadvallarning toʻliq roʻyxati `src/lib/db/migrations/` ichida joylashgan.

---

## Migratsiyalar

OmniRoute `src/lib/db/migrations/` ichida **versiyalangan, idempotent migratsiyalar**dan foydalanadi. Har bir migratsiya `NNN_description.sql` shaklida nomlangan alohida SQL faylidir.

### Migratsiyalarni nomlash

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Migratsiyalar qanday bajariladi

Ishga tushishda `migrationRunner.ts`:

1. Agar mavjud boʻlmasa, `_omniroute_migrations` jadvalini yaratadi
2. Avval qoʻllangan migratsiyalarni soʻrov orqali aniqlaydi
3. Barcha yangi migratsiyalarni tartib bilan qoʻllaydi, har birini alohida tranzaksiyada bajaradi
4. Har bir qoʻllangan migratsiyani vaqt tamgʻasi bilan qayd etadi

```ts
// src/lib/db/migrationRunner.ts (soddalashtirilgan)
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

### Idempotentlik

Migratsiyalar **idempotent** boʻlishi kerak — ularni ikki marta bajarish hech qanday oʻzgarishga olib kelmasligi lozim:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS` va `OR IGNORE` / `OR REPLACE` bandlaridan keng foydalaning.

### Yangi migratsiya qoʻshish

1. **Keyingi raqamni aniqlang**: `ls src/lib/db/migrations/ | tail -1`
2. **Faylni yarating**: `NNN_my_change.sql`
3. **Xavfsiz DDL’dan foydalaning**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Maʼlumotlarni ehtiyotkorlik bilan toʻldiring**: mavjud qatorlarni qayta ishlash uchun `UPDATE ... WHERE ...` dan foydalaning
5. **Nusxada sinab koʻring**: sinovdan oʻtkazilmagan migratsiyalarni hech qachon ishlab chiqarish muhitida bajarmang

Misol:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Orqaga mos kelmaydigan oʻzgarishlar** (masalan, ustunlarni oʻchirish) murakkab hisoblanadi. OmniRoute oldingi versiyaga qaytarishni qoʻllab-quvvatlamaydi — migratsiya qoʻllangach, sxemadagi oʻzgarish doimiy boʻlib qoladi. Shunga muvofiq rejalashtiring.

---

## Saqlangan maʼlumotlarni shifrlash

Maxfiy maydonlar (API kalitlari, OAuth tokenlari, ulanish satrlari) saqlash vaqtida **AES-256-GCM** yordamida shifrlanadi.

### Bu qanday ishlaydi

```ts
// src/lib/db/encryption.ts (soddalashtirilgan)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Qayerlarda ishlatiladi

- `provider_connections.api_key` — ilova darajasida shifrlanadi
- `provider_connections.access_token`, `refresh_token`, `id_token` — ilova darajasida shifrlanadi
- `namespace = "secrets"` boʻlgan `key_value` yozuvlari — ilova darajasida shifrlanadi
- `proxy_registry.auth` — ilova darajasida shifrlanadi (agar mavjud boʻlsa)

### Shifrlash kaliti

Shifrlash kaliti **maxfiy ibora** (`STORAGE_ENCRYPTION_KEY` muhit oʻzgaruvchisi orqali oʻrnatiladi) va **salt** (maʼlumotlar bazasida saqlanadi) asosida hosil qilinadi. Maʼlumotlarni shifrdan chiqarish uchun ikkalasi ham talab qilinadi.

```bash
# Xavfsiz maxfiy iborani yarating
openssl rand -hex 32

# .env faylida o‘rnating
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Juda muhim**: Shifrlash kalitini yoʻqotish barcha shifrlangan maʼlumotlarga kirish imkoniyatini yoʻqotishni anglatadi. **Kalitning zaxira nusxasini maʼlumotlar bazasidan alohida saqlang**.

### Nimalar shifrlanmaydi

Unumdorlik nuqtayi nazaridan quyidagilar oddiy matn koʻrinishida saqlanadi:

- Provayderlarning koʻrsatiladigan nomlari
- Model taʼriflari (allaqachon ochiq)
- Marshrutlash qoidalari
- Foydalanish qaydlari (shaxsni identifikatsiyalashga imkon beruvchi maʼlumotlarsiz)

---

## Shifrlashga oid ogohlantirishlar (v3.8.16+)

OmniRoute ikkita shifrlash sxemasini shaffof tarzda boshqarish uchun **`migrateLegacyEncryptedString()`** funksiyasidan foydalanadi:

- **Eski** (v3.5.0 dan oldingi): XOR asosidagi „shifrlash“ (haqiqiy kriptografiya emas)
- **Joriy**: tegishli IV va autentifikatsiya tegiga ega AES-256-GCM

Migratsiya yordamchisi eski formatni aniqlaydi va birinchi o‘qishda yangi sxema bilan qayta shifrlaydi. Bu hisobga olish ma’lumotlarini yo‘qotmasdan eski ma’lumotlar bazasini yangilashingiz mumkinligini anglatadi.

---

## O‘qish keshi

Tez-tez o‘qiladigan ma’lumotlar (modellar, provayderlar, sozlamalar) uchun `readCache.ts` **xotira ichidagi keshni** taqdim etadi:

```ts
// Ishga tushganda keshlanadi, yozishda bekor qilinadi
const providers = await getCachedProviders(); // Tez, xotira ichida
const fresh = await listProviders(); // Sekin, ma’lumotlar bazasiga murojaat qiladi
```

| Keshlangan obyekt      | Kesh kaliti    | TTL         |
| ---------------------- | -------------- | ----------- |
| `models`               | `models:v1`    | Yozishgacha |
| `provider_connections` | `providers:v1` | Yozishgacha |
| `settings`             | `settings:v1`  | Yozishgacha |
| `combos`               | `combos:v1`    | Yozishgacha |

Tegishli jadvalga har safar yozilganda kesh bekor qilinadi.

---

## Zaxiralash va tiklash

### Qo‘lda zaxiralash

```bash
# Mahalliy zaxira nusxasini yaratish uchun CLI’dan foydalaning
omniroute backup create --name pre-migration

# Yoki API orqali
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Zaxira fayli quyidagilarni o‘z ichiga oladi:

- Barcha ma’lumotlar bazasi jadvallari (JSON formatiga serializatsiya qilingan)
- Chaqiruv jurnali artefaktlari (base64 formatida kodlangan, ixtiyoriy)
- Sozlamalar + maxfiy ma’lumotlar (shifrlangan)
- Plagin konfiguratsiyasi

### Tiklash

```bash
# CLI orqali
omniroute restore pre-migration

# API orqali
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Ogohlantirish**: Tiklash butun ma’lumotlar bazasining ustiga yozadi. Avval barcha mijozlarni to‘xtating.

### Avtomatlashtirilgan zaxiralash

```bash
# CLI orqali avtomatik kundalik zaxiralashni yoqing
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Jadval server tomonida har 30 soniyada (standart qiymat) ishga tushadigan va cron ifodasini serverning mahalliy vaqtiga nisbatan baholaydigan fon vazifasi tomonidan bajariladi.

| O‘zgaruvchi                                 | Standart qiymat | Tavsif                                                                                                                                       |
| ------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`         | Millisekundlardagi ishga tushish oralig‘i (eng kami `5000`). Mos cron daqiqasiga ishonchli tushishi uchun 60 soniyadan qisqa bo‘lishi kerak. |

### SQLite ishlayotgan paytdagi zaxira nusxasi

Ishlayotgan ma’lumotlar bazasini to‘xtalishsiz zaxiralash uchun:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Bu SQLite’ning onlayn zaxiralash API’sidan foydalanadi — OmniRoute ishlab turgan paytda bajarish xavfsiz.

---

## Unumdorlikni sozlash

### WAL rejimi

WAL sukut boʻyicha yoqilgan. Yozish amallari koʻp boʻlgan ish yuklamalari uchun quyidagilarni koʻrib chiqing:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Har 1000 sahifada nazorat nuqtasi yaratish
PRAGMA journal_size_limit = 67108864;  -- WAL uchun 64MB cheklov
```

### Indekslar

Unumdorlik uchun asosiy indekslar (migratsiyalar tomonidan avtomatik yaratiladi):

- `idx_models_provider` — provayder boʻyicha model qidiruvlari
- `idx_combo_targets_combo_id` — kombinatsiya nishonlarini kengaytirish
- `idx_usage_history_api_key_timestamp` — foydalanish tahlili
- `idx_quota_snapshots_api_key_window` — kvotani kuzatish
- `idx_call_logs_timestamp` — chaqiruv jurnali soʻrovlari

Yangi indeks qoʻshish uchun migratsiya yarating:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Xotirada akslantirilgan kiritish-chiqarish

Juda katta maʼlumotlar bazalari (>10GB) uchun xotirada akslantirishni SQLite pragma orqali sozlash mumkin:

```sql
-- SQLite pragma orqali oʻrnating (core.ts yoki bajarilish muhitida sozlang)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Ixchamlash

Uzoq vaqt ishlaydigan OmniRoute nusxalari vaqti-vaqti bilan `VACUUM` bajarilishidan foyda koʻradi:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Har oy trafik kam boʻlgan vaqt oraligʻida ishga tushiring. (WAL rejimi bunga boʻlgan ehtiyojni kamaytiradi, ammo butunlay bartaraf etmaydi.)

---

## Holatni tekshirish

`src/lib/db/healthCheck.ts` **maʼlumotlar bazasi darajasidagi holat diagnostikasini** taqdim etadi:

Har ikkala HTTP metodi autentifikatsiyani talab qiladi (aks holda `401`). `GET` faqat diagnostika qiladi; `POST` esa
xuddi shu tekshiruvni `autoRepair` yoqilgan holda bajaradi.

```bash
GET  /api/db/health   # diagnostika qilish
POST /api/db/health   # diagnostika qilish + tuzatish
```

Javob `runDbHealthCheck()` tomonidan yaratilgan `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`) hisoblanadi:

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

| Maydon            | Maʼnosi                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `issues` boʻsh boʻlganda `true`. `driver` unga hech qachon taʼsir qilmaydi.                                                                                              |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` qiymatlaridan biri.                                                                      |
| `repairedCount`   | Ushbu ishga tushirish davomida tuzatilgan qatorlar; `autoRepair` false boʻlganda har doim `0`.                                                                           |
| `backupCreated`   | Tuzatishdan oldin zaxira nusxasi yaratilgan-yaratilmaganligi.                                                                                                            |
| `checkedAt`       | Ishga tushirish va u yozadigan har qanday tuzatish qaydi uchun umumiy boʻlgan ISO vaqt tamgʻasi.                                                                         |
| `driver.name`     | Tekshirilgan maʼlumotlar bazasiga xizmat koʻrsatuvchi SQLite drayveri.                                                                                                   |
| `driver.degraded` | Yozuvlar maʼlumotlar bazasi fayli bilan doimiy tarzda himoyalanmaganda `true` — `sql.js` WASM zaxira varianti (butun faylni saqlash) yoki xotiradagi maʼlumotlar bazasi. |

Xuddi shu foydali yuklama `omniroute_db_health_check` MCP vositasi tomonidan qaytariladi.

Buzilishlarni aniqlash uchun `PRAGMA integrity_check` buyrugʻini ishga tushiring:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Quyidagini chiqarishi kerak: ok
```

Agar u `ok` dan boshqa natija qaytarsa, **maʼlumotlar bazasidan foydalanishni darhol toʻxtating** va uni zaxira nusxasidan tiklang.

---

## Favqulodda holatdan tiklash

### 1-holat: WAL fayli yoʻqolgan

`-wal` fayli yoʻqolgan, ammo `-shm` va asosiy maʼlumotlar bazasi butun:

```bash
# Keyingi ochishda avtomatik ravishda tiklanadi
omniroute
```

Agar SQLite avtomatik ravishda tiklay olmasa:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 2-holat: Asosiy maʼlumotlar bazasi fayli buzilgan

Zaxira nusxadan tiklang:

```bash
omniroute sync pull --merge   # yoki: omniroute backup restore <backup-id>
```

### 3-holat: Shifrlash kaliti yoʻqolgan

Kalitsiz **tiklashning imkoni yoʻq**. Shifrlangan maydonlarni oʻqib boʻlmaydi. Barcha provayderlarni yangi hisob maʼlumotlari bilan qoʻlda qayta qoʻshing.

> **Xavfni kamaytirish**: Shifrlash kalitini har doim alohida joyda, yaxshisi parollar menejeri yoki KMS tizimida zaxiralang.

### 4-holat: Disk toʻlgan

SQLite `SQLITE_FULL` xatolarini qaytaradi. Diskda joy boʻshating, soʻng:

```bash
# Joy boʻshatish uchun WAL nazorat nuqtasini yarating
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Keng tarqalgan amallar

### Jadvalni tekshirish

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Barcha jadvallardagi qatorlarni sanash

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Barcha maʼlumotlarni tiklash (tozalash)

```bash
# Avval OmniRouteʼni toʻxtating
omniroute stop

# Maʼlumotlar bazasi faylini oʻchiring
rm ~/.omniroute/storage.sqlite*

# Qayta ishga tushiring (boʻsh maʼlumotlar bazasini qayta yaratadi)
omniroute
```

**Tanlab** tiklash uchun (provayderlarni saqlab qolib, foydalanish maʼlumotlarini tozalash):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Bitta jadvalni eksport qilish

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Muammolarni bartaraf etish

### "Maʼlumotlar bazasi qulflangan"

Boshqa jarayon yozish qulfini ushlab turibdi. Quyidagilardan birini bajaring:

- Boshqa jarayon tugashini kuting (`lsof | grep storage.sqlite` orqali tekshiring)
- Boshqa jarayonni majburan toʻxtating
- Muammo davom etsa, OmniRouteʼni qayta ishga tushiring

### "Tashqi kalit cheklovi bajarilmadi"

Domen moduli havolalar yaxlitligini buzmoqda. Quyidagilarni tekshiring:

- Bogʻliq jadvallardagi yetim qatorlar
- Tarqalmagan kaskadli oʻchirishlar
- Tashqi kalitni oʻzgartirgan soʻnggi migratsiya

Buzilishlarni topish uchun `PRAGMA foreign_key_check;` buyrugʻini bajaring.

### "Xotira yetarli emas"

SQLiteʼning xotiraga akslantirilgan kiritish-chiqarish hajmi operatsion tizim cheklovidan oshmoqda. Uni SQLite pragma orqali kamaytiring:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB oʻrniga 128MB
```

Yoki oʻchirib qoʻying:

```sql
PRAGMA mmap_size = 0;
```

### "Migratsiya jarayonning oʻrtasida muvaffaqiyatsiz tugadi"

Migratsiya tranzaksiya ichida bajarilgan, shuning uchun oʻzgarishlar ortga qaytarilgan boʻlishi kerak. Aks holda:

1. **OmniRouteʼni toʻxtating** (keyingi urinishlarning oldini oling)
2. `sqlite3` yordamida **maʼlumotlar bazasi holatini tekshiring**
3. Qisman bajarilgan migratsiyani **qoʻlda tuzating**
4. OmniRouteʼni **qayta ishga tushiring** (migratsiya qayta bajariladi)

Buning oldini olish uchun migratsiyalarni har doim avval nusxada sinab koʻring.

---

## Shuningdek qarang

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — foydalanish jadvallari
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — holat monitoringi
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — reliz jarayoni
- Manba: `src/lib/db/` (80 dan ortiq fayl, ~25K kod qatori)
