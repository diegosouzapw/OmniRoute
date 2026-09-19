# Reasoning Replay Cache (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Джерело істини:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute перехоплює `reasoning_content` асистента, створений моделями в режимі міркування, і прозоро відтворює його в багатораундових запитах, коли цього вимагає висхідний провайдер. Це усуває помилки HTTP 400, які повертають суворі провайдери, якщо в історії розмови клієнта відсутнє міркування з попереднього раунду.

## Навіщо це потрібно

Кілька провайдерів із режимом міркування відхиляють наступний раунд, якщо **попереднє повідомлення асистента не містить оригінального `reasoning_content`**. Висхідний сервіс повертає помилку 400 із такими повідомленнями:

```
Некоректний параметр: reasoning_content у режимі міркування має бути передано назад до API.
```

Але типові клієнти (Cursor, Cline, Roo Code, OpenAI SDK) видаляють `reasoning_content` з історії, яку вони відтворюють. OmniRoute відновлює його із серверного кешу, щоб запит, який отримує висхідний сервіс, був узгодженим. У задачі #1628 було впроваджено гібридне зберігання в пам’яті/SQLite, завдяки чому кеш зберігається після перезапусків процесу.

## Архітектура

```
Раунд N (асистент генерує):
  → відповідь містить reasoning_content + tool_calls
  → якщо requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      записує (у пам’ять + БД), із ключем за кожним tool_call.id
  → пересилає відповідь клієнту (який може зберігати або не зберігати міркування)

Раунд N+1 (клієнт надсилає наступний запит):
  → транслятор виявляє: requiresReasoningReplay(provider, model) === true
  → для кожного повідомлення асистента з tool_calls і без reasoning_content:
      lookupReasoning(toolCalls[0].id) → пам’ять → БД
      збіг    → msg.reasoning_content = cached; recordReplay()
      промах  → msg.reasoning_content = "" (застарілий резервний варіант для старіших версій DeepSeek)
  → висхідний сервіс отримує узгоджену історію → помилки 400 немає
```

Перехоплення відбувається в `open-sse/handlers/chatCore.ts` (у двох місцях виклику `cacheReasoningFromAssistantMessage`). Відтворення відбувається в `open-sse/translator/index.ts` після приведення до схеми, але до відправлення.

## Сховище — гібрид пам’яті та SQLite

Гарячий шлях використовує внутрішньопам’яттєвий `Map` (LRU за часом створення), підкріплений таблицею SQLite для відновлення після збоїв і забезпечення видимості на панелі моніторингу.

| Рівень  | Реалізація                                    | Призначення                                          |
| ------- | --------------------------------------------- | ---------------------------------------------------- |
| Пам’ять | `Map` у `open-sse/services/reasoningCache.ts` | Швидкий пошук, витіснення найстаріших після 200      |
| БД      | Таблиця `reasoning_cache` (`src/lib/db/`)     | Зберігання після перезапусків, формування статистики |

Записи надходять до обох рівнів. Під час читання спочатку перевіряється пам’ять, а потім виконується резервний пошук у БД (знайдені в БД записи знову завантажуються в пам’ять). Збої БД не є критичними — внутрішньопам’яттєвий кеш продовжує обслуговувати гарячий шлях.

**Значення за замовчуванням:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Максимальна кількість записів у пам’яті: `200` (`MAX_MEMORY_ENTRIES`)
- Витіснення: спочатку найстаріший `createdAt`

## Схема бази даних

Міграція: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Індекси: `expires_at`, `provider`, `model`, `created_at`. Значення `expires_at` зберігається як кількість секунд епохи Unix; рівень SELECT нормалізує застарілі текстові значення за допомогою `EXPIRES_AT_EPOCH_SQL`.

## Виявлення провайдера / моделі

Повторне відтворення вмикається, коли `requiresReasoningReplay(provider, model)` повертає `true`. Функція перевіряє два списки у `open-sse/services/reasoningCache.ts`.

**Ідентифікатори провайдерів (точний збіг без урахування регістру):**

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

**Регулярні вирази моделей (без урахування регістру):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` і `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, необов’язковий суфікс `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Щоб додати нового провайдера/модель із суворими вимогами, потрібно доповнити один із цих списків і написати модульний тест, який перевіряє ін’єкцію повторного відтворення. В описі PR слід навести точний рядок помилки 400 від вищестоящого сервісу, який став підставою для зміни.

## REST API

Кеш надає дві кінцеві точки в `src/app/api/cache/reasoning/route.ts`. Обидві вимагають автентифікації керування (`isAuthenticated` з `@/shared/utils/apiAuth`).

| Метод  | Кінцева точка                                             | Опис                                                               |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | Статистика + записи з пагінацією                                   |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Відфільтрований список (`limit` обмежується діапазоном `[1, 200]`) |
| DELETE | `/api/cache/reasoning`                                    | Очистити все (пам’ять + БД) і скинути лічильники влучень/промахів  |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Очистити лише записи одного провайдера                             |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Видалити один запис                                                |

**Структура відповіді GET:**

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

## Примітки щодо експлуатації

- **Очищення:** `cleanupReasoningCache()` видаляє прострочені записи з пам’яті та виконує `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Воркери перевірки працездатності періодично викликають цю функцію.
- **Відновлення після збою:** після перезапуску пам’ять порожня, але БД усе ще містить непрострочені записи. Перший пошук за певним `tool_call_id` є влученням у БД; наступні пошуки є влученнями в пам’яті.
- **Немає міркувань — немає кешування:** `cacheReasoningFromAssistantMessage` повертає `0`, коли повідомлення асистента не має поля `reasoning_content` / `reasoning`, тому відповіді без міркувань не створюють жодних витрат.
- **Запис також обмежено умовою:** обидва місця виклику в `chatCore.ts` (для потокового та непотокового режимів) викликають `cacheReasoningFromAssistantMessage()` лише тоді, коли `requiresReasoningReplay(provider, model)` повертає `true` — це той самий предикат, який перевіряє сторона читання. Інсталяції, що ніколи не використовують провайдера з повторним відтворенням, більше не несуть витрат на запис, оновлення індексу та try/catch для кожної відповіді, що містить міркування.
- **Провайдери без суворих вимог:** коли `requiresReasoningReplay` повертає `false`, а цільовим форматом є OpenAI, транслятор **видаляє** будь-яке поле `reasoning_content` з вихідних повідомлень — OpenAI Chat Completions його не приймає.

## Див. також

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — запобіжники, періоди очікування, блокування моделей
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — діагностика помилок 400 від висхідних сервісів
- Вихідний код: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Міграція: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Маршрут API: `src/app/api/cache/reasoning/route.ts`
- Початкова проблема: #1628
