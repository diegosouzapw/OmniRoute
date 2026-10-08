# Database Schema & Operations Guide (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Укратко**: OmniRoute користи **SQLite са WAL журналисањем** као примарно складиште, уз **AES-256-GCM** шифровање осетљивих поља у мировању. Овај водич обухвата шему, миграције, прављење резервних копија/опоравак и оперативна упутства.

**Извори:**

- `src/lib/db/core.ts` — синглтон + SCHEMA_SQL (17 основних табела)
- `src/lib/db/migrationRunner.ts` — верзионисане миграције
- `src/lib/db/migrations/` — 167 верзионисаних SQL датотека
- `src/lib/db/encryption.ts` — помоћне функције за шифровање
- `src/lib/db/backup.ts` — извоз/увоз резервних копија
- `src/lib/db/healthCheck.ts` — дијагностика исправности

---

## Зашто SQLite?

OmniRoute је изабрао SQLite уместо PostgreSQL/MySQL из неколико разлога:

| Фактор              | SQLite                                 | PostgreSQL                              |
| ------------------- | -------------------------------------- | --------------------------------------- |
| **Примена**         | Уграђен — није потребан засебан сервер | Захтева подешавање сервера              |
| **Шифровање**       | На нивоу апликације (AES-256-GCM)      | Уграђени TDE                            |
| **Перформансе**     | Бржи за мала/средња радна оптерећења   | Бољи за огроман број истовремених уписа |
| **Конкурентност**   | WAL режим омогућава истовремена читања | Потпуни MVCC                            |
| **Резервна копија** | Копирање једне датотеке                | `pg_dump` или снимак система датотека   |
| **Случај употребе** | Инсталација по кориснику, уграђено     | Вишекориснички SaaS                     |

За примене са **једним корисником и једном инстанцом** (примарни случај употребе за OmniRoute), SQLite је једноставнији и бржи.

### WAL журналисање

`core.ts` отвара базу података у **WAL (Write-Ahead Logging) режиму**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL омогућава **истовремена читања** током уписа — што је важно за контролну таблу, која извршава упите док се захтеви бележе.

Подразумевана величина кеша је **65.536 KiB (64 MiB)**. SQLite тумачи негативну вредност
`cache_size` као приближну горњу границу у KiB и додељује странице по потреби.
**Подешавања > Систем и складиште > Величина кеша** прихвата целобројне вредности од **1 до
1.000.000 KiB**; чување подешавања примењује га на активну везу са базом података,
а OmniRoute враћа сачувану вредност при покретању.

---

## Локација базе података

SQLite датотека се чува на следећој локацији:

| ОС      | Путања                                                 |
| ------- | ------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                          |
| macOS   | `~/.omniroute/storage.sqlite`                          |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`              |
| Docker  | `/app/data/storage.sqlite` (подесиво преко `DATA_DIR`) |

Пратеће датотеке:

- `storage.sqlite-wal` — дневник писања унапред
- `storage.sqlite-shm` — датотека дељене меморије
- `call_logs/` — артефакти садржаја захтева (ако је омогућено)

**Промена локације:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Архитектура доменских модула

OmniRoute база података има **110 TypeScript модула највишег нивоа** у `src/lib/db/`. Сваки доменски модул:

- Управља једном или више одређених табела
- Извози типизиране CRUD функције
- Никада не приступа табелама другог модула
- Користи `getDbInstance()` из `core.ts` за приступ бази података

### 110 модула базе података највишег нивоа

OmniRoute има **110 TypeScript датотека највишег нивоа** у `src/lib/db/`. Испод је приказан избор основних модула; комплетну листу потражите у садржају директоријума:

| Модул                   | Табеле                                                         | Одговорност                                                                              |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Регистрација добављача путем OAuth/API кључа и акредитиви                                |
| `models.ts`             | `key_value` (подаци о моделу)                                  | Дефиниције модела, могућности, цене                                                      |
| `combos.ts`             | `combos`                                                       | Конфигурације и редослед комбинованог усмеравања                                         |
| `apiKeys.ts`            | `api_keys`                                                     | Животни циклус API кључева, опсези и праћење квота                                       |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Конфигурација система и дељено KV складиште                                              |
| `backup.ts`             | —                                                              | Операције извоза/увоза резервних копија                                                  |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Конфигурације проксија и правила усмеравања                                              |
| `prompts.ts`            | `prompt_templates`                                             | Шаблони упита за поновну употребу и управљање верзијама                                  |
| `webhooks.ts`           | `webhooks`                                                     | Претплате на webhook догађаје и евиденције                                               |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Ревизионо евидентирање за сваки захтев (опционо, велики обим)                            |
| `domainState.ts`        | `domain_*` (5 табела)                                          | Доменски буџети, заштитни прекидачи, блокаде, ланци резервних опција и историја трошкова |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API кључеви са листе дозвољених за MCP/A2A                                               |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Историјска употреба квота                                                                |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Мапирање модела на подразумеване комбинације                                             |
| `cliToolState.ts`       | `cli_tool_state`                                               | Трајно стање специфично за CLI                                                           |
| `encryption.ts`         | —                                                              | Помоћне функције за шифровање/дешифровање поља                                           |
| `readCache.ts`          | —                                                              | Кеш у меморији за операције са великим бројем читања                                     |
| `secrets.ts`            | `key_value` (шифровани уноси)                                  | Складиштење шифрованих тајни                                                             |
| `stateReset.ts`         | —                                                              | Брисање/ресетовање стања базе података ради тестирања                                    |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Контекст сесије за примопредају агента                                                   |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Праћење употребе                                                                         |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Конфигурација компресије                                                                 |

### Границе модула

Основно архитектонско правило: **модули не приступају директно табелама других модула**. Да бисте радили са подацима другог модула, увезите функцију из тог модула.

```ts
// ❌ ПОГРЕШНО: директан SQL из другог модула
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ИСПРАВНО: користите функцију модула providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ово правило се спроводи прегледом кода — не постоји статичка провера, али се кршења означавају.

---

## Основна шема (17 табела)

`core.ts` дефинише 17 основних табела у `SCHEMA_SQL`. Оне се креирају миграцијом `001_initial_schema.sql` и чине језгро шеме.

### Основне табеле (креиране у почетној миграцији)

| Табела                     | Намена                                      | Кључне колоне                                                           |
| -------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Акредитиви добављача (шифровани)            | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Информације о рутирању чворова добављача    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Опште KV складиште                          | `namespace`, `key`, `value`                                             |
| `combos`                   | Дефиниције комбинација за рутирање          | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API кључеви за мрежни пролаз                | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Метаподаци базе података                    | `key`, `value`                                                          |
| `usage_history`            | Записи о коришћењу захтева                  | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Садржаји захтева и одговори                 | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Евиденције прокси захтева                   | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Ланци од модела до добављача                | `model`, `chain`                                                        |
| `domain_budgets`           | Буџети потрошње по домену                   | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Историја ресетовања буџета                  | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Праћење трошкова по домену                  | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Стање ограничења учесталости захтева домена | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Стање прекидача кола по домену              | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Кеш LLM одговора                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Историјски снимци квота                     | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Додатне табеле (додате каснијим миграцијама)

Накнадне миграције додају табеле као што су:

- `cli_tool_state` (миграција 011) — стање CLI алата
- `mcp_*` табеле — ревизија MCP сервера
- `a2a_*` табеле — стање A2A задатака
- `usage_*` табеле — праћење коришћења
- `plugin_*` табеле — систем додатака
- `skill_executions` — историја извршавања вештина
- `memory_*` табеле — меморијски систем
- `compression_*` табеле — систем компресије
- `webhook_*` табеле — евиденција испоруке webhook позива
- `acp_*` табеле — протокол клијента агента
- `oneproxy_*` табеле — 1proxy тржиште
- `proxy_assignments` — повезивања опсега проксија
- `detailed_call_artifacts` — метаподаци артефаката евиденције позива
- `quota_alert_history` — ревизија упозорења о квотама
- `command_code_auth_sessions` — Command Code OAuth сесије

Комплетна листа од око 30+ табела налази се у `src/lib/db/migrations/`.

---

## Миграције

OmniRoute користи **верзионисане, идемпотентне миграције** у директоријуму `src/lib/db/migrations/`. Свака миграција је једна SQL датотека названа `NNN_description.sql`.

### Именовање миграција

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Како се миграције извршавају

При покретању, `migrationRunner.ts`:

1. Креира табелу `_omniroute_migrations` ако не постоји
2. Проверава које су миграције већ примењене
3. Редом примењује све нове миграције, сваку у засебној трансакцији
4. Бележи сваку примењену миграцију са временском ознаком

```ts
// src/lib/db/migrationRunner.ts (поједностављено)
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

Миграције морају бити **идемпотентне** — њихово двоструко покретање не би требало да произведе никакав додатни ефекат:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Слободно користите клаузуле `IF NOT EXISTS`, `IF EXISTS` и `OR IGNORE` / `OR REPLACE`.

### Додавање нове миграције

1. **Утврдите следећи број**: `ls src/lib/db/migrations/ | tail -1`
2. **Креирајте датотеку**: `NNN_my_change.sql`
3. **Користите безбедан DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Пажљиво допуните постојеће податке**: користите `UPDATE ... WHERE ...` за обраду постојећих редова
5. **Тестирајте на копији**: никада не покрећите нетестиране миграције у продукцији

Пример:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Промене које нису уназад компатибилне** (нпр. уклањање колона) могу бити проблематичне. OmniRoute НЕ подржава враћање на претходну верзију — када се миграција примени, промена шеме је трајна. Планирајте у складу с тим.

---

## Шифровање података у мировању

Осетљива поља (API кључеви, OAuth токени, ниске за повезивање) шифрују се у мировању помоћу алгоритма **AES-256-GCM**.

### Како функционише

```ts
// src/lib/db/encryption.ts (поједностављено)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Где се користи

- `provider_connections.api_key` — шифрује се на нивоу апликације
- `provider_connections.access_token`, `refresh_token`, `id_token` — шифрују се на нивоу апликације
- Уноси `key_value` са `namespace = "secrets"` — шифрују се на нивоу апликације
- `proxy_registry.auth` — шифрује се на нивоу апликације (ако постоји)

### Кључ за шифровање

Кључ за шифровање изводи се из **приступне фразе** (постављене путем променљиве окружења `STORAGE_ENCRYPTION_KEY`) и **соли** (која се чува у бази података). Оба су неопходна за дешифровање података.

```bash
# Генеришите безбедну приступну фразу
openssl rand -hex 32

# Поставите је у .env
STORAGE_ENCRYPTION_KEY=<ваш-кључ>
```

> **Критично**: Губитак кључа за шифровање значи губитак приступа свим шифрованим подацима. **Направите резервну копију кључа одвојено од базе података**.

### Шта НИЈЕ шифровано

Ради бољих перформанси, следећи подаци чувају се као отворени текст:

- Приказни називи добављача
- Дефиниције модела (већ су јавне)
- Правила усмеравања
- Записи о коришћењу (без података који омогућавају идентификацију личности)

---

## Напомене о шифровању (v3.8.16+)

OmniRoute користи **`migrateLegacyEncryptedString()`** за транспарентно руковање двема шемама шифровања:

- **Застарела** (пре v3.5.0): „шифровање“ засновано на XOR-у (није права криптографија)
- **Тренутна**: AES-256-GCM са исправним IV-ом и ознаком за аутентификацију

Помоћна функција за миграцију открива застарели формат и поново шифрује податке новом шемом при првом читању. То значи да можете надоградити стару базу података без губитка акредитива.

---

## Кеш за читање

За податке који се често читају (модели, добављачи, подешавања), `readCache.ts` обезбеђује **кеш у меморији**:

```ts
// Кеширано при покретању, поништава се при упису
const providers = await getCachedProviders(); // Брзо, у меморији
const fresh = await listProviders(); // Споро, приступа бази података
```

| Кеширани ентитет       | Кључ кеша      | TTL      |
| ---------------------- | -------------- | -------- |
| `models`               | `models:v1`    | До уписа |
| `provider_connections` | `providers:v1` | До уписа |
| `settings`             | `settings:v1`  | До уписа |
| `combos`               | `combos:v1`    | До уписа |

Кеш се поништава при сваком упису у одговарајућу табелу.

---

## Прављење и враћање резервних копија

### Ручно прављење резервне копије

```bash
# Користите CLI да бисте направили локалну резервну копију
omniroute backup create --name pre-migration

# Или путем API-ја
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Датотека резервне копије садржи:

- Све табеле базе података (серијализоване у JSON)
- Артефакте евиденције позива (кодиране у base64, опционално)
- Подешавања + тајне (шифроване)
- Конфигурацију додатака

### Враћање

```bash
# Путем CLI-ја
omniroute restore pre-migration

# Путем API-ја
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Упозорење**: Враћање преписује целу базу података. Прво зауставите све клијенте.

### Аутоматизоване резервне копије

```bash
# Омогућите аутоматизоване дневне резервне копије путем CLI-ја
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Распоред се извршава на страни сервера путем позадинског задатка који се активира сваких 30 секунди
(подразумевано) и проверава cron израз у односу на локално време сервера.

| Променљива                                  | Подразумевано | Опис                                                                                                           |
| ------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`       | Интервал активирања у ms (мин. `5000`). Мора бити краћи од 60 s да би поуздано упао у одговарајући cron минут. |

### SQLite резервна копија активне базе

За прављење резервне копије активне базе података без прекида рада:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ово користи SQLite API за прављење резервних копија на мрежи — безбедно је за покретање док OmniRoute ради.

---

## Подешавање перформанси

### WAL режим

WAL је подразумевано омогућен. За радна оптерећења са великим бројем уписа, размотрите:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Контролна тачка на сваких 1000 страница
PRAGMA journal_size_limit = 67108864;  -- Ограничење WAL-а на 64MB
```

### Индекси

Кључни индекси за перформансе (аутоматски их креирају миграције):

- `idx_models_provider` — претрага модела према добављачу
- `idx_combo_targets_combo_id` — проширивање комбинованих циљева
- `idx_usage_history_api_key_timestamp` — аналитика коришћења
- `idx_quota_snapshots_api_key_window` — праћење квота
- `idx_call_logs_timestamp` — упити над евиденцијом позива

Да бисте додали нови индекс, направите миграцију:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Меморијски мапиран улаз/излаз

За веома велике базе података (>10GB), меморијско мапирање може да се подеси путем SQLite прагме:

```sql
-- Подесите путем SQLite прагме (прилагодите у core.ts или током извршавања)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Компактирање

OmniRoute инстанце које дуго раде имају користи од повременог извршавања наредбе `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Покрећите је једном месечно у периодима малог саобраћаја. (WAL режим смањује потребу за тим, али је не уклања.)

---

## Провера исправности

`src/lib/db/healthCheck.ts` пружа **дијагностику исправности на нивоу базе података**:

Оба глагола захтевају аутентификацију (у супротном се враћа `401`). `GET` служи само за дијагностику; `POST` покреће
исту проверу са омогућеним `autoRepair`.

```bash
GET  /api/db/health   # дијагностика
POST /api/db/health   # дијагностика + поправка
```

Одговор је `DbHealthCheckResult` који производи `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Буџети домена упућивали су на API кључеве који више не постоје.",
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

| Поље              | Значење                                                                                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Има вредност `true` када је `issues` празан. `driver` никада не утиче на њега.                                                                                              |
| `issues[].type`   | Једна од вредности `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                         |
| `repairedCount`   | Редови поправљени током овог покретања; увек је `0` када `autoRepair` има вредност false.                                                                                   |
| `backupCreated`   | Да ли је резервна копија направљена пре поправке.                                                                                                                           |
| `checkedAt`       | ISO временска ознака коју деле покретање и свака белешка о поправци коју оно упише.                                                                                         |
| `driver.name`     | SQLite управљачки програм који опслужује проверену базу података.                                                                                                           |
| `driver.degraded` | Има вредност `true` када уписи нису трајно сачувани у датотеци базе података — резервна `sql.js` WASM варијанта (трајно чување целе датотеке) или база података у меморији. |

Исти садржај враћа MCP алатка `omniroute_db_health_check`.

Покрените `PRAGMA integrity_check` да бисте открили оштећење:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Требало би да испише: ok
```

Ако врати било шта осим `ok`, **одмах престаните да користите базу података** и вратите је из резервне копије.

---

## Опоравак од катастрофе

### Сценарио 1: WAL датотека је изгубљена

Датотека `-wal` недостаје, али су `-shm` и главна база података нетакнуте:

```bash
# Аутоматски се опоравља при следећем отварању
omniroute
```

Ако SQLite не може аутоматски да изврши опоравак:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Сценарио 2: Главна датотека базе података је оштећена

Вратите је из резервне копије:

```bash
omniroute sync pull --merge   # или: omniroute backup restore <backup-id>
```

### Сценарио 3: Кључ за шифровање је изгубљен

**Опоравак није могућ** без кључа. Шифрована поља су нечитљива. Поново ручно додајте све добављаче са новим акредитивима.

> **Ублажавање ризика**: Увек засебно правите резервну копију кључа за шифровање, по могућству у менаџеру лозинки или KMS-у.

### Сценарио 4: Диск је пун

SQLite ће вратити грешке `SQLITE_FULL`. Ослободите простор на диску, а затим:

```bash
# Направите контролну тачку WAL-а да бисте ослободили простор
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Уобичајене операције

### Преглед табеле

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Бројање редова у свим табелама

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Ресетовање (брисање) свих података

```bash
# Прво зауставите OmniRoute
omniroute stop

# Избришите датотеку базе података
rm ~/.omniroute/storage.sqlite*

# Поново покрените (празна база података биће поново направљена)
omniroute
```

За **селективно** ресетовање (задржавање добављача, брисање података о коришћењу):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Извоз једне табеле

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Решавање проблема

### „База података је закључана“

Други процес држи закључавање за упис. Можете:

- Сачекати да се други процес заврши (проверите помоћу `lsof | grep storage.sqlite`)
- Прекинути други процес
- Ако се проблем настави, поново покренути OmniRoute

### „Ограничење страног кључа није испуњено“

Модул домена нарушава референцијални интегритет. Проверите:

- Редове без одговарајућих родитељских записа у зависним табелама
- Каскадна брисања која се нису пренела
- Недавну миграцију која је променила страни кључ

Покрените `PRAGMA foreign_key_check;` да бисте пронашли нарушавања.

### „Нема довољно меморије“

SQLite-ов меморијски мапирани У/И премашује ограничење оперативног система. Смањите га помоћу SQLite прагме:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB уместо 256MB
```

Или га онемогућите:

```sql
PRAGMA mmap_size = 0;
```

### „Миграција није успела на пола процеса“

Миграција је извршавана у трансакцији, па је требало да буде поништена. Ако није:

1. **Зауставите OmniRoute** (спречите даље покушаје)
2. **Проверите стање базе података** помоћу `sqlite3`
3. **Ручно исправите** делимичну миграцију
4. **Поново покрените** OmniRoute (миграција ће бити поново покушана)

Да бисте ово спречили, увек прво тестирајте миграције на копији.

---

## Погледајте и

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — табеле коришћења
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — надгледање стања
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — ток објављивања
- Извор: `src/lib/db/` (80+ датотека, ~25K линија кода)
