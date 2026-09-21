# Database Schema & Operations Guide (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Коротко**: OmniRoute використовує **SQLite із журналюванням WAL** як основне сховище та шифрування **AES-256-GCM** для конфіденційних полів у стані спокою. У цьому посібнику розглянуто схему, міграції, резервне копіювання й відновлення, а також операційні інструкції.

**Джерела:**

- `src/lib/db/core.ts` — синглтон + SCHEMA_SQL (17 базових таблиць)
- `src/lib/db/migrationRunner.ts` — версійні міграції
- `src/lib/db/migrations/` — 167 версійних SQL-файлів
- `src/lib/db/encryption.ts` — допоміжні засоби шифрування
- `src/lib/db/backup.ts` — експорт/імпорт резервних копій
- `src/lib/db/healthCheck.ts` — діагностика стану

---

## Чому SQLite?

OmniRoute вибрав SQLite замість PostgreSQL/MySQL з кількох причин:

| Фактор                    | SQLite                                         | PostgreSQL                                     |
| ------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| **Розгортання**           | Вбудована — окремий сервер не потрібен         | Потребує налаштування сервера                  |
| **Шифрування**            | На рівні застосунку (AES-256-GCM)              | Вбудоване TDE                                  |
| **Продуктивність**        | Швидша для малих/середніх навантажень          | Краща для великої кількості одночасних записів |
| **Паралельність**         | Режим WAL дозволяє паралельне читання          | Повноцінний MVCC                               |
| **Резервне копіювання**   | Копіювання одного файлу                        | `pg_dump` або знімок файлової системи          |
| **Сценарій використання** | Встановлення для одного користувача, вбудована | Багатокористувацький SaaS                      |

Для розгортань з **одним користувачем і одним екземпляром** (основний сценарій використання OmniRoute) SQLite простіша та швидша.

### Журналювання WAL

`core.ts` відкриває базу даних у **режимі WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL дозволяє виконувати **паралельне читання** під час запису — це важливо для інформаційної панелі, яка виконує запити, поки реєструються звернення.

Стандартний розмір кешу становить **65 536 КіБ (64 МіБ)**. SQLite інтерпретує від’ємне значення
`cache_size` як приблизну верхню межу в КіБ і виділяє сторінки за потреби.
Параметр **Налаштування > Система та сховище > Розмір кешу** приймає цілі значення від **1 до
1 000 000 КіБ**; збереження параметра застосовує його до активного з’єднання з базою даних,
а OmniRoute відновлює збережене значення під час запуску.

---

## Розташування бази даних

Файл SQLite зберігається за адресою:

| ОС      | Шлях                                                         |
| ------- | ------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                |
| macOS   | `~/.omniroute/storage.sqlite`                                |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                    |
| Docker  | `/app/data/storage.sqlite` (налаштовується через `DATA_DIR`) |

Супровідні файли:

- `storage.sqlite-wal` — журнал випереджального запису
- `storage.sqlite-shm` — файл спільної пам’яті
- `call_logs/` — артефакти корисного навантаження запитів (якщо ввімкнено)

**Зміна розташування:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Архітектура доменних модулів

База даних OmniRoute має **110 модулів TypeScript верхнього рівня** у `src/lib/db/`. Кожен доменний модуль:

- Відповідає за одну або кілька конкретних таблиць
- Експортує типізовані CRUD-функції
- Ніколи не звертається до таблиць інших модулів
- Використовує `getDbInstance()` із `core.ts` для доступу до бази даних

### 110 модулів бази даних верхнього рівня

OmniRoute має **110 файлів TypeScript верхнього рівня** у `src/lib/db/`. Нижче наведено вибірку основних модулів; повний список дивіться в переліку файлів каталогу:

| Модуль                  | Таблиці                                                        | Відповідальність                                                                         |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Реєстрація провайдерів через OAuth/API-ключі та облікові дані                            |
| `models.ts`             | `key_value` (дані моделей)                                     | Визначення моделей, можливості, ціноутворення                                            |
| `combos.ts`             | `combos`                                                       | Конфігурації та порядок комбінованої маршрутизації                                       |
| `apiKeys.ts`            | `api_keys`                                                     | Життєвий цикл API-ключів, області доступу, відстеження квот                              |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Конфігурація системи та спільне сховище «ключ-значення»                                  |
| `backup.ts`             | —                                                              | Операції експорту/імпорту резервних копій                                                |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Конфігурації проксі та правила маршрутизації                                             |
| `prompts.ts`            | `prompt_templates`                                             | Багаторазово використовувані шаблони промптів і керування версіями                       |
| `webhooks.ts`           | `webhooks`                                                     | Керовані подіями підписки на вебхуки та журнали                                          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Журналювання аудиту для кожного запиту (необов’язкове, великий обсяг)                    |
| `domainState.ts`        | `domain_*` (5 таблиць)                                         | Доменні бюджети, автоматичні вимикачі, блокування, ланцюжки резервування, історія витрат |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API-ключі з білого списку для MCP/A2A                                                    |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Історичні дані про використання квот                                                     |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Зіставлення моделей із комбінаціями за замовчуванням                                     |
| `cliToolState.ts`       | `cli_tool_state`                                               | Постійний стан, специфічний для CLI                                                      |
| `encryption.ts`         | —                                                              | Допоміжні засоби для шифрування/дешифрування полів                                       |
| `readCache.ts`          | —                                                              | Кеш у пам’яті для операцій із великою кількістю читань                                   |
| `secrets.ts`            | `key_value` (зашифровані записи)                               | Зашифроване сховище секретів                                                             |
| `stateReset.ts`         | —                                                              | Очищення/скидання стану бази даних для тестування                                        |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Контекст сеансу для передавання керування між агентами                                   |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Відстеження використання                                                                 |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Конфігурація стиснення                                                                   |

### Межі модулів

Основне архітектурне правило: **модулі не звертаються безпосередньо до таблиць один одного**. Щоб працювати з даними іншого модуля, імпортуйте функцію з цього модуля.

```ts
// ❌ НЕПРАВИЛЬНО: прямий SQL-запит з іншого модуля
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ПРАВИЛЬНО: використовуйте функцію модуля providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Дотримання цього правила забезпечується перевіркою коду — статичної перевірки немає, але порушення позначаються.

---

## Базова схема (17 таблиць)

`core.ts` визначає 17 базових таблиць у `SCHEMA_SQL`. Вони створюються міграцією `001_initial_schema.sql` і формують основну схему.

### Основні таблиці (створені початковою міграцією)

| Таблиця                    | Призначення                                    | Ключові стовпці                                                         |
| -------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Облікові дані провайдера (зашифровані)         | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Інформація про маршрутизацію вузлів провайдера | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Загальне сховище KV                            | `namespace`, `key`, `value`                                             |
| `combos`                   | Визначення комбінацій маршрутизації            | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Ключі API для шлюзу                            | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Метадані бази даних                            | `key`, `value`                                                          |
| `usage_history`            | Записи про використання запитів                | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Дані запитів і відповіді                       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Журнали проксі-запитів                         | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Ланцюжки «модель — провайдер»                  | `model`, `chain`                                                        |
| `domain_budgets`           | Бюджети витрат для кожного домену              | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Історія скидання бюджетів                      | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Відстеження витрат для кожного домену          | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Стан обмеження частоти запитів домену          | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Стан автоматичного вимикача для кожного домену | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Кеш відповідей LLM                             | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Історичні знімки квот                          | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Додаткові таблиці (додані пізнішими міграціями)

Подальші міграції додають такі таблиці:

- `cli_tool_state` (міграція 011) — стан інструмента CLI
- таблиці `mcp_*` — аудит сервера MCP
- таблиці `a2a_*` — стан завдань A2A
- таблиці `usage_*` — відстеження використання
- таблиці `plugin_*` — система плагінів
- `skill_executions` — історія виконання навичок
- таблиці `memory_*` — система пам’яті
- таблиці `compression_*` — система стиснення
- таблиці `webhook_*` — журнал доставки вебхуків
- таблиці `acp_*` — протокол клієнта агента
- таблиці `oneproxy_*` — маркетплейс 1proxy
- `proxy_assignments` — прив’язки областей дії проксі
- `detailed_call_artifacts` — метадані артефактів журналу викликів
- `quota_alert_history` — аудит сповіщень про квоти
- `command_code_auth_sessions` — сеанси OAuth Command Code

Повний список із понад 30 таблиць міститься в `src/lib/db/migrations/`.

---

## Міграції

OmniRoute використовує **версійовані, ідемпотентні міграції** в `src/lib/db/migrations/`. Кожна міграція — це окремий SQL-файл із назвою `NNN_description.sql`.

### Іменування міграцій

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Як виконуються міграції

Під час запуску `migrationRunner.ts`:

1. Створює таблицю `_omniroute_migrations`, якщо вона не існує
2. Отримує перелік уже застосованих міграцій
3. Послідовно застосовує всі нові міграції, кожну в окремій транзакції
4. Записує кожну застосовану міграцію з позначкою часу

```ts
// src/lib/db/migrationRunner.ts (спрощено)
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

### Ідемпотентність

Міграції мають бути **ідемпотентними** — їх повторне виконання не повинно призводити до жодних змін:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Широко використовуйте конструкції `IF NOT EXISTS`, `IF EXISTS` та `OR IGNORE` / `OR REPLACE`.

### Додавання нової міграції

1. **Визначте наступний номер**: `ls src/lib/db/migrations/ | tail -1`
2. **Створіть файл**: `NNN_my_change.sql`
3. **Використовуйте безпечний DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Обережно заповнюйте дані**: використовуйте `UPDATE ... WHERE ...` для обробки наявних рядків
5. **Тестуйте на копії**: ніколи не запускайте неперевірені міграції у виробничому середовищі

Приклад:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Зміни, несумісні з попередніми версіями** (наприклад, видалення стовпців), є складними. OmniRoute НЕ підтримує повернення до попередньої версії — після застосування міграції зміна схеми стає постійною. Плануйте відповідно.

---

## Шифрування даних у стані спокою

Конфіденційні поля (ключі API, токени OAuth, рядки підключення) шифруються у стані спокою за допомогою **AES-256-GCM**.

### Як це працює

```ts
// src/lib/db/encryption.ts (спрощено)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Де це використовується

- `provider_connections.api_key` — шифрується на рівні застосунку
- `provider_connections.access_token`, `refresh_token`, `id_token` — шифруються на рівні застосунку
- Записи `key_value` з `namespace = "secrets"` — шифруються на рівні застосунку
- `proxy_registry.auth` — шифрується на рівні застосунку (за наявності)

### Ключ шифрування

Ключ шифрування утворюється з **парольної фрази** (задається через змінну середовища `STORAGE_ENCRYPTION_KEY`) і **солі** (зберігається в БД). Для розшифрування даних потрібні обидва компоненти.

```bash
# Згенеруйте безпечну парольну фразу
openssl rand -hex 32

# Задайте в .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Критично важливо**: втрата ключа шифрування означає втрату доступу до всіх зашифрованих даних. **Зберігайте резервну копію ключа окремо від бази даних**.

### Що НЕ шифрується

З міркувань продуктивності наведені нижче дані зберігаються як звичайний текст:

- Відображувані назви постачальників
- Визначення моделей (вони вже загальнодоступні)
- Правила маршрутизації
- Записи про використання (без персональних даних)

---

## Застереження щодо шифрування (v3.8.16+)

OmniRoute використовує **`migrateLegacyEncryptedString()`** для прозорої підтримки двох схем шифрування:

- **Застаріла** (до v3.5.0): «шифрування» на основі XOR (не справжня криптографія)
- **Поточна**: AES-256-GCM із належним IV і тегом автентифікації

Допоміжна функція міграції виявляє застарілий формат і повторно шифрує дані за новою схемою під час першого читання. Це дає змогу оновити стару базу даних без втрати облікових даних.

---

## Кеш читання

Для даних, які часто зчитуються (моделей, постачальників, налаштувань), `readCache.ts` надає **кеш у пам’яті**:

```ts
// Кешується під час запуску, анулюється під час запису
const providers = await getCachedProviders(); // Швидко, у пам’яті
const fresh = await listProviders(); // Повільно, звертається до БД
```

| Кешована сутність      | Ключ кешу      | TTL                  |
| ---------------------- | -------------- | -------------------- |
| `models`               | `models:v1`    | До наступного запису |
| `provider_connections` | `providers:v1` | До наступного запису |
| `settings`             | `settings:v1`  | До наступного запису |
| `combos`               | `combos:v1`    | До наступного запису |

Кеш анулюється під час кожного запису до відповідної таблиці.

---

## Резервне копіювання та відновлення

### Ручне резервне копіювання

```bash
# Використайте CLI, щоб створити локальну резервну копію
omniroute backup create --name pre-migration

# Або через API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Файл резервної копії містить:

- Усі таблиці БД (серіалізовані у JSON)
- Артефакти журналу викликів (закодовані у base64, необов’язково)
- Налаштування та секрети (зашифровані)
- Конфігурацію плагінів

### Відновлення

```bash
# Через CLI
omniroute restore pre-migration

# Через API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Попередження**: відновлення перезаписує всю БД. Спочатку зупиніть усі клієнти.

### Автоматизоване резервне копіювання

```bash
# Увімкніть автоматизоване щоденне резервне копіювання через CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Розклад виконується на боці сервера фоновим завданням, яке запускається кожні 30 секунд
(за замовчуванням) і перевіряє вираз cron відповідно до локального часу сервера.

| Змінна                                      | Значення за замовчуванням | Опис                                                                                                              |
| ------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`                   | Інтервал запуску в мс (мін. `5000`). Має бути коротшим за 60 с, щоб надійно потрапляти у відповідну хвилину cron. |

### Гаряче резервне копіювання SQLite

Для резервного копіювання активної БД без простою:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ця команда використовує API оперативного резервного копіювання SQLite — її безпечно запускати під час роботи OmniRoute.

---

## Налаштування продуктивності

### Режим WAL

WAL увімкнено за замовчуванням. Для робочих навантажень з інтенсивним записом розгляньте такі налаштування:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Контрольна точка кожні 1000 сторінок
PRAGMA journal_size_limit = 67108864;  -- Обмеження WAL у 64 МБ
```

### Індекси

Ключові індекси для продуктивності (автоматично створюються міграціями):

- `idx_models_provider` — пошук моделей за постачальником
- `idx_combo_targets_combo_id` — розгортання цілей комбінації
- `idx_usage_history_api_key_timestamp` — аналітика використання
- `idx_quota_snapshots_api_key_window` — відстеження квот
- `idx_call_logs_timestamp` — запити до журналу викликів

Щоб додати новий індекс, створіть міграцію:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Ввід-вивід із відображенням у пам’ять

Для дуже великих баз даних (>10 ГБ) відображення в пам’ять можна налаштувати за допомогою pragma SQLite:

```sql
-- Задайте за допомогою pragma SQLite (налаштуйте в core.ts або під час виконання)
PRAGMA mmap_size = 268435456;  -- 256 МБ
```

### Ущільнення

Для екземплярів OmniRoute, що працюють тривалий час, корисно періодично виконувати `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Запускайте щомісяця в періоди низького навантаження. (Режим WAL зменшує потребу в цьому, але не усуває її повністю.)

---

## Перевірка стану

`src/lib/db/healthCheck.ts` надає **діагностику стану на рівні БД**:

Обидва методи потребують автентифікації (інакше повертається `401`). `GET` лише виконує діагностику; `POST` запускає
ту саму перевірку з увімкненим `autoRepair`.

```bash
GET  /api/db/health   # діагностика
POST /api/db/health   # діагностика + відновлення
```

У відповіді повертається `DbHealthCheckResult`, створений функцією `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Бюджети доменів посилалися на ключі API, яких більше не існує.",
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

| Поле              | Значення                                                                                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, коли `issues` порожній. `driver` ніколи не впливає на це значення.                                                                                  |
| `issues[].type`   | Одне зі значень: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                           |
| `repairedCount`   | Кількість рядків, відновлених під час цього запуску; завжди `0`, коли `autoRepair` має значення false.                                                      |
| `backupCreated`   | Чи було створено резервну копію перед відновленням.                                                                                                         |
| `checkedAt`       | Позначка часу ISO, спільна для запуску та будь-якої створеної ним примітки про відновлення.                                                                 |
| `driver.name`     | Драйвер SQLite, який обслуговує перевірену базу даних.                                                                                                      |
| `driver.degraded` | `true`, коли запис не має надійного збереження у файлі бази даних — резервний WASM-драйвер `sql.js` (зі збереженням усього файлу) або база даних у пам’яті. |

Такий самий вміст повертає інструмент MCP `omniroute_db_health_check`.

Запустіть `PRAGMA integrity_check`, щоб виявити пошкодження:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Має вивести: ok
```

Якщо команда повертає будь-що, крім `ok`, **негайно припиніть використання бази даних** і відновіть її з резервної копії.

---

## Аварійне відновлення

### Сценарій 1: втрачено файл WAL

Файл `-wal` відсутній, але `-shm` і основна БД не пошкоджені:

```bash
# Автоматично відновлюється під час наступного відкриття
omniroute
```

Якщо SQLite не може виконати автоматичне відновлення:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Сценарій 2: пошкоджено файл основної БД

Відновіть із резервної копії:

```bash
omniroute sync pull --merge   # або: omniroute backup restore <backup-id>
```

### Сценарій 3: втрачено ключ шифрування

**Відновлення неможливе** без ключа. Зашифровані поля неможливо прочитати. Повторно додайте всіх постачальників вручну з новими обліковими даними.

> **Запобіжний захід**: завжди створюйте окрему резервну копію ключа шифрування, бажано в менеджері паролів або KMS.

### Сценарій 4: диск заповнений

SQLite повертатиме помилки `SQLITE_FULL`. Звільніть місце на диску, а потім виконайте:

```bash
# Створіть контрольну точку WAL, щоб звільнити місце
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Поширені операції

### Перегляд таблиці

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Підрахунок рядків у всіх таблицях

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Скидання (видалення) усіх даних

```bash
# Спочатку зупиніть OmniRoute
omniroute stop

# Видаліть файл БД
rm ~/.omniroute/storage.sqlite*

# Перезапустіть (буде повторно створено порожню БД)
omniroute
```

Для **вибіркового** скидання (зберегти постачальників, видалити дані про використання):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Експорт окремої таблиці

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Усунення несправностей

### "Базу даних заблоковано"

Інший процес утримує блокування запису. Можна:

- Зачекати, доки інший процес завершиться (перевірте за допомогою `lsof | grep storage.sqlite`)
- Примусово завершити інший процес
- Якщо проблема не зникає, перезапустити OmniRoute

### "Порушено обмеження зовнішнього ключа"

Доменний модуль порушує посилальну цілісність. Перевірте:

- Осиротілі рядки в залежних таблицях
- Каскадні видалення, які не були поширені
- Нещодавню міграцію, яка змінила зовнішній ключ

Виконайте `PRAGMA foreign_key_check;`, щоб знайти порушення.

### "Недостатньо пам’яті"

Відображене в пам’ять введення-виведення SQLite перевищує обмеження ОС. Зменште обсяг за допомогою прагми SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128 МБ замість 256 МБ
```

Або вимкніть:

```sql
PRAGMA mmap_size = 0;
```

### "Помилка міграції на проміжному етапі"

Міграція виконувалася в транзакції, тому зміни мали бути відкладені. Якщо цього не сталося:

1. **Зупиніть OmniRoute** (щоб запобігти подальшим спробам)
2. **Перевірте стан БД** за допомогою `sqlite3`
3. **Вручну виправте** частково виконану міграцію
4. **Повторно запустіть** OmniRoute (буде здійснено повторну спробу міграції)

Щоб запобігти цьому, завжди спочатку тестуйте міграції на копії.

---

## Дивіться також

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — таблиці використання
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — моніторинг стану
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — процес випуску
- Джерело: `src/lib/db/` (понад 80 файлів, ~25 тис. рядків коду)
