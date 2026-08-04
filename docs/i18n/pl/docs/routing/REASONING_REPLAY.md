---
title: "Cache odtwarzania reasoning (Reasoning Replay)"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Cache odtwarzania reasoning (Reasoning Replay)

> **Źródło prawdy:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute przechwytuje `reasoning_content` asystenta generowane przez modele w trybie thinking i odtwarza je w sposób przezroczysty w żądaniach wieloturowych, gdy upstream provider tego wymaga. Eliminuje to błędy HTTP 400, które rygorystyczni providerzy zwracają, gdy historia rozmowy klienta nie zawiera reasoning z poprzedniej tury.

## Po co to istnieje

Kilku providerów w trybie thinking odrzuca kolejną turę, chyba że **poprzednia wiadomość asystenta zawiera oryginalne `reasoning_content`**. Upstream zwraca 400 z komunikatami w stylu:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Typowe klienty (Cursor, Cline, Roo Code, OpenAI SDK) usuwają jednak `reasoning_content` z historii, którą odtwarzają. OmniRoute przywraca je z cache po stronie serwera, dzięki czemu żądanie widziane przez upstream jest spójne. Issue #1628 wprowadził hybrydową persystencję pamięć/SQLite, dzięki czemu cache przetrwa restart procesu.

## Architektura

```
Tura N (asystent generuje):
  → odpowiedź zawiera reasoning_content + tool_calls
  → cacheReasoningFromAssistantMessage() zapisuje (pamięć + DB), kluczowane po każdym tool_call.id
  → przekaż odpowiedź do klienta (który może, ale nie musi zachować reasoning)

Tura N+1 (klient wysyła follow-up):
  → translator wykrywa: requiresReasoningReplay(provider, model) === true
  → dla każdej wiadomości asystenta z tool_calls i bez reasoning_content:
      lookupReasoning(toolCalls[0].id) → pamięć → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback dla starszego DeepSeek)
  → upstream widzi spójną historię → brak 400
```

Przechwytywanie odbywa się w `open-sse/handlers/chatCore.ts` (dwa miejsca, ok. linii 4093 i 4380). Odtwarzanie odbywa się w `open-sse/translator/index.ts` po koercji schematu, a przed dispatch.

## Przechowywanie — hybrydowa pamięć + SQLite

Ścieżka hot path używa in-memory `Map` (LRU według czasu utworzenia) wspartej tabelą SQLite na potrzeby odzyskania po awarii i widoczności w dashboardzie.

| Warstwa | Implementacja                                 | Cel                                         |
| ------- | --------------------------------------------- | ------------------------------------------- |
| Pamięć  | `Map` w `open-sse/services/reasoningCache.ts` | Szybkie lookupy, usuwa najstarsze przy 2000 |
| DB      | tabela `reasoning_cache` (`src/lib/db/`)      | Przetrwa restarty, zasila statystyki        |

Zapisy idą do obu. Odczyty najpierw sprawdzają pamięć, potem fallback do DB (trafy DB są promowane z powrotem do pamięci). Awaria DB nie jest fatalna — cache w pamięci nadal obsługuje hot path.

**Domyślne wartości:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maks. wpisów w pamięci: `2000` (`MAX_MEMORY_ENTRIES`)
- Eviction: najstarsze `createdAt` najpierw

## Schemat bazy danych

Migracja: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksy: `expires_at`, `provider`, `model`, `created_at`. `expires_at` jest przechowywane jako sekundy epoki Unixa; warstwa SELECT normalizuje legacy wartości tekstowe przez `EXPIRES_AT_EPOCH_SQL`.

## Wykrywanie providera / modelu

Odtwarzanie jest włączone, gdy `requiresReasoningReplay(provider, model)` zwraca `true`. Funkcja sprawdza dwie listy w `open-sse/services/reasoningCache.ts`.

**ID providerów (dokładne dopasowanie, bez rozróżniania wielkości liter):**

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

**Wzorce regex modeli (bez rozróżniania wielkości liter):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` oraz `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opcjonalny sufiks `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Dodanie nowego rygorystycznego providera/modelu oznacza dopisanie do jednej z tych list i napisanie testu jednostkowego potwierdzającego injekcję odtwarzania. Opis PR powinien cytować dokładny string upstream 400, który motywował zmianę.

## REST API

Cache udostępnia dwa endpointy w `src/app/api/cache/reasoning/route.ts`. Oba wymagają uwierzytelnienia management (`isAuthenticated` z `@/shared/utils/apiAuth`).

| Metoda | Endpoint                                                  | Opis                                                        |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statystyki + stronicowane wpisy                             |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrowana lista (`limit` ograniczony do `[1, 200]`)        |
| DELETE | `/api/cache/reasoning`                                    | Wyczyść wszystko (pamięć + DB) i zresetuj liczniki hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Wyczyść tylko wpisy jednego providera                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Usuń pojedynczy wpis                                        |

**Kształt odpowiedzi GET:**

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

## Uwagi operacyjne

- **Cleanup:** `cleanupReasoningCache()` usuwa wygasłe wpisy z pamięci i uruchamia `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Workery health-check wywołują to okresowo.
- **Odzyskanie po awarii:** Po restarcie pamięć jest pusta, ale DB nadal trzyma niewygasłe wpisy. Pierwszy lookup dla danego `tool_call_id` to traf DB; kolejne lookupy to trafy pamięci.
- **Brak reasoning, brak cache:** `cacheReasoningFromAssistantMessage` zwraca `0`, gdy wiadomość asystenta nie ma pola `reasoning_content` / `reasoning`, więc odpowiedzi non-thinking nic nie kosztują.
- **Nierygorystyczni providerzy:** Gdy `requiresReasoningReplay` jest `false`, a format docelowy to OpenAI, translator **usuwa** każde pole `reasoning_content` z wychodzących wiadomości — OpenAI Chat Completions go nie akceptuje.

## Zobacz też

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breakery, cooldowny, lockouty modeli
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnozowanie upstream 400
- Źródło: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracja: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Trasa API: `src/app/api/cache/reasoning/route.ts`
- Oryginalne issue: #1628
