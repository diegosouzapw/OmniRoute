# Reasoning Replay Cache (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Источник истины:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Последнее обновление:** 2026-06-28 — v3.8.40

OmniRoute перехватывает `reasoning_content`, созданный моделями в режиме рассуждений, и прозрачно воспроизводит его в многоходовых запросах, когда этого требует вышестоящий провайдер. Это устраняет ошибки HTTP 400, которые строгие провайдеры возвращают, если в истории диалога клиента отсутствуют рассуждения из предыдущего хода.

## Зачем это нужно

Некоторые провайдеры моделей в режиме рассуждений отклоняют следующий ход, если **предыдущее сообщение ассистента не содержит исходный `reasoning_content`**. Вышестоящий сервис возвращает ошибку 400 с сообщениями наподобие:

```
Некорректный параметр: в режиме рассуждений reasoning_content должен быть передан обратно в API.
```

Однако типичные клиенты (Cursor, Cline, Roo Code, OpenAI SDK) удаляют `reasoning_content` из повторно отправляемой истории. OmniRoute восстанавливает его из серверного кеша, чтобы запрос, получаемый вышестоящим сервисом, оставался согласованным. В задаче #1628 было реализовано гибридное хранение в памяти и SQLite, благодаря чему кеш сохраняется после перезапусков процесса.

## Архитектура

```
Ход N (ассистент генерирует ответ):
  → ответ содержит reasoning_content + tool_calls
  → если requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      записывает (в память + БД), с ключом для каждого tool_call.id
  → передать ответ клиенту (который может сохранить или не сохранить рассуждения)

Ход N+1 (клиент отправляет последующий запрос):
  → транслятор определяет: requiresReasoningReplay(provider, model) === true
  → для каждого сообщения ассистента с tool_calls и без reasoning_content:
      lookupReasoning(toolCalls[0].id) → память → БД
      найдено     → msg.reasoning_content = cached; recordReplay()
      не найдено → msg.reasoning_content = "" (устаревший запасной вариант для старых версий DeepSeek)
  → вышестоящий сервис получает согласованную историю → ошибки 400 нет
```

Захват выполняется в `open-sse/handlers/chatCore.ts` (в двух местах — там, где вызывается `cacheReasoningFromAssistantMessage`). Воспроизведение выполняется в `open-sse/translator/index.ts` после приведения к схеме, но до отправки.

Обычные ответы ассистента (без вызовов инструментов) индексируются иначе: `buildAssistantMessageCacheKey()` вычисляет хеш области сеанса вместе с нормализованной историей диалога в формате OpenAI до соответствующего хода, поскольку при наличии `tools` DeepSeek требует рассуждения для _каждого_ предыдущего хода. Для целевых сервисов Responses API (например, `opencode-go/deepseek-v4-flash`, направляемого в `/responses`) тело вышестоящего запроса содержит `input`, а не `messages`, поэтому `translateRequest()` (`open-sse/translator/index.ts`) через параметр обратного вызова сообщает промежуточную историю диалога, для которой был вычислен хеш, а места захвата вычисляют хеш той же истории. Проход воспроизведения Responses выполняется на промежуточном представлении OpenAI для любого исходного формата, поэтому воспроизведение также выполняется для клиентов Anthropic Messages (Claude → OpenAI → Responses).

## Хранилище — гибрид памяти и SQLite

Для часто используемых данных применяется находящийся в памяти `Map` (LRU по времени создания), поддерживаемый таблицей SQLite для восстановления после сбоев и отображения данных на панели мониторинга.

| Уровень | Реализация                                    | Назначение                                        |
| ------- | --------------------------------------------- | ------------------------------------------------- |
| Память  | `Map` в `open-sse/services/reasoningCache.ts` | Быстрый поиск, удаление старейших записей при 200 |
| БД      | Таблица `reasoning_cache` (`src/lib/db/`)     | Сохранение между перезапусками и сбор статистики  |

Запись выполняется в оба хранилища. При чтении сначала проверяется память, а затем БД (найденные в БД записи возвращаются в память). Сбои БД не являются критическими — кеш в памяти продолжает обслуживать часто используемые данные.

**Значения по умолчанию:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Максимальное количество записей в памяти: `200` (`MAX_MEMORY_ENTRIES`)
- Удаление: сначала записи с наиболее ранним `createdAt`

## Схема базы данных

Миграция: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Индексы: `expires_at`, `provider`, `model`, `created_at`. Значение `expires_at` хранится в виде количества секунд с начала эпохи Unix; слой SELECT нормализует устаревшие текстовые значения с помощью `EXPIRES_AT_EPOCH_SQL`.

## Определение провайдера / модели

Повтор включается, когда `requiresReasoningReplay(provider, model)` возвращает `true`. Функция проверяет два списка в `open-sse/services/reasoningCache.ts`.

**Идентификаторы провайдеров (точное совпадение без учёта регистра):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Регулярные выражения для моделей (без учёта регистра):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` и `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, необязательный суффикс `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Чтобы добавить нового строгого провайдера или новую модель, необходимо дополнить один из этих списков и написать модульный тест, проверяющий внедрение повтора. В описании PR следует привести точную строку ошибки 400 от вышестоящего сервиса, послужившую причиной изменения.

## REST API

Кэш предоставляет две конечные точки в `src/app/api/cache/reasoning/route.ts`. Обе требуют аутентификации управления (`isAuthenticated` из `@/shared/utils/apiAuth`).

| Метод  | Конечная точка                                            | Описание                                                          |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Статистика и записи с пагинацией                                  |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Отфильтрованный список (`limit` ограничен диапазоном `[1, 200]`)  |
| DELETE | `/api/cache/reasoning`                                    | Очистить всё (память + БД) и сбросить счётчики попаданий/промахов |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Очистить только записи одного провайдера                          |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Удалить одну запись                                               |

**Структура ответа GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Примечания по эксплуатации

- **Очистка:** `cleanupReasoningCache()` удаляет из памяти записи с истёкшим сроком действия и выполняет `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Воркеры проверки работоспособности периодически вызывают эту функцию.
- **Восстановление после сбоя:** после перезапуска память пуста, но в БД сохраняются записи с неистёкшим сроком действия. Первый поиск по заданному `tool_call_id` приводит к попаданию в БД; последующие поиски — к попаданиям в память.
- **Нет рассуждений — нет кэша:** `cacheReasoningFromAssistantMessage` возвращает `0`, если сообщение ассистента не содержит поля `reasoning_content` / `reasoning`, поэтому ответы без рассуждений ничего не стоят.
- **Запись также выполняется по условию:** оба места вызова в `chatCore.ts` (для потокового и непотокового режимов) вызывают `cacheReasoningFromAssistantMessage()` только тогда, когда `requiresReasoningReplay(provider, model)` возвращает `true`, — по тому же предикату, который проверяет сторона чтения. Установки, которые никогда не обращаются к провайдерам с повтором, не несут затрат на запись, обновление индекса и try/catch для каждого ответа, содержащего рассуждения.
- **Нестрогие провайдеры:** когда `requiresReasoningReplay` возвращает `false`, а целевым форматом является OpenAI, транслятор **удаляет** поле `reasoning_content` из исходящих сообщений — OpenAI Chat Completions его не принимает.

## См. также

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — автоматические выключатели, периоды восстановления, блокировки моделей
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — диагностика ошибок 400 от вышестоящих сервисов
- Исходный код: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Миграция: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Маршрут API: `src/app/api/cache/reasoning/route.ts`
- Исходная проблема: #1628
