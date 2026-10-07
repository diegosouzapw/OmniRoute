# Compliance & Audit (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Источник истины:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Последнее обновление:** 2026-06-28 — v3.8.40

OmniRoute записывает административные действия, события аутентификации, изменения жизненного цикла учетных данных провайдеров и вызовы инструментов MCP в таблицы аудита на базе SQLite. На этой странице описано, что регистрируется, где хранятся данные, как долго они сохраняются, как отключить журналирование для API-ключей и как выполнять запросы к данным.

Реализация находится в `src/lib/compliance/index.ts` (T-43 — «Средства контроля соответствия») и `src/lib/compliance/providerAudit.ts`. Операции записи аудита никогда не выбрасывают исключения: при любом сбое ошибка незаметно подавляется, чтобы журналирование аудита не могло нарушить основной поток обработки запроса.

## Что регистрируется

### События административного аудита (`audit_log`)

Каждый вызов `logAuditEvent({ action, actor, target, details, ... })` создает одну строку. Строки действий соответствуют шаблону `domain.verb` (или `domain.verb.outcome`). Подтвержденные типы действий в дереве исходного кода включают:

| Действие                             | Источник                                |
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

Каждая запись содержит `action`, `actor` (по умолчанию — `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` и `timestamp`. Конфиденциальные ключи (`apiKey`, `accessToken`, `refreshToken`, `password`, любые ключи, соответствующие шаблонам `*token`/`*secret`/`*apikey`, и т. д.) перед записью строки рекурсивно заменяются на `"[redacted]"`.

### Вызовы инструментов MCP (`mcp_tool_audit`)

Каждый вызов инструмента MCP записывает строку через `open-sse/mcp-server/audit.ts`. Схема (из `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Столбец          | Примечания                                            |
| ---------------- | ----------------------------------------------------- |
| `id`             | автоинкремент                                         |
| `tool_name`      | идентификатор инструмента MCP                         |
| `input_hash`     | sha256 входных данных (полезная нагрузка не хранится) |
| `output_summary` | краткая усеченная сводка                              |
| `duration_ms`    | фактическое время выполнения                          |
| `api_key_id`     | вызывающая сторона (может быть `null`)                |
| `success`        | `1` / `0`                                             |
| `error_code`     | итоговый код ошибки при сбое                          |
| `created_at`     | временная метка ISO                                   |

### Журналы запросов / использования

Это операционная телеметрия (не являющаяся в строгом смысле административным аудитом), но для нее используется тот же конвейер хранения:

- `usage_history` — агрегированные данные об использовании для каждого запроса
- `call_logs` — полный журнал каждого запроса (с ограничением числа строк, см. ниже)
- `proxy_logs` — журнал прокси-трафика (с ограничением числа строк)
- `request_detail_logs` — устаревший подробный журнал запросов (по-прежнему очищается при наличии)

## Схема хранилища

`audit_log` создаётся отложенно функцией `ensureAuditLogSchema()` при первом использовании:

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

Индексы создаются для `timestamp`, `action`, `actor`, `resource_type`,
`status` и `request_id`. Отсутствующие столбцы в устаревших БД добавляются
по мере необходимости с помощью `ALTER TABLE`.

## Хранение и очистка

Поддерживаются два отдельных периода хранения:

| Переменная окружения        | По умолчанию | Применяется к                                                     |
| --------------------------- | ------------ | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`          | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`          | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`     | Ограничение количества строк для `call_logs`                      |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`     | Ограничение количества строк для `proxy_logs`                     |

`cleanupExpiredLogs()` запускает процедуру очистки в соответствии с периодом хранения. Она вызывается при запуске сервера
из `src/instrumentation-node.ts`. При каждом запуске записывается событие аудита
`compliance.cleanup` с количеством удалённых строк для каждой таблицы. Сокращение журналов прокси и вызовов
выполняется пакетами (`BATCH_SIZE = 5000`), чтобы избежать длительных блокировок записи.

Ручная очистка истории запросов выполняется отдельно от очистки по сроку хранения. Страница журналов запросов
вызывает `POST /api/settings/purge-request-history`, который удаляет данные из `call_logs`,
устаревшей таблицы `request_detail_logs`, а также локальные артефакты запросов в
`${DATA_DIR}/call_logs/`.

Значения по умолчанию определены в `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Отказ от журналирования через `noLog` (для отдельных API-ключей)

API-ключи можно пометить таким образом, чтобы трафик их последующих вызовов не журналировался. Этот
флаг хранится в таблице `api_keys` (`no_log INTEGER DEFAULT 0`) и дублируется
во множестве в памяти для быстрого поиска на критическом пути.

```bash
# Создание ключа без журналирования (требуется авторизация для управления)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Вспомогательные функции (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — добавляет или удаляет запись в памяти
- `isNoLog(apiKeyId)` — проверяется на пути обработки запроса; если запись отсутствует, выполняется
  кэшированное на 30 с чтение из `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (переменная окружения, значения разделяются запятыми) — предварительно загружается во множество в памяти
  при запуске; полезно, если невозможно изменить столбец напрямую

События административного аудита (вход в систему, изменения провайдера, вызовы инструментов MCP и т. д.)
**не** зависят от `noLog` — отключается только журналирование трафика отдельных запросов.

## REST API

| Эндпоинт                    | Метод | Описание                                               | Авторизация |
| --------------------------- | ----- | ------------------------------------------------------ | ----------- |
| `/api/compliance/audit-log` | `GET` | Записи аудита администраторов с фильтрами и пагинацией | management  |
| `/api/mcp/audit`            | `GET` | Записи аудита инструментов MCP с пагинацией            | (open-sse)  |
| `/api/mcp/audit/stats`      | `GET` | Агрегированная статистика аудита MCP                   | (open-sse)  |

В настоящее время эндпоинт для экспорта CSV отсутствует — экспортируйте данные из панели управления или обращайтесь
непосредственно к базе данных SQLite.

### Запросы к `/api/compliance/audit-log`

Поддерживаемые параметры запроса (все необязательны; для всех текстовых
фильтров используется сопоставление `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (или `resource_type`),
  `status`, `requestId` (или `request_id`)
- `from` / `since`, `to` / `until` — временные метки ISO
- `limit` (по умолчанию `50`, минимум `1`, максимум `500`)
- `offset` (по умолчанию `0`, максимум `10_000`)

Ответ представляет собой массив JSON. Метаданные пагинации возвращаются в заголовках:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Панель управления

Данные аудита доступны в панели управления по адресу **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Страница содержит две вкладки:

- **Соответствие требованиям** (`ComplianceTab.tsx`) — события аудита администраторов из
  `/api/compliance/audit-log`. Фильтрация по типу события, уровню серьёзности (info / warning
  / critical, определяется на основе действия и статуса) и диапазону дат. Уровень серьёзности
  вычисляется на стороне клиента на основе строк действия и статуса.
- **MCP** (`McpAuditTab.tsx`) — аудит инструментов MCP из `/api/mcp/audit` с
  фильтрами по имени инструмента и успешному/неуспешному выполнению.

На обеих вкладках используется пагинация с размером страницы `50` (соответствие требованиям) и `25` (MCP).

## Вспомогательные функции для учётных данных провайдеров

`src/lib/compliance/providerAudit.ts` предоставляет вспомогательные функции формирования данных, используемые
маршрутами управления провайдерами при создании событий, связанных с учётными данными:

- `summarizeProviderConnectionForAudit(connection)` — удаляет `apiKey`,
  `accessToken`, `refreshToken`, `idToken` и
  `providerSpecificData.consoleApiKey` перед записью снимка подключения в
  `details`.
- `getProviderAuditTarget(connection)` — формирует стабильную строку
  `"<provider>:<name|id>"` для поля `target`.
- `extractProviderWarnings(...payloads)` — сканирует ответы провайдеров на наличие
  предупреждений о политиках/безопасности (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) и
  возвращает до 5 совпадений, каждое из которых сокращается до 400 символов.

## Рекомендации

- Помечайте API-ключи, используемые для обработки персональных данных (юридических, медицинских и т. д.), с помощью `noLog: true`.
- Настройте `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` в соответствии с вашей
  политикой хранения данных. Значения по умолчанию в 7 дней являются консервативными.
- Экспортируйте таблицу аудита за пределы платформы (`sqlite3 dump`) с периодичностью,
  требуемой вашей программой соответствия требованиям, — встроенная архивация отсутствует.
- Отслеживайте количество событий `auth.login.failed` и `auth.login.locked` для обнаружения
  атак методом перебора.
- При добавлении новых административных эндпоинтов вызывайте `logAuditEvent({ ... })`, используя стабильную
  строку действия `domain.verb.outcome`, и передавайте контекст запроса через
  `getAuditRequestContext(request)`, чтобы IP-адрес и `requestId` фиксировались
  автоматически.

## См. также

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — маскирование PII, инъекции промптов
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — каталог инструментов MCP и области доступа
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — полный справочник переменных окружения
- Исходный код: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
