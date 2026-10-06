# Database Schema & Operations Guide (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Накратко**: OmniRoute използва **SQLite с WAL журнал** като основно хранилище и **AES-256-GCM** криптиране на съхранените чувствителни полета. Това ръководство обхваща схемата, миграциите, архивирането/възстановяването и оперативните процедури.

**Източници:**

- `src/lib/db/core.ts` — единичен екземпляр + SCHEMA_SQL (17 основни таблици)
- `src/lib/db/migrationRunner.ts` — версионирани миграции
- `src/lib/db/migrations/` — 167 версионирани SQL файла
- `src/lib/db/encryption.ts` — помощни функции за криптиране
- `src/lib/db/backup.ts` — експортиране/импортиране на архиви
- `src/lib/db/healthCheck.ts` — диагностика на изправността

---

## Защо SQLite?

OmniRoute избра SQLite вместо PostgreSQL/MySQL по няколко причини:

| Фактор               | SQLite                                     | PostgreSQL                                         |
| -------------------- | ------------------------------------------ | -------------------------------------------------- |
| **Внедряване**       | Вградена — без отделен сървър              | Изисква настройване на сървър                      |
| **Криптиране**       | На ниво приложение (AES-256-GCM)           | Вградено TDE                                       |
| **Производителност** | По-бърза при малки/средни натоварвания     | По-добра при огромен брой едновременни записи      |
| **Паралелност**      | WAL режимът позволява едновременни четения | Пълна MVCC                                         |
| **Архивиране**       | Копиране на един файл                      | `pg_dump` или моментна снимка на файловата система |
| **Приложение**       | Инсталация за отделен потребител, вградена | SaaS с множество клиенти                           |

За внедрявания с **един потребител и един екземпляр** (основният случай на употреба на OmniRoute) SQLite е по-проста и по-бърза.

### WAL журнал

`core.ts` отваря базата данни в режим **WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL позволява **едновременни четения** по време на запис — важно за таблото за управление, което изпълнява заявки, докато се записват заявки.

Размерът на кеша по подразбиране е **65 536 KiB (64 MiB)**. SQLite интерпретира отрицателна стойност за
`cache_size` като приблизителна горна граница в KiB и заделя страници при необходимост.
**Настройки > Система и съхранение > Размер на кеша** приема цели стойности от **1 до
1 000 000 KiB**; запазването на настройката я прилага към активната връзка с базата данни,
а OmniRoute възстановява съхранената стойност при стартиране.

---

## Местоположение на базата данни

SQLite файлът се съхранява на:

| ОС      | Път                                                        |
| ------- | ---------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                              |
| macOS   | `~/.omniroute/storage.sqlite`                              |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                  |
| Docker  | `/app/data/storage.sqlite` (конфигурируем чрез `DATA_DIR`) |

Съпътстващи файлове:

- `storage.sqlite-wal` — журнал за предварителен запис
- `storage.sqlite-shm` — файл за споделена памет
- `call_logs/` — артефакти от съдържанието на заявките (ако е активирано)

**Промяна на местоположението:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Архитектура на модулите по домейни

Базата данни на OmniRoute има **110 TypeScript модула от най-високо ниво** в `src/lib/db/`. Всеки модул по домейн:

- Притежава една или повече конкретни таблици
- Експортира типизирани CRUD функции
- Никога не взаимодейства с таблиците на друг модул
- Използва `getDbInstance()` от `core.ts` за достъп до базата данни

### 110-те DB модула от най-високо ниво

OmniRoute има **110 TypeScript файла от най-високо ниво** в `src/lib/db/`. По-долу е представена извадка от основните модули; вижте съдържанието на директорията за пълния списък:

| Модул                   | Таблици                                                        | Отговорност                                                                       |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Регистриране на доставчици и идентификационни данни чрез OAuth/API ключ           |
| `models.ts`             | `key_value` (данни за модели)                                  | Дефиниции на модели, възможности, ценообразуване                                  |
| `combos.ts`             | `combos`                                                       | Конфигурации и подреждане на комбинираното маршрутизиране                         |
| `apiKeys.ts`            | `api_keys`                                                     | Жизнен цикъл на API ключовете, обхвати, проследяване на квоти                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Системна конфигурация и споделено KV хранилище                                    |
| `backup.ts`             | —                                                              | Операции за експортиране/импортиране на резервни копия                            |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Конфигурации на проксита и правила за маршрутизиране                              |
| `prompts.ts`            | `prompt_templates`                                             | Шаблони за многократна употреба на подкани, управление на версии                  |
| `webhooks.ts`           | `webhooks`                                                     | Абонаменти и регистрационни файлове за webhook-и, задействани от събития          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Одитно регистриране за всяка заявка (незадължително, голям обем)                  |
| `domainState.ts`        | `domain_*` (5 таблици)                                         | Бюджети на домейни, прекъсвачи, блокировки, резервни вериги, история на разходите |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API ключове в списък с разрешени ключове за MCP/A2A                               |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Хронология на използването на квотите                                             |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Съпоставяне на модели с комбинации по подразбиране                                |
| `cliToolState.ts`       | `cli_tool_state`                                               | Постоянно състояние, специфично за CLI                                            |
| `encryption.ts`         | —                                                              | Помощни функции за шифроване/дешифроване на полета                                |
| `readCache.ts`          | —                                                              | Кеш в паметта за операции с интензивно четене                                     |
| `secrets.ts`            | `key_value` (шифровани записи)                                 | Съхранение на шифровани тайни                                                     |
| `stateReset.ts`         | —                                                              | Изтриване/нулиране на състоянието на базата данни за тестване                     |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Контекст на сесията за предаване между агенти                                     |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Проследяване на използването                                                      |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Конфигурация на компресирането                                                    |

### Граници между модулите

Основно архитектурно правило: **модулите не осъществяват директен достъп до таблиците на други модули**. За да работите с данните на друг модул, импортирайте функцията от съответния модул.

```ts
// ❌ ГРЕШНО: директен SQL от друг модул
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ПРАВИЛНО: използвайте функцията на модула providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Това правило се налага чрез преглед на кода — няма статична проверка, но нарушенията се отбелязват.

---

## Базова схема (17 таблици)

`core.ts` дефинира 17-те базови таблици в `SCHEMA_SQL`. Те се създават от миграцията `001_initial_schema.sql` и формират основната схема.

### Основни таблици (създадени при първоначалната миграция)

| Таблица                    | Предназначение                                      | Ключови колони                                                          |
| -------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Идентификационни данни за доставчици (криптирани)   | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Информация за маршрутизиране на възли на доставчици | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Общо хранилище за двойки ключ-стойност              | `namespace`, `key`, `value`                                             |
| `combos`                   | Дефиниции на комбинации за маршрутизиране           | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API ключове за шлюза                                | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Метаданни на базата данни                           | `key`, `value`                                                          |
| `usage_history`            | Записи за използването на заявки                    | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Данни на заявките и отговорите                      | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Регистрационни записи на прокси заявки              | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Вериги от модели към доставчици                     | `model`, `chain`                                                        |
| `domain_budgets`           | Бюджети за разходи по домейни                       | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | История на нулирането на бюджетите                  | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Проследяване на разходите по домейни                | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Състояние на ограничението на честотата за домейна  | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Състояние на прекъсвача за всеки домейн             | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Кеш за отговори на LLM                              | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Исторически моментни снимки на квотите              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Допълнителни таблици (добавени от последващи миграции)

Последващите миграции добавят таблици като:

- `cli_tool_state` (миграция 011) — състояние на CLI инструмента
- Таблици `mcp_*` — одит на MCP сървъра
- Таблици `a2a_*` — състояние на A2A задачите
- Таблици `usage_*` — проследяване на използването
- Таблици `plugin_*` — система за плъгини
- `skill_executions` — история на изпълненията на умения
- Таблици `memory_*` — система за памет
- Таблици `compression_*` — система за компресиране
- Таблици `webhook_*` — журнал за доставяне на webhook известия
- Таблици `acp_*` — протокол за агентски клиенти
- Таблици `oneproxy_*` — пазар на 1proxy
- `proxy_assignments` — обвързвания на обхвати за проксита
- `detailed_call_artifacts` — метаданни за артефактите от журналите на извикванията
- `quota_alert_history` — одит на предупрежденията за квоти
- `command_code_auth_sessions` — OAuth сесии на Command Code

Пълният списък с над 30 таблици се намира в `src/lib/db/migrations/`.

---

## Миграции

OmniRoute използва **версионирани, идемпотентни миграции** в `src/lib/db/migrations/`. Всяка миграция е отделен SQL файл с име `NNN_description.sql`.

### Именуване на миграциите

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Как се изпълняват миграциите

При стартиране `migrationRunner.ts`:

1. Създава таблицата `_omniroute_migrations`, ако тя не съществува
2. Прави заявка за вече приложените миграции
3. Прилага всички нови миграции последователно, всяка в отделна транзакция
4. Записва всяка приложена миграция с времеви печат

```ts
// src/lib/db/migrationRunner.ts (опростено)
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

### Идемпотентност

Миграциите трябва да бъдат **идемпотентни** — повторното им изпълнение не трябва да има ефект:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Използвайте широко клаузите `IF NOT EXISTS`, `IF EXISTS` и `OR IGNORE` / `OR REPLACE`.

### Добавяне на нова миграция

1. **Определете следващия номер**: `ls src/lib/db/migrations/ | tail -1`
2. **Създайте файла**: `NNN_my_change.sql`
3. **Използвайте безопасен DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Попълвайте внимателно съществуващите данни**: използвайте `UPDATE ... WHERE ...`, за да обработите съществуващите редове
5. **Тествайте върху копие**: никога не изпълнявайте нетествани миграции в продукционна среда

Пример:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Промените без обратна съвместимост** (напр. премахване на колони) са сложни. OmniRoute НЕ поддържа връщане към по-стара версия — след като дадена миграция бъде приложена, промяната в схемата е постоянна. Планирайте съобразно това.

---

## Криптиране на съхраняваните данни

Чувствителните полета (API ключове, OAuth токени, низове за свързване) се съхраняват криптирани чрез **AES-256-GCM**.

### Как работи

```ts
// src/lib/db/encryption.ts (опростено)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Къде се използва

- `provider_connections.api_key` — криптирано на ниво приложение
- `provider_connections.access_token`, `refresh_token`, `id_token` — криптирани на ниво приложение
- Записите в `key_value` с `namespace = "secrets"` — криптирани на ниво приложение
- `proxy_registry.auth` — криптирано на ниво приложение (ако е налично)

### Ключ за криптиране

Ключът за криптиране се извлича от **парола** (зададена чрез променливата на средата `STORAGE_ENCRYPTION_KEY`) и **salt** (съхраняван в базата данни). И двете са необходими за декриптиране на данните.

```bash
# Генериране на защитена парола
openssl rand -hex 32

# Задаване в .env
STORAGE_ENCRYPTION_KEY=<вашият-ключ>
```

> **Критично важно**: Загубата на ключа за криптиране означава загуба на достъп до всички криптирани данни. **Архивирайте ключа отделно от базата данни**.

### Какво НЕ се криптира

От съображения за производителност следните данни се съхраняват като обикновен текст:

- Показвани имена на доставчиците
- Дефиниции на модели (вече публични)
- Правила за маршрутизиране
- Записи за използването (без лични данни)

---

## Особености при шифроването (v3.8.16+)

OmniRoute използва **`migrateLegacyEncryptedString()`**, за да обработва прозрачно две схеми за шифроване:

- **Остаряла** (преди v3.5.0): базирано на XOR „шифроване“ (не е истинска криптография)
- **Текуща**: AES-256-GCM с подходящ IV и таг за удостоверяване

Помощната функция за миграция открива остарелия формат и при първото прочитане шифрова повторно данните с новата схема. Това означава, че можете да надстроите стара база данни, без да загубите идентификационните данни.

---

## Кеш за четене

За често четени данни (модели, доставчици, настройки) `readCache.ts` предоставя **кеш в паметта**:

```ts
// Кешира се при стартиране и се анулира при запис
const providers = await getCachedProviders(); // Бързо, от паметта
const fresh = await listProviders(); // Бавно, прави заявка към БД
```

| Кеширан обект          | Ключ на кеша   | TTL      |
| ---------------------- | -------------- | -------- |
| `models`               | `models:v1`    | До запис |
| `provider_connections` | `providers:v1` | До запис |
| `settings`             | `settings:v1`  | До запис |
| `combos`               | `combos:v1`    | До запис |

Кешът се анулира при всеки запис в съответната таблица.

---

## Архивиране и възстановяване

### Ръчно архивиране

```bash
# Използвайте CLI, за да създадете локално резервно копие
omniroute backup create --name pre-migration

# Или чрез API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Файлът на резервното копие включва:

- Всички таблици на БД (сериализирани в JSON)
- Артефакти от регистъра на извикванията (кодирани с base64, незадължително)
- Настройки + тайни данни (шифровани)
- Конфигурация на приставките

### Възстановяване

```bash
# Чрез CLI
omniroute restore pre-migration

# Чрез API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Предупреждение**: Възстановяването презаписва цялата БД. Първо спрете всички клиенти.

### Автоматизирани резервни копия

```bash
# Активирайте автоматизирани ежедневни резервни копия чрез CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Графикът се изпълнява от страна на сървъра чрез фонова задача, която се задейства на всеки 30 секунди
(по подразбиране) и проверява cron израза спрямо локалното време на сървъра.

| Променлива                                  | По подразбиране | Описание                                                                                                                     |
| ------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`         | Интервал на задействане в ms (мин. `5000`). Трябва да е по-кратък от 60 s, за да попадне надеждно в съвпадащата cron минута. |

### Горещо архивиране на SQLite

За архивиране без прекъсване на работеща БД:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Това използва API на SQLite за онлайн архивиране — безопасно е да се изпълнява, докато OmniRoute работи.

---

## Настройване на производителността

### Режим WAL

WAL е активиран по подразбиране. За натоварвания с много операции за запис обмислете:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Контролна точка на всеки 1000 страници
PRAGMA journal_size_limit = 67108864;  -- Ограничение на WAL до 64MB
```

### Индекси

Ключови индекси за производителността (създавани автоматично от миграциите):

- `idx_models_provider` — търсене на модели по доставчик
- `idx_combo_targets_combo_id` — разгъване на целите на комбинация
- `idx_usage_history_api_key_timestamp` — анализ на използването
- `idx_quota_snapshots_api_key_window` — проследяване на квотите
- `idx_call_logs_timestamp` — заявки към дневника на извикванията

За да добавите нов индекс, създайте миграция:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Входно-изходни операции с отображение в паметта

За много големи бази данни (>10GB) отображението в паметта може да се настрои чрез прагма на SQLite:

```sql
-- Задайте чрез прагма на SQLite (коригирайте в core.ts или по време на изпълнение)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Компактиране

Дълго работещите екземпляри на OmniRoute имат полза от периодично изпълнение на `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Изпълнявайте ежемесечно в периоди с нисък трафик. (Режимът WAL намалява необходимостта, но не я премахва.)

---

## Проверка на изправността

`src/lib/db/healthCheck.ts` предоставя **диагностика на изправността на ниво база данни**:

И двата метода изискват удостоверяване (в противен случай се връща `401`). `GET` извършва само диагностика; `POST` изпълнява
същата проверка с активиран `autoRepair`.

```bash
GET  /api/db/health   # диагностика
POST /api/db/health   # диагностика + поправка
```

Отговорът е `DbHealthCheckResult`, генериран от `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Бюджетите на домейните препращаха към API ключове, които вече не съществуват.",
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

| Поле              | Значение                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `true`, когато `issues` е празно. `driver` никога не му влияе.                                                                                                                 |
| `issues[].type`   | Една от стойностите `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                           |
| `repairedCount`   | Редове, поправени по време на това изпълнение; винаги е `0`, когато `autoRepair` е false.                                                                                      |
| `backupCreated`   | Дали е създадено резервно копие преди поправката.                                                                                                                              |
| `checkedAt`       | Времеви печат във формат ISO, общ за изпълнението и за всяка записана от него бележка за поправка.                                                                             |
| `driver.name`     | Драйверът за SQLite, обслужващ проверяваната база данни.                                                                                                                       |
| `driver.degraded` | `true`, когато записите не се съхраняват устойчиво във файла на базата данни — резервният WASM вариант `sql.js` (устойчиво съхранение на целия файл) или база данни в паметта. |

Същите данни се връщат от MCP инструмента `omniroute_db_health_check`.

Изпълнете `PRAGMA integrity_check`, за да откриете повреда:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Трябва да изведе: ok
```

Ако върне нещо различно от `ok`, **незабавно спрете да използвате базата данни** и я възстановете от резервно копие.

---

## Възстановяване след авария

### Сценарий 1: Загубен WAL файл

Файлът `-wal` липсва, но `-shm` и основната БД са непокътнати:

```bash
# Възстановява се автоматично при следващото отваряне
omniroute
```

Ако SQLite не може да се възстанови автоматично:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Сценарий 2: Повреден файл на основната БД

Възстановете от резервно копие:

```bash
omniroute sync pull --merge   # или: omniroute backup restore <backup-id>
```

### Сценарий 3: Загубен ключ за шифроване

**Възстановяването е невъзможно** без ключа. Шифрованите полета не могат да бъдат прочетени. Добавете отново ръчно всички доставчици с нови идентификационни данни.

> **Превантивна мярка**: Винаги архивирайте ключа за шифроване отделно, за предпочитане в мениджър на пароли или KMS.

### Сценарий 4: Пълен диск

SQLite ще връща грешки `SQLITE_FULL`. Освободете дисково пространство, след което:

```bash
# Изпълнява контролна точка на WAL, за да освободи място
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Често срещани операции

### Преглед на таблица

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Преброяване на редовете във всички таблици

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Нулиране (изтриване) на всички данни

```bash
# Първо спрете OmniRoute
omniroute stop

# Изтрийте файла на БД
rm ~/.omniroute/storage.sqlite*

# Стартирайте отново (ще създаде наново празна БД)
omniroute
```

За **избирателно** нулиране (запазване на доставчиците и изтриване на данните за използването):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Експортиране на отделна таблица

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Отстраняване на неизправности

### „Базата данни е заключена“

Друг процес държи заключване за запис. Можете да:

- Изчакате другият процес да приключи (проверете с `lsof | grep storage.sqlite`)
- Прекратите другия процес
- Ако проблемът продължава, рестартирайте OmniRoute

### „Ограничението на външен ключ е нарушено“

Модул на домейна нарушава референтната цялост. Проверете за:

- Осиротели редове в зависимите таблици
- Каскадни изтривания, които не са се разпространили
- Скорошна миграция, която е променила външен ключ

Изпълнете `PRAGMA foreign_key_check;`, за да откриете нарушенията.

### „Недостатъчно памет“

Картографираният в паметта вход/изход на SQLite надвишава ограничението на операционната система. Намалете го чрез pragma на SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB вместо 256MB
```

Или го деактивирайте:

```sql
PRAGMA mmap_size = 0;
```

### „Миграцията е неуспешна по средата“

Миграцията е изпълнена в транзакция, така че би трябвало да е била отменена. Ако това не е станало:

1. **Спрете OmniRoute** (за да предотвратите допълнителни опити)
2. **Проверете състоянието на БД** със `sqlite3`
3. **Поправете ръчно** частичната миграция
4. **Стартирайте отново** OmniRoute (миграцията ще бъде повторена)

За да предотвратите това, винаги първо тествайте миграциите върху копие.

---

## Вижте също

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — таблици за използването
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — наблюдение на състоянието
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — процес на издаване
- Изходен код: `src/lib/db/` (80+ файла, ~25K реда код)
