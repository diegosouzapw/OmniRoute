# Reasoning Replay Cache (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Източник на истината:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute прихваща `reasoning_content`, генерирано от асистента чрез модели с режим на разсъждение, и го възпроизвежда прозрачно при заявки с множество ходове, когато доставчикът нагоре по веригата го изисква. Това елиминира HTTP грешките 400, които строгите доставчици връщат, когато в историята на разговора на клиента липсват разсъжденията от предишния ход.

## Защо съществува това

Няколко доставчика с режим на разсъждение отхвърлят последващ ход, освен ако **предишното съобщение на асистента не съдържа оригиналното `reasoning_content`**. Услугата нагоре по веригата връща 400 със съобщения като:

```
Невалиден параметър: reasoning_content в режим на разсъждение трябва да бъде подадено обратно към API.
```

Обичайните клиенти (Cursor, Cline, Roo Code, OpenAI SDK) обаче премахват `reasoning_content` от историята, която възпроизвеждат. OmniRoute го възстановява от кеш от страна на сървъра, така че заявката, която получава услугата нагоре по веригата, да бъде съгласувана. Issue #1628 въведе хибридното съхранение в паметта/SQLite, така че кешът да се запазва при рестартиране на процеса.

## Архитектура

```
Ход N (асистентът генерира):
  → отговорът съдържа reasoning_content + tool_calls
  → ако requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      записва (в паметта + БД), индексирано по всеки tool_call.id
  → препраща отговора към клиента (който може да запази или да не запази reasoning)

Ход N+1 (клиентът изпраща последваща заявка):
  → преобразувателят открива: requiresReasoningReplay(provider, model) === true
  → за всяко съобщение от асистента с tool_calls и без reasoning_content:
      lookupReasoning(toolCalls[0].id) → памет → БД
      намерено     → msg.reasoning_content = cached; recordReplay()
      не е намерено → msg.reasoning_content = "" (резервен вариант за съвместимост с по-стари версии на DeepSeek)
  → услугата нагоре по веригата получава съгласувана хронология → няма грешка 400
```

Прихващането се извършва в `open-sse/handlers/chatCore.ts` (на две места — при двете извиквания на `cacheReasoningFromAssistantMessage`). Повторното подаване се извършва в `open-sse/translator/index.ts` след привеждането към схемата, но преди изпращането.

Обикновените ходове на асистента (без извиквания на инструменти) се индексират по различен начин: `buildAssistantMessageCacheKey()` изчислява дайджест от обхвата на сесията и нормализирания препис във формат OpenAI до съответния ход включително, тъй като DeepSeek изисква разсъжденията от _всеки_ предходен ход, щом присъства `tools`. При цели на Responses API (например `opencode-go/deepseek-v4-flash`, маршрутизирани към `/responses`) тялото на заявката към услугата нагоре по веригата съдържа `input`, а не `messages`, затова `translateRequest()` (`open-sse/translator/index.ts`) подава чрез опция за обратно извикване основния препис, от който е изчислил дайджест, а местата за прихващане изчисляват дайджест от същия препис. Етапът за повторно подаване на Responses се изпълнява върху основното представяне на OpenAI за всеки формат на източника, така че повторно се подават и клиентите на Anthropic Messages (Claude → OpenAI → Responses).

## Съхранение — хибридно в паметта + SQLite

Критичният път използва `Map` в паметта (LRU според времето на създаване), подкрепен от SQLite таблица за възстановяване след срив и видимост в таблото за управление.

| Слой  | Реализация                                    | Предназначение                                            |
| ----- | --------------------------------------------- | --------------------------------------------------------- |
| Памет | `Map` в `open-sse/services/reasoningCache.ts` | Бързи търсения, премахва най-старите при достигане на 200 |
| БД    | Таблица `reasoning_cache` (`src/lib/db/`)     | Запазва се при рестартиране и служи за статистиките       |

Записите се извършват и в двата слоя. При четене първо се проверява паметта, а след това се използва БД като резервен вариант (резултатите от БД се преместват обратно в паметта). Грешките в БД не са фатални — кешът в паметта продължава да обслужва критичния път.

**Стойности по подразбиране:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Максимален брой записи в паметта: `200` (`MAX_MEMORY_ENTRIES`)
- Премахване: първо най-старият `createdAt`

## Схема на базата данни

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

Индекси: `expires_at`, `provider`, `model`, `created_at`. `expires_at` се съхранява като брой секунди от Unix епохата; SELECT слоят нормализира наследените текстови стойности чрез `EXPIRES_AT_EPOCH_SQL`.

## Разпознаване на доставчик / модел

Повторното възпроизвеждане е активирано, когато `requiresReasoningReplay(provider, model)` връща `true`. Функцията проверява два списъка в `open-sse/services/reasoningCache.ts`.

**Идентификатори на доставчици (точно съвпадение, без отчитане на регистъра):**

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

**Шаблони с регулярни изрази за модели (без отчитане на регистъра):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` и `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, с незадължителен суфикс `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Добавянето на нов строг доставчик/модел означава добавяне към един от тези списъци и написване на модулен тест, който потвърждава инжектирането за повторно възпроизвеждане. Описанието на PR трябва да цитира точния първоначален текст на грешката 400, която е мотивирала промяната.

## REST API

Кешът предоставя две крайни точки в `src/app/api/cache/reasoning/route.ts`. И двете изискват удостоверяване за управление (`isAuthenticated` от `@/shared/utils/apiAuth`).

| Метод  | Крайна точка                                              | Описание                                                             |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Статистика + страницирани записи                                     |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Филтриран списък (`limit` е ограничен до диапазона `[1, 200]`)       |
| DELETE | `/api/cache/reasoning`                                    | Изчиства всичко (памет + БД) и нулира броячите за попадения/пропуски |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Изчиства само записите за един доставчик                             |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Изтрива единичен запис                                               |

**Структура на GET отговора:**

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

## Оперативни бележки

- **Почистване:** `cleanupReasoningCache()` премахва изтеклите записи от паметта и изпълнява `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Работните процеси за проверка на състоянието го извикват периодично.
- **Възстановяване след срив:** След рестартиране паметта е празна, но БД продължава да съдържа неизтеклите записи. Първото търсене за даден `tool_call_id` е попадение в БД; следващите търсения са попадения в паметта.
- **Без разсъждение няма кеширане:** `cacheReasoningFromAssistantMessage` връща `0`, когато съобщението на асистента няма поле `reasoning_content` / `reasoning`, така че отговорите без разсъждение не изразходват ресурси.
- **Записването също е ограничено:** и двете места на извикване в `chatCore.ts` (без поточно предаване и с поточно предаване) извикват `cacheReasoningFromAssistantMessage()` само когато `requiresReasoningReplay(provider, model)` е `true` — същият предикат, който проверява страната за четене. Инсталациите, които никога не използват доставчик с повторно възпроизвеждане, вече не плащат цената за записването, актуализирането на индекса и `try/catch` при всеки отговор, съдържащ разсъждение.
- **Нестроги доставчици:** Когато `requiresReasoningReplay` е `false` и целевият формат е OpenAI, преобразувателят **премахва** всяко поле `reasoning_content` от изходящите съобщения — OpenAI Chat Completions не го приема.

## Вижте също

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — прекъсвачи на вериги, периоди на изчакване, блокиране на модели
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — диагностициране на upstream грешки 400
- Изходен код: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Миграция: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API маршрут: `src/app/api/cache/reasoning/route.ts`
- Първоначален проблем: #1628
