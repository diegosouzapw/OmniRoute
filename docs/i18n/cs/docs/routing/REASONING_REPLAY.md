# Reasoning Replay Cache (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Zdroj pravdy:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute zachycuje `reasoning_content` asistenta vytvořený modely v režimu přemýšlení a transparentně jej přehrává u vícekolových požadavků, pokud to poskytovatel upstreamu vyžaduje. Tím se eliminují chyby HTTP 400, které striktní poskytovatelé vracejí, když v historii konverzace klienta chybí uvažování z předchozího kola.

## Proč tato funkce existuje

Několik poskytovatelů režimu přemýšlení odmítne navazující kolo, pokud **předchozí zpráva asistenta neobsahuje původní `reasoning_content`**. Upstream vrátí chybu 400 se zprávami, jako je například:

```
Nesprávný parametr: reasoning_content v režimu přemýšlení musí být předán zpět rozhraní API.
```

Běžní klienti (Cursor, Cline, Roo Code, OpenAI SDK) však `reasoning_content` z historie, kterou znovu odesílají, odstraňují. OmniRoute jej obnoví z mezipaměti na straně serveru, aby byl požadavek, který upstream obdrží, konzistentní. Issue #1628 zavedl hybridní perzistenci v paměti/SQLite, aby mezipaměť přežila restart procesu.

## Architektura

```
Tah N (asistent generuje):
  → odpověď obsahuje reasoning_content + tool_calls
  → pokud requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      zapíše (do paměti + DB), s klíčem podle každého tool_call.id
  → předá odpověď klientovi (který může, ale nemusí zachovat reasoning)

Tah N+1 (klient odešle navazující požadavek):
  → překladač zjistí: requiresReasoningReplay(provider, model) === true
  → pro každou zprávu asistenta s tool_calls a bez reasoning_content:
      lookupReasoning(toolCalls[0].id) → paměť → DB
      nalezeno   → msg.reasoning_content = cached; recordReplay()
      nenalezeno → msg.reasoning_content = "" (zpětně kompatibilní náhradní řešení pro starší DeepSeek)
  → nadřazená služba obdrží konzistentní historii → žádná chyba 400
```

Zachycení probíhá v `open-sse/handlers/chatCore.ts` (na dvou místech, ve dvou místech volání `cacheReasoningFromAssistantMessage`). Opětovné vložení probíhá v `open-sse/translator/index.ts` po vynucení schématu, ale před odesláním.

Běžné tahy asistenta (bez volání nástrojů) používají odlišné klíče: `buildAssistantMessageCacheKey()` vytvoří otisk rozsahu relace spolu s normalizovaným přepisem ve formátu OpenAI až po daný tah, protože DeepSeek po přítomnosti `tools` vyžaduje reasoning z _každého_ předchozího tahu. U cílů rozhraní Responses API (například `opencode-go/deepseek-v4-flash`, směrovaného na `/responses`) obsahuje tělo nadřazeného požadavku `input`, nikoli `messages`, takže `translateRequest()` (`open-sse/translator/index.ts`) prostřednictvím možnosti zpětného volání předá pivotní přepis, z něhož vytvořil otisk, a místa zachycení vytvoří otisk téhož přepisu. Průchod pro opětovné vložení Responses se spouští nad pivotním formátem OpenAI pro každý zdrojový formát, takže se opětovné vložení provádí i pro klienty Anthropic Messages (Claude → OpenAI → Responses).

## Úložiště — hybridní paměť + SQLite

Kritická cesta používá `Map` v paměti (LRU podle času vytvoření), který je doplněn tabulkou SQLite pro obnovení po pádu a zobrazení na řídicím panelu.

| Vrstva | Implementace                                  | Účel                                           |
| ------ | --------------------------------------------- | ---------------------------------------------- |
| Paměť  | `Map` v `open-sse/services/reasoningCache.ts` | Rychlé vyhledávání, odstraní nejstarší při 200 |
| DB     | Tabulka `reasoning_cache` (`src/lib/db/`)     | Přetrvává po restartech, poskytuje statistiky  |

Zápisy směřují do obou vrstev. Čtení nejprve kontroluje paměť a poté použije jako náhradní zdroj DB (záznamy nalezené v DB jsou znovu přesunuty do paměti). Selhání DB nejsou kritická — mezipaměť v paměti nadále obsluhuje kritickou cestu.

**Výchozí hodnoty:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maximální počet záznamů v paměti: `200` (`MAX_MEMORY_ENTRIES`)
- Odstraňování: nejdříve nejstarší `createdAt`

## Schéma databáze

Migrace: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indexy: `expires_at`, `provider`, `model`, `created_at`. `expires_at` je uloženo jako počet sekund unixového času; vrstva SELECT normalizuje starší textové hodnoty prostřednictvím `EXPIRES_AT_EPOCH_SQL`.

## Detekce poskytovatele / modelu

Opakované vložení je povoleno, když `requiresReasoningReplay(provider, model)` vrátí `true`. Funkce kontroluje dva seznamy v `open-sse/services/reasoningCache.ts`.

**ID poskytovatelů (přesná shoda bez rozlišení velikosti písmen):**

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

**Regulární výrazy modelů (bez rozlišení velikosti písmen):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` a `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, volitelná přípona `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Přidání nového striktního poskytovatele/modelu znamená přidání položky do jednoho z těchto seznamů a vytvoření jednotkového testu ověřujícího vložení opakovaně použitého obsahu. Popis PR by měl citovat přesný upstreamový text chyby 400, který změnu podnítil.

## REST API

Mezipaměť zpřístupňuje dva koncové body v `src/app/api/cache/reasoning/route.ts`. Oba vyžadují autentizaci pro správu (`isAuthenticated` z `@/shared/utils/apiAuth`).

| Metoda | Koncový bod                                               | Popis                                                     |
| ------ | --------------------------------------------------------- | --------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistiky + stránkované záznamy                          |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrovaný výpis (`limit` omezený na rozsah `[1, 200]`)   |
| DELETE | `/api/cache/reasoning`                                    | Vymaže vše (paměť + DB) a vynuluje počty zásahů/neúspěchů |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Vymaže pouze záznamy jednoho poskytovatele                |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Odstraní jeden záznam                                     |

**Struktura odpovědi GET:**

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

## Provozní poznámky

- **Čištění:** `cleanupReasoningCache()` odstraní z paměti záznamy s prošlou platností a spustí `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Pracovní procesy kontroly stavu tuto funkci pravidelně volají.
- **Obnova po pádu:** Po restartu je paměť prázdná, ale DB stále obsahuje záznamy, jejichž platnost nevypršela. První vyhledání daného `tool_call_id` je zásah do DB; další vyhledání jsou zásahy do paměti.
- **Žádné uvažování, žádná mezipaměť:** `cacheReasoningFromAssistantMessage` vrátí `0`, pokud zpráva asistenta neobsahuje pole `reasoning_content` / `reasoning`, takže odpovědi bez uvažování nic nestojí.
- **Podmíněný je i zápis:** obě místa volání v `chatCore.ts` (bez streamování i se streamováním) volají `cacheReasoningFromAssistantMessage()` pouze tehdy, když `requiresReasoningReplay(provider, model)` vrátí `true` — tedy stejný predikát, který kontroluje strana čtení. Instalace, které nikdy nepoužijí poskytovatele vyžadujícího opakované vložení, tak přestanou platit režii za zápis, aktualizaci indexu a blok try/catch u každé odpovědi obsahující uvažování.
- **Nestriktní poskytovatelé:** Když `requiresReasoningReplay` vrátí `false` a cílovým formátem je OpenAI, překladač **odstraní** z odchozích zpráv všechna pole `reasoning_content` — OpenAI Chat Completions je nepřijímá.

## Viz také

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — jističe, doby obnovení, blokování modelů
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostika odpovědí 400 od nadřazených služeb
- Zdroj: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrace: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Trasa API: `src/app/api/cache/reasoning/route.ts`
- Původní problém: #1628
