# Reasoning Replay Cache (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Извор истине:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Последњи пут ажурирано:** 2026-06-28 — v3.8.40

OmniRoute бележи `reasoning_content` асистента који производе модели са режимом размишљања и транспарентно га поново прослеђује у захтевима са више корака када то надређени добављач захтева. Тиме се елиминишу HTTP 400 грешке које строги добављачи пријављују када у историји разговора клијента недостаје образложење из претходног корака.

## Зашто ово постоји

Неколико добављача модела са режимом размишљања одбија наредни корак осим ако **претходна порука асистента не садржи оригинални `reasoning_content`**. Надређени сервис враћа 400 са порукама попут:

```
Параметар је неисправан: reasoning_content у режиму размишљања мора бити поново прослеђен API-ју.
```

Међутим, типични клијенти (Cursor, Cline, Roo Code, OpenAI SDK) уклањају `reasoning_content` из историје коју поново прослеђују. OmniRoute га враћа из кеша на страни сервера како би захтев који надређени сервис види био доследан. Проблем #1628 увео је хибридно чување у меморији/SQLite бази како би кеш опстао након поновног покретања процеса.

## Архитектура

```
Корак N (асистент генерише):
  → одговор садржи reasoning_content + tool_calls
  → ако requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      уписује (меморија + база), са кључем за сваки tool_call.id
  → прослеђује одговор клијенту (који може, али не мора да задржи образложење)

Корак N+1 (клијент шаље наредни захтев):
  → преводилац открива: requiresReasoningReplay(provider, model) === true
  → за сваку поруку асистента са tool_calls и без reasoning_content:
      lookupReasoning(toolCalls[0].id) → меморија → база
      погодак   → msg.reasoning_content = cached; recordReplay()
      промашај → msg.reasoning_content = "" (резервно понашање за старије DeepSeek моделе)
  → надређени сервис види доследну историју → нема грешке 400
```

Бележeње се обавља у `open-sse/handlers/chatCore.ts` (на два места, на две локације позива `cacheReasoningFromAssistantMessage`). Поновно прослеђивање се обавља у `open-sse/translator/index.ts` након усклађивања са шемом, али пре слања.

## Складиштење — хибрид меморије и SQLite базе

Критична путања користи `Map` у меморији (LRU према времену креирања), подржан SQLite табелом ради опоравка након отказа и видљивости на контролној табли.

| Слој     | Имплементација                                | Намена                                              |
| -------- | --------------------------------------------- | --------------------------------------------------- |
| Меморија | `Map` у `open-sse/services/reasoningCache.ts` | Брзе претраге, уклања најстарије након 200 уноса    |
| База     | Табела `reasoning_cache` (`src/lib/db/`)      | Опстаје након поновних покретања и пружа статистику |

Уписи се врше у оба слоја. Читања прво проверавају меморију, а затим базу (погоци у бази се враћају у меморију). Откази базе нису критични — кеш у меморији наставља да опслужује критичну путању.

**Подразумеване вредности:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Највећи број уноса у меморији: `200` (`MAX_MEMORY_ENTRIES`)
- Уклањање: прво најстарији `createdAt`

## Шема базе података

Миграција: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Индекси: `expires_at`, `provider`, `model`, `created_at`. `expires_at` се чува у секундама Unix епохе; SELECT слој нормализује застареле текстуалне вредности помоћу `EXPIRES_AT_EPOCH_SQL`.

## Откривање провајдера / модела

Поновна репродукција је омогућена када `requiresReasoningReplay(provider, model)` врати `true`. Функција проверава две листе у `open-sse/services/reasoningCache.ts`.

**ID-ови провајдера (потпуно подударање, без обзира на велика и мала слова):**

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

**Regex обрасци модела (без обзира на велика и мала слова):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` и `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, опциони суфикс `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Додавање новог строгог провајдера/модела подразумева додавање у једну од ових листа и писање јединичног теста који потврђује уметање поновне репродукције. Опис PR-а треба да наведе тачну изворну поруку грешке 400 која је подстакла измену.

## REST API

Кеш излаже две крајње тачке у `src/app/api/cache/reasoning/route.ts`. Обе захтевају управљачку аутентификацију (`isAuthenticated` из `@/shared/utils/apiAuth`).

| Метод  | Крајња тачка                                              | Опис                                                                    |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Статистика + пагинирани уноси                                           |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Филтрирани списак (`limit` ограничен на `[1, 200]`)                     |
| DELETE | `/api/cache/reasoning`                                    | Брише све (меморију + базу података) и ресетује број погодака/промашаја |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Брише само уносе за једног провајдера                                   |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Брише један унос                                                        |

**Структура GET одговора:**

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

## Оперативне напомене

- **Чишћење:** `cleanupReasoningCache()` уклања истекле уносе из меморије и извршава `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Радници за проверу стања то периодично позивају.
- **Опоравак након пада:** Након поновног покретања, меморија је празна, али база података и даље садржи уносе који нису истекли. Прва претрага за дати `tool_call_id` представља погодак у бази података; наредне претраге су погоци у меморији.
- **Без резоновања нема кеширања:** `cacheReasoningFromAssistantMessage` враћа `0` када порука асистента нема поље `reasoning_content` / `reasoning`, тако да одговори без резоновања не стварају никакав трошак.
- **И упис је условљен:** обе тачке позива у `chatCore.ts` (без стримовања и са стримовањем) позивају `cacheReasoningFromAssistantMessage()` само када `requiresReasoningReplay(provider, model)` врати `true` — исти предикат који проверава страна за читање. Инсталације које никада не користе провајдер за поновну репродукцију више не сносе трошак уписа, ажурирања индекса и блока try/catch за сваки одговор који садржи резоновање.
- **Нестроги провајдери:** Када `requiresReasoningReplay` врати `false`, а циљни формат је OpenAI, преводилац **уклања** свако поље `reasoning_content` из одлазних порука — OpenAI Chat Completions га не прихвата.

## Такође погледајте

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — прекидачи кола, периоди мировања, блокаде модела
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — дијагностиковање узводних грешака 400
- Извор: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Миграција: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API рута: `src/app/api/cache/reasoning/route.ts`
- Првобитни проблем: #1628
