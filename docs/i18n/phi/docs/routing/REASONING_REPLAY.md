# Reasoning Replay Cache (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Huling na-update:** 2026-06-28 — v3.8.40

Kinukuha ng OmniRoute ang `reasoning_content` ng assistant na nililikha ng mga thinking-mode model at malinaw itong muling ipinapasa sa mga multi-turn request kapag hinihingi ito ng upstream provider. Inaalis nito ang mga HTTP 400 error na ibinabalik ng mahihigpit na provider kapag nawawala sa history ng pag-uusap ng client ang reasoning mula sa nakaraang turn.

## Bakit Ito Umiiral

Tinatanggihan ng ilang thinking-mode provider ang follow-up turn maliban kung **kasama sa nakaraang assistant message ang orihinal na `reasoning_content`**. Nagbabalik ang upstream ng 400 na may mga mensaheng tulad nito:

```
Param Incorrect: Ang reasoning_content sa thinking mode ay dapat muling ipasa sa API.
```

Ngunit karaniwang inaalis ng mga client (Cursor, Cline, Roo Code, OpenAI SDK) ang `reasoning_content` mula sa history na muli nilang ipinapasa. Ibinabalik ito ng OmniRoute mula sa server-side cache upang maging pare-pareho ang request na nakikita ng upstream. Ipinakilala ng Issue #1628 ang hybrid memory/SQLite persistence upang manatili ang cache kahit mag-restart ang proseso.

## Arkitektura

```
Turn N (lumilikha ang assistant):
  → naglalaman ang response ng reasoning_content + tool_calls
  → kung requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      nagsusulat sa (memory + DB), na naka-key ayon sa bawat tool_call.id
  → ipinapasa ang response sa client (na maaaring panatilihin o hindi ang reasoning)

Turn N+1 (nagpapadala ang client ng follow-up):
  → natutukoy ng translator: requiresReasoningReplay(provider, model) === true
  → para sa bawat assistant message na may tool_calls at walang reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback para sa mas lumang DeepSeek)
  → nakakakita ang upstream ng pare-parehong history → walang 400
```

Nagaganap ang pagkuha sa `open-sse/handlers/chatCore.ts` (dalawang lokasyon, sa dalawang call site ng `cacheReasoningFromAssistantMessage`). Nagaganap ang replay sa `open-sse/translator/index.ts` pagkatapos ng schema coercion ngunit bago ang dispatch.

## Storage — Hybrid Memory + SQLite

Gumagamit ang hot path ng in-memory na `Map` (LRU-ayon-sa-paglikha) na sinusuportahan ng isang SQLite table para sa pagbawi mula sa crash at visibility sa dashboard.

| Layer  | Implementasyon                                 | Layunin                                             |
| ------ | ---------------------------------------------- | --------------------------------------------------- |
| Memory | `Map` sa `open-sse/services/reasoningCache.ts` | Mabilis na lookup, inaalis ang pinakaluma sa 200    |
| DB     | `reasoning_cache` table (`src/lib/db/`)        | Nananatili sa mga restart, pinagmumulan ng mga stat |

Isinusulat ang data sa pareho. Tinitingnan muna ng mga read ang memory, pagkatapos ay gumagamit ng DB bilang fallback (ang mga hit sa DB ay muling inilalagay sa memory). Hindi nakamamatay ang mga failure sa DB — patuloy na pinagsisilbihan ng in-memory cache ang hot path.

**Mga default:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Pinakamaraming entry sa memory: `200` (`MAX_MEMORY_ENTRIES`)
- Eviction: inuuna ang pinakalumang `createdAt`

## Schema ng Database

Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Mga index: `expires_at`, `provider`, `model`, `created_at`. Iniimbak ang `expires_at` bilang mga segundo ng Unix epoch; ginagawang normal ng SELECT layer ang mga legacy text value sa pamamagitan ng `EXPIRES_AT_EPOCH_SQL`.

## Pag-detect ng Provider / Model

Naka-enable ang replay kapag nagbalik ng `true` ang `requiresReasoningReplay(provider, model)`. Sinusuri ng function ang dalawang listahan sa `open-sse/services/reasoningCache.ts`.

**Mga Provider ID (eksaktong tugma, hindi sensitibo sa case):**

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

**Mga regex pattern ng model (hindi sensitibo sa case):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` at `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opsyonal na suffix na `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Ang pagdaragdag ng bagong mahigpit na provider/model ay nangangahulugang pagdaragdag nito sa isa sa mga listahang ito at pagsulat ng unit test na nagpapatunay sa replay injection. Dapat banggitin sa paglalarawan ng PR ang eksaktong upstream na 400 string na naging dahilan ng pagbabago.

## REST API

Naglalantad ang cache ng dalawang endpoint sa ilalim ng `src/app/api/cache/reasoning/route.ts`. Parehong nangangailangan ng authentication para sa pamamahala (`isAuthenticated` mula sa `@/shared/utils/apiAuth`).

| Pamamaraan | Endpoint                                                  | Paglalarawan                                                       |
| ---------- | --------------------------------------------------------- | ------------------------------------------------------------------ |
| GET        | `/api/cache/reasoning`                                    | Mga istatistika + mga naka-pagination na entry                     |
| GET        | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Na-filter na listahan (ang `limit` ay nililimitahan sa `[1, 200]`) |
| DELETE     | `/api/cache/reasoning`                                    | Burahin ang lahat (memory + DB) at i-reset ang bilang ng hit/miss  |
| DELETE     | `/api/cache/reasoning?provider=deepseek`                  | Burahin lamang ang mga entry para sa isang provider                |
| DELETE     | `/api/cache/reasoning?toolCallId=call_abc`                | Burahin ang isang entry                                            |

**Hugis ng tugon sa GET:**

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

## Mga Tala sa Operasyon

- **Paglilinis:** Tinatanggal ng `cleanupReasoningCache()` ang mga nag-expire na entry sa memory at pinapatakbo ang `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Pana-panahong tinatawag ito ng mga health-check worker.
- **Pag-recover mula sa crash:** Pagkatapos ng restart, walang laman ang memory ngunit nananatili sa DB ang mga hindi pa nag-e-expire na entry. Ang unang lookup para sa isang partikular na `tool_call_id` ay isang DB hit; ang mga susunod na lookup ay mga memory hit.
- **Walang reasoning, walang cache:** Nagbabalik ang `cacheReasoningFromAssistantMessage` ng `0` kapag walang field na `reasoning_content` / `reasoning` ang mensahe ng assistant, kaya walang dagdag na gastos ang mga tugong hindi gumagamit ng thinking.
- **May gate din ang pagsusulat:** Tinatawag lamang ng parehong call site sa `chatCore.ts` (non-streaming at streaming) ang `cacheReasoningFromAssistantMessage()` kapag `true` ang `requiresReasoningReplay(provider, model)` — ang parehong predicate na sinusuri ng read side. Ang mga installation na hindi kailanman gumagamit ng replay provider ay hindi na magbabayad para sa pagsusulat, pag-update ng index, at try/catch sa bawat tugong naglalaman ng reasoning.
- **Mga non-strict na provider:** Kapag `false` ang `requiresReasoningReplay` at OpenAI ang target na format, **tinatanggal** ng translator ang anumang field na `reasoning_content` mula sa mga papalabas na mensahe — hindi ito tinatanggap ng OpenAI Chat Completions.

## Tingnan Din

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — mga circuit breaker, cooldown, at pag-lockout ng modelo
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — pag-diagnose ng mga upstream na 400 error
- Source: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API route: `src/app/api/cache/reasoning/route.ts`
- Orihinal na isyu: #1628
