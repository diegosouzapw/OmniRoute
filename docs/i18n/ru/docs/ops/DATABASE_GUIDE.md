# Database Schema & Operations Guide (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Кратко**: OmniRoute использует **SQLite с журналированием WAL** в качестве основного хранилища и шифрование **AES-256-GCM** для конфиденциальных полей при хранении. В этом руководстве рассматриваются схема, миграции, резервное копирование/восстановление и эксплуатационные инструкции.

**Источники:**

- `src/lib/db/core.ts` — синглтон + SCHEMA_SQL (17 базовых таблиц)
- `src/lib/db/migrationRunner.ts` — версионированные миграции
- `src/lib/db/migrations/` — 167 версионированных SQL-файлов
- `src/lib/db/encryption.ts` — вспомогательные функции шифрования
- `src/lib/db/backup.ts` — экспорт/импорт резервных копий
- `src/lib/db/healthCheck.ts` — диагностика состояния

---

## Почему SQLite?

OmniRoute выбрал SQLite вместо PostgreSQL/MySQL по нескольким причинам:

| Фактор                    | SQLite                                             | PostgreSQL                                             |
| ------------------------- | -------------------------------------------------- | ------------------------------------------------------ |
| **Развертывание**         | Встраиваемая БД — отдельный сервер не нужен        | Требуется настройка сервера                            |
| **Шифрование**            | На уровне приложения (AES-256-GCM)                 | Встроенное TDE                                         |
| **Производительность**    | Быстрее для малых/средних нагрузок                 | Лучше для огромного числа параллельных операций записи |
| **Параллелизм**           | Режим WAL допускает параллельное чтение            | Полноценный MVCC                                       |
| **Резервное копирование** | Копирование одного файла                           | `pg_dump` или снимок файловой системы                  |
| **Вариант использования** | Установка для одного пользователя, встраиваемая БД | Многопользовательский SaaS                             |

Для развертываний с **одним пользователем и одним экземпляром** (основной вариант использования OmniRoute) SQLite проще и быстрее.

### Журналирование WAL

`core.ts` открывает базу данных в **режиме WAL (Write-Ahead Logging — журналирование с упреждающей записью)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL допускает **параллельное чтение** во время записи — это важно для панели мониторинга, которая выполняет запросы одновременно с регистрацией запросов.

Размер кэша по умолчанию составляет **65 536 КиБ (64 МиБ)**. SQLite интерпретирует отрицательное значение
`cache_size` как приблизительную верхнюю границу в КиБ и выделяет страницы по мере необходимости.
В разделе **Настройки > Система и хранилище > Размер кэша** можно указывать целые значения от **1 до
1 000 000 КиБ**; при сохранении настройка применяется к активному подключению к базе данных,
а при запуске OmniRoute восстанавливает сохраненное значение.

---

## Расположение базы данных

Файл SQLite хранится по следующему пути:

| ОС      | Путь                                                        |
| ------- | ----------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                               |
| macOS   | `~/.omniroute/storage.sqlite`                               |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker  | `/app/data/storage.sqlite` (настраивается через `DATA_DIR`) |

Сопутствующие файлы:

- `storage.sqlite-wal` — журнал упреждающей записи
- `storage.sqlite-shm` — файл общей памяти
- `call_logs/` — артефакты полезной нагрузки запросов (если включено)

**Изменение расположения:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Архитектура доменных модулей

База данных OmniRoute содержит **110 модулей TypeScript верхнего уровня** в `src/lib/db/`. Каждый доменный модуль:

- Управляет одной или несколькими определёнными таблицами
- Экспортирует типизированные CRUD-функции
- Никогда не обращается к таблицам другого модуля
- Использует `getDbInstance()` из `core.ts` для доступа к БД

### 110 модулей БД верхнего уровня

OmniRoute содержит **110 файлов TypeScript верхнего уровня** в `src/lib/db/`. Ниже приведены некоторые из основных модулей; полный список см. в содержимом каталога:

| Модуль                  | Таблицы                                                        | Назначение                                                                                      |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Регистрация провайдеров по OAuth/API-ключу и учётные данные                                     |
| `models.ts`             | `key_value` (данные моделей)                                   | Определения моделей, возможности, цены                                                          |
| `combos.ts`             | `combos`                                                       | Конфигурации комбинированной маршрутизации и порядок                                            |
| `apiKeys.ts`            | `api_keys`                                                     | Жизненный цикл API-ключей, области доступа, отслеживание квот                                   |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Системная конфигурация и общее KV-хранилище                                                     |
| `backup.ts`             | —                                                              | Операции экспорта/импорта резервных копий                                                       |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Конфигурации прокси и правила маршрутизации                                                     |
| `prompts.ts`            | `prompt_templates`                                             | Многократно используемые шаблоны промптов и управление версиями                                 |
| `webhooks.ts`           | `webhooks`                                                     | Подписки на вебхуки, управляемые событиями, и журналы                                           |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Журналирование аудита для каждого запроса (необязательно, большой объём)                        |
| `domainState.ts`        | `domain_*` (5 таблиц)                                          | Бюджеты доменов, автоматические выключатели, блокировки, цепочки резервирования, история затрат |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Разрешённые API-ключи для MCP/A2A                                                               |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | История использования квот                                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Сопоставление моделей с комбинациями по умолчанию                                               |
| `cliToolState.ts`       | `cli_tool_state`                                               | Сохраняемое состояние, специфичное для CLI                                                      |
| `encryption.ts`         | —                                                              | Вспомогательные средства для шифрования/расшифровки полей                                       |
| `readCache.ts`          | —                                                              | Кеш в памяти для операций с интенсивным чтением                                                 |
| `secrets.ts`            | `key_value` (зашифрованные записи)                             | Зашифрованное хранилище секретов                                                                |
| `stateReset.ts`         | —                                                              | Очистка/сброс состояния БД для тестирования                                                     |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Контекст сеанса для передачи управления между агентами                                          |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Отслеживание использования                                                                      |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Конфигурация сжатия                                                                             |

### Границы модулей

Основное архитектурное правило: **модули не обращаются напрямую к таблицам друг друга**. Для работы с данными другого модуля импортируйте функцию из этого модуля.

```ts
// ❌ НЕПРАВИЛЬНО: прямой SQL-запрос к таблице другого модуля
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ПРАВИЛЬНО: используйте функцию модуля providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Соблюдение этого правила контролируется при проверке кода — статическая проверка отсутствует, но нарушения отмечаются.

---

## Базовая схема (17 таблиц)

`core.ts` определяет 17 базовых таблиц в `SCHEMA_SQL`. Они создаются миграцией `001_initial_schema.sql` и формируют основную схему.

### Основные таблицы (создаются при начальной миграции)

| Таблица                    | Назначение                                    | Ключевые столбцы                                                        |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Учётные данные провайдеров (зашифрованы)      | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Информация о маршрутизации узлов провайдера   | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Универсальное KV-хранилище                    | `namespace`, `key`, `value`                                             |
| `combos`                   | Определения комбинаций маршрутизации          | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-ключи для шлюза                           | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Метаданные базы данных                        | `key`, `value`                                                          |
| `usage_history`            | Записи об использовании запросов              | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Данные запросов и ответы                      | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Журналы прокси-запросов                       | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Цепочки провайдеров для моделей               | `model`, `chain`                                                        |
| `domain_budgets`           | Бюджеты расходов для отдельных доменов        | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | История сбросов бюджета                       | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Отслеживание затрат по доменам                | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Состояние ограничения частоты запросов домена | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Состояние предохранителя для каждого домена   | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Кэш ответов LLM                               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Исторические снимки квот                      | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Дополнительные таблицы (добавлены последующими миграциями)

Последующие миграции добавляют такие таблицы, как:

- `cli_tool_state` (миграция 011) — состояние инструмента CLI
- Таблицы `mcp_*` — аудит сервера MCP
- Таблицы `a2a_*` — состояние задач A2A
- Таблицы `usage_*` — отслеживание использования
- Таблицы `plugin_*` — система плагинов
- `skill_executions` — история выполнения навыков
- Таблицы `memory_*` — система памяти
- Таблицы `compression_*` — система сжатия
- Таблицы `webhook_*` — журнал доставки вебхуков
- Таблицы `acp_*` — Agent Client Protocol
- Таблицы `oneproxy_*` — маркетплейс 1proxy
- `proxy_assignments` — привязки областей действия прокси
- `detailed_call_artifacts` — метаданные артефактов журнала вызовов
- `quota_alert_history` — аудит оповещений о квотах
- `command_code_auth_sessions` — сеансы OAuth Command Code

Полный список из более чем 30 таблиц находится в `src/lib/db/migrations/`.

---

## Миграции

OmniRoute использует **версионированные идемпотентные миграции** в `src/lib/db/migrations/`. Каждая миграция представляет собой отдельный SQL-файл с именем `NNN_description.sql`.

### Именование миграций

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Как выполняются миграции

При запуске `migrationRunner.ts`:

1. Создаёт таблицу `_omniroute_migrations`, если она не существует
2. Запрашивает список уже применённых миграций
3. Последовательно применяет все новые миграции, каждую в отдельной транзакции
4. Записывает каждую применённую миграцию с временной меткой

```ts
// src/lib/db/migrationRunner.ts (упрощённо)
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

### Идемпотентность

Миграции должны быть **идемпотентными** — их повторный запуск не должен приводить к каким-либо изменениям:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Активно используйте конструкции `IF NOT EXISTS`, `IF EXISTS`, а также `OR IGNORE` / `OR REPLACE`.

### Добавление новой миграции

1. **Определите следующий номер**: `ls src/lib/db/migrations/ | tail -1`
2. **Создайте файл**: `NNN_my_change.sql`
3. **Используйте безопасный DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Осторожно заполните данные**: используйте `UPDATE ... WHERE ...` для обработки существующих строк
5. **Протестируйте на копии**: никогда не запускайте непроверенные миграции в рабочей среде

Пример:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Изменения без обратной совместимости** (например, удаление столбцов) требуют особой осторожности. OmniRoute НЕ поддерживает откат к предыдущей версии — после применения миграции изменение схемы становится постоянным. Учитывайте это при планировании.

---

## Шифрование хранимых данных

Конфиденциальные поля (ключи API, токены OAuth, строки подключения) шифруются при хранении с использованием **AES-256-GCM**.

### Как это работает

```ts
// src/lib/db/encryption.ts (упрощённо)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Где это используется

- `provider_connections.api_key` — шифруется на уровне приложения
- `provider_connections.access_token`, `refresh_token`, `id_token` — шифруются на уровне приложения
- Записи `key_value` с `namespace = "secrets"` — шифруются на уровне приложения
- `proxy_registry.auth` — шифруется на уровне приложения (если присутствует)

### Ключ шифрования

Ключ шифрования формируется на основе **секретной фразы** (задаётся через переменную окружения `STORAGE_ENCRYPTION_KEY`) и **соли** (хранится в БД). Для расшифровки данных необходимы оба значения.

```bash
# Сгенерировать безопасную секретную фразу
openssl rand -hex 32

# Задать в .env
STORAGE_ENCRYPTION_KEY=<ваш-ключ>
```

> **Критически важно**: потеря ключа шифрования означает потерю доступа ко всем зашифрованным данным. **Храните резервную копию ключа отдельно от базы данных**.

### Что НЕ шифруется

По соображениям производительности следующие данные хранятся в открытом виде:

- Отображаемые имена провайдеров
- Определения моделей (они и так общедоступны)
- Правила маршрутизации
- Записи об использовании (без персональных данных)

---

## Особенности шифрования (v3.8.16+)

OmniRoute использует **`migrateLegacyEncryptedString()`** для прозрачной поддержки двух схем шифрования:

- **Устаревшая** (до v3.5.0): «шифрование» на основе XOR (не является настоящей криптографией)
- **Текущая**: AES-256-GCM с корректным IV и тегом аутентификации

Вспомогательная функция миграции обнаруживает устаревший формат и при первом чтении повторно шифрует данные с использованием новой схемы. Это означает, что старую базу данных можно обновить без потери учётных данных.

---

## Кэш чтения

Для часто считываемых данных (моделей, провайдеров, настроек) `readCache.ts` предоставляет **кэш в памяти**:

```ts
// Кэшируется при запуске, сбрасывается при записи
const providers = await getCachedProviders(); // Быстро, из памяти
const fresh = await listProviders(); // Медленно, обращается к БД
```

| Кэшируемая сущность    | Ключ кэша      | TTL       |
| ---------------------- | -------------- | --------- |
| `models`               | `models:v1`    | До записи |
| `provider_connections` | `providers:v1` | До записи |
| `settings`             | `settings:v1`  | До записи |
| `combos`               | `combos:v1`    | До записи |

Кэш сбрасывается при каждой записи в соответствующую таблицу.

---

## Резервное копирование и восстановление

### Резервное копирование вручную

```bash
# Используйте CLI для создания локальной резервной копии
omniroute backup create --name pre-migration

# Или через API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Файл резервной копии содержит:

- Все таблицы БД (сериализованные в JSON)
- Артефакты журнала вызовов (закодированные в base64, необязательно)
- Настройки и секреты (в зашифрованном виде)
- Конфигурацию плагинов

### Восстановление

```bash
# Через CLI
omniroute restore pre-migration

# Через API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Предупреждение**: восстановление перезаписывает всю БД. Сначала остановите все клиенты.

### Автоматическое резервное копирование

```bash
# Включите автоматическое ежедневное резервное копирование через CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Расписание выполняется на стороне сервера фоновой задачей, которая запускается каждые 30 секунд
(по умолчанию) и сопоставляет cron-выражение с локальным временем сервера.

| Переменная                                  | Значение по умолчанию | Описание                                                                                                                       |
| ------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`               | Интервал запуска в мс (мин. `5000`). Должен быть короче 60 с, чтобы надёжно попадать в минуту, соответствующую cron-выражению. |

### Горячее резервное копирование SQLite

Для резервного копирования работающей БД без простоя:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

При этом используется API оперативного резервного копирования SQLite — команду можно безопасно выполнять во время работы OmniRoute.

---

## Настройка производительности

### Режим WAL

WAL включён по умолчанию. Для рабочих нагрузок с большим количеством операций записи рекомендуется:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Контрольная точка каждые 1000 страниц
PRAGMA journal_size_limit = 67108864;  -- Ограничение WAL в 64 МБ
```

### Индексы

Ключевые индексы для повышения производительности (автоматически создаются миграциями):

- `idx_models_provider` — поиск моделей по поставщику
- `idx_combo_targets_combo_id` — развёртывание целей комбинации
- `idx_usage_history_api_key_timestamp` — аналитика использования
- `idx_quota_snapshots_api_key_window` — отслеживание квот
- `idx_call_logs_timestamp` — запросы к журналу вызовов

Чтобы добавить новый индекс, создайте миграцию:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Ввод-вывод с отображением в память

Для очень больших баз данных (>10 ГБ) размер отображаемой памяти можно настроить с помощью pragma SQLite:

```sql
-- Задаётся через pragma SQLite (настройте в core.ts или во время выполнения)
PRAGMA mmap_size = 268435456;  -- 256 МБ
```

### Уплотнение

Для длительно работающих экземпляров OmniRoute полезно время от времени выполнять `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Запускайте ежемесячно в периоды низкой нагрузки. (Режим WAL снижает необходимость в этом, но не устраняет её полностью.)

---

## Проверка работоспособности

`src/lib/db/healthCheck.ts` предоставляет **диагностику работоспособности на уровне БД**:

Оба метода требуют аутентификации (в противном случае возвращается `401`). `GET` выполняет только диагностику; `POST` выполняет
ту же проверку с включённым параметром `autoRepair`.

```bash
GET  /api/db/health   # диагностика
POST /api/db/health   # диагностика + восстановление
```

Ответом является `DbHealthCheckResult`, сформированный функцией `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Бюджеты доменов ссылались на API-ключи, которых больше не существует.",
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

| Поле              | Значение                                                                                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Имеет значение `true`, если `issues` пуст. `driver` никогда не влияет на это значение.                                                                                        |
| `issues[].type`   | Одно из значений: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                            |
| `repairedCount`   | Количество строк, восстановленных во время этого запуска; всегда равно `0`, если `autoRepair` имеет значение false.                                                           |
| `backupCreated`   | Указывает, была ли создана резервная копия перед восстановлением.                                                                                                             |
| `checkedAt`       | Временная метка ISO, общая для запуска и любой созданной им записи о восстановлении.                                                                                          |
| `driver.name`     | Драйвер SQLite, обслуживающий проверяемую базу данных.                                                                                                                        |
| `driver.degraded` | Имеет значение `true`, если записи не сохраняются надёжно в файле базы данных — резервный WASM-драйвер `sql.js` (с сохранением всего файла целиком) или база данных в памяти. |

Те же данные возвращаются инструментом MCP `omniroute_db_health_check`.

Выполните `PRAGMA integrity_check`, чтобы обнаружить повреждения:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Должно быть выведено: ok
```

Если команда возвращает что-либо, кроме `ok`, **немедленно прекратите использовать базу данных** и восстановите её из резервной копии.

---

## Аварийное восстановление

### Сценарий 1: потерян файл WAL

Файл `-wal` отсутствует, но `-shm` и основной файл БД не повреждены:

```bash
# Автоматическое восстановление при следующем открытии
omniroute
```

Если SQLite не может выполнить автоматическое восстановление:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Сценарий 2: повреждён основной файл БД

Восстановите его из резервной копии:

```bash
omniroute sync pull --merge   # или: omniroute backup restore <backup-id>
```

### Сценарий 3: потерян ключ шифрования

Без ключа **восстановление невозможно**. Зашифрованные поля невозможно прочитать. Повторно добавьте всех провайдеров вручную с новыми учётными данными.

> **Мера предосторожности**: всегда создавайте отдельную резервную копию ключа шифрования, желательно в менеджере паролей или KMS.

### Сценарий 4: диск заполнен

SQLite будет возвращать ошибки `SQLITE_FULL`. Освободите место на диске, затем выполните:

```bash
# Выполнить контрольную точку WAL, чтобы освободить место
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Распространённые операции

### Просмотр таблицы

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Подсчёт строк во всех таблицах

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Сброс (удаление) всех данных

```bash
# Сначала остановите OmniRoute
omniroute stop

# Удалите файл БД
rm ~/.omniroute/storage.sqlite*

# Перезапустите приложение (будет повторно создана пустая БД)
omniroute
```

Для **выборочного** сброса (сохранить провайдеров, удалить данные об использовании):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Экспорт отдельной таблицы

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Устранение неполадок

### «База данных заблокирована»

Другой процесс удерживает блокировку записи. Выполните одно из следующих действий:

- Дождитесь завершения другого процесса (проверьте с помощью `lsof | grep storage.sqlite`)
- Завершите другой процесс
- Если проблема сохраняется, перезапустите OmniRoute

### «Нарушено ограничение внешнего ключа»

Модуль домена нарушает ссылочную целостность. Проверьте:

- Потерянные строки в зависимых таблицах
- Каскадные удаления, которые не были распространены
- Недавнюю миграцию, изменившую внешний ключ

Выполните `PRAGMA foreign_key_check;`, чтобы найти нарушения.

### «Недостаточно памяти»

Ввод-вывод SQLite с отображением в память превышает ограничение ОС. Уменьшите объём с помощью директивы pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128 МБ вместо 256 МБ
```

Или отключите его:

```sql
PRAGMA mmap_size = 0;
```

### «Сбой миграции в процессе выполнения»

Миграция выполнялась в транзакции, поэтому изменения должны были откатиться. Если этого не произошло:

1. **Остановите OmniRoute** (чтобы предотвратить дальнейшие попытки)
2. **Проверьте состояние БД** с помощью `sqlite3`
3. **Исправьте вручную** частично выполненную миграцию
4. **Снова запустите** OmniRoute (будет выполнена повторная попытка миграции)

Чтобы предотвратить такую ситуацию, всегда сначала тестируйте миграции на копии.

---

## См. также

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — таблицы использования
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — мониторинг состояния
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — процесс выпуска
- Исходный код: `src/lib/db/` (более 80 файлов, около 25 тыс. строк кода)
