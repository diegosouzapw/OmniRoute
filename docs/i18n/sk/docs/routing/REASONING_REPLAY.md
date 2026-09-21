# Reasoning Replay Cache (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Zdroj pravdy:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute zachytáva `reasoning_content` asistenta vytvorený modelmi v režime premýšľania a transparentne ho prehráva pri viacťahových požiadavkách, keď to nadradený poskytovateľ vyžaduje. Tým sa eliminujú chyby HTTP 400, ktoré striktní poskytovatelia vracajú, keď v histórii konverzácie klienta chýba uvažovanie z predchádzajúceho ťahu.

## Prečo to existuje

Niekoľko poskytovateľov s režimom premýšľania odmietne nadväzujúci ťah, ak **predchádzajúca správa asistenta neobsahuje pôvodný `reasoning_content`**. Nadradená služba vráti chybu 400 so správami, ako napríklad:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Typickí klienti (Cursor, Cline, Roo Code, OpenAI SDK) však odstraňujú `reasoning_content` z histórie, ktorú opätovne odosielajú. OmniRoute ho obnovuje z vyrovnávacej pamäte na strane servera, aby bola požiadavka, ktorú nadradená služba prijme, konzistentná. Issue #1628 zaviedlo hybridnú perzistenciu v pamäti/SQLite, vďaka ktorej vyrovnávacia pamäť pretrvá aj po reštartovaní procesu.

## Architektúra

```
Ťah N (asistent generuje):
  → odpoveď obsahuje reasoning_content + tool_calls
  → ak requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      zapíše (pamäť + DB), s kľúčom podľa každého tool_call.id
  → odošle odpoveď klientovi (ktorý môže, ale nemusí uchovať uvažovanie)

Ťah N+1 (klient odošle nadväzujúcu požiadavku):
  → prekladač zistí: requiresReasoningReplay(provider, model) === true
  → pre každú správu asistenta s tool_calls a bez reasoning_content:
      lookupReasoning(toolCalls[0].id) → pamäť → DB
      nájdené   → msg.reasoning_content = cached; recordReplay()
      nenájdené → msg.reasoning_content = "" (staršie náhradné správanie pre DeepSeek)
  → nadradená služba dostane konzistentnú históriu → žiadna chyba 400
```

Zachytávanie prebieha v `open-sse/handlers/chatCore.ts` (na dvoch miestach, pri dvoch volaniach `cacheReasoningFromAssistantMessage`). Prehrávanie prebieha v `open-sse/translator/index.ts` po konverzii podľa schémy, ale pred odoslaním.

## Úložisko — hybridná pamäť + SQLite

Kritická cesta používa vnútropamäťový objekt `Map` (LRU podľa času vytvorenia), ktorý je podporovaný tabuľkou SQLite na obnovu po zlyhaní a zobrazenie údajov na ovládacom paneli.

| Vrstva | Implementácia                                 | Účel                                               |
| ------ | --------------------------------------------- | -------------------------------------------------- |
| Pamäť  | `Map` v `open-sse/services/reasoningCache.ts` | Rýchle vyhľadávanie, odstraňuje najstaršie pri 200 |
| DB     | tabuľka `reasoning_cache` (`src/lib/db/`)     | Pretrváva po reštartoch, poskytuje štatistiky      |

Zápisy smerujú do oboch vrstiev. Čítanie najprv skontroluje pamäť a potom použije DB ako záložnú možnosť (záznamy nájdené v DB sa opätovne načítajú do pamäte). Zlyhania DB nie sú fatálne — vnútropamäťová vyrovnávacia pamäť naďalej obsluhuje kritickú cestu.

**Predvolené hodnoty:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maximálny počet záznamov v pamäti: `200` (`MAX_MEMORY_ENTRIES`)
- Odstraňovanie: najprv najstarší `createdAt`

## Schéma databázy

Migrácia: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indexy: `expires_at`, `provider`, `model`, `created_at`. Hodnota `expires_at` sa ukladá ako počet sekúnd od epochy Unix; vrstva SELECT normalizuje staršie textové hodnoty prostredníctvom `EXPIRES_AT_EPOCH_SQL`.

## Detekcia poskytovateľa/modelu

Opätovné prehratie je povolené, keď `requiresReasoningReplay(provider, model)` vráti `true`. Funkcia kontroluje dva zoznamy v `open-sse/services/reasoningCache.ts`.

**ID poskytovateľov (presná zhoda, bez rozlišovania veľkosti písmen):**

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

**Regulárne výrazy pre modely (bez rozlišovania veľkosti písmen):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` a `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, voliteľná prípona `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Pridanie nového striktného poskytovateľa/modelu znamená pridanie položky do jedného z týchto zoznamov a napísanie jednotkového testu, ktorý overí vloženie opätovného prehratia. Opis PR by mal uvádzať presný pôvodný reťazec chyby 400, ktorý túto zmenu motivoval.

## REST API

Vyrovnávacia pamäť poskytuje dva koncové body v `src/app/api/cache/reasoning/route.ts`. Oba vyžadujú autentifikáciu správy (`isAuthenticated` z `@/shared/utils/apiAuth`).

| Metóda | Koncový bod                                               | Opis                                                          |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Štatistiky + stránkované záznamy                              |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrovaný zoznam (`limit` je obmedzený na rozsah `[1, 200]`) |
| DELETE | `/api/cache/reasoning`                                    | Vymaže všetko (pamäť + DB) a vynuluje počty zásahov/minutí    |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Vymaže iba záznamy jedného poskytovateľa                      |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Odstráni jeden záznam                                         |

**Štruktúra odpovede GET:**

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

## Prevádzkové poznámky

- **Čistenie:** `cleanupReasoningCache()` odstráni expirované záznamy z pamäte a spustí `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Pracovné procesy kontroly stavu túto funkciu pravidelne volajú.
- **Obnova po zlyhaní:** Po reštarte je pamäť prázdna, ale DB stále obsahuje neexpirované záznamy. Prvé vyhľadanie daného `tool_call_id` je zásahom do DB; nasledujúce vyhľadania sú zásahmi do pamäte.
- **Žiadne odôvodnenie, žiadna vyrovnávacia pamäť:** `cacheReasoningFromAssistantMessage` vráti `0`, keď správa asistenta nemá pole `reasoning_content` / `reasoning`, takže odpovede bez uvažovania nič nestoja.
- **Aj zápis je podmienený:** obe miesta volania v `chatCore.ts` (bez streamovania aj so streamovaním) volajú `cacheReasoningFromAssistantMessage()` iba vtedy, keď `requiresReasoningReplay(provider, model)` má hodnotu `true` — ide o rovnaký predikát, aký kontroluje strana čítania. Inštalácie, ktoré nikdy nepoužijú poskytovateľa vyžadujúceho opätovné prehratie, tak prestanú platiť náklady na zápis, aktualizáciu indexu a blok try/catch pri každej odpovedi obsahujúcej odôvodnenie.
- **Nestriktní poskytovatelia:** Keď má `requiresReasoningReplay` hodnotu `false` a cieľovým formátom je OpenAI, prekladač **odstráni** z odchádzajúcich správ všetky polia `reasoning_content` — OpenAI Chat Completions ich neprijíma.

## Pozrite tiež

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ističe, intervaly na zotavenie, blokovania modelov
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostika odpovedí 400 z nadradených služieb
- Zdroj: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrácia: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Trasa API: `src/app/api/cache/reasoning/route.ts`
- Pôvodný problém: #1628
