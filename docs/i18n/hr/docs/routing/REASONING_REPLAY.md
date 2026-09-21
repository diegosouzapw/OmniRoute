# Reasoning Replay Cache (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Izvor istine:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute bilježi `reasoning_content` asistenta koji stvaraju modeli s načinom razmišljanja te ga transparentno ponovno reproducira u zahtjevima s više interakcija kada to zahtijeva nadređeni pružatelj usluge. Time se uklanjaju pogreške HTTP 400 koje strogi pružatelji usluga vraćaju kada u klijentovoj povijesti razgovora nedostaje zaključivanje iz prethodne interakcije.

## Zašto ovo postoji

Nekoliko pružatelja modela s načinom razmišljanja odbija sljedeću interakciju ako **prethodna poruka asistenta ne sadrži izvorni `reasoning_content`**. Nadređeni sustav vraća pogrešku 400 s porukama poput:

```
Neispravan parametar: reasoning_content u načinu razmišljanja mora se proslijediti natrag API-ju.
```

Međutim, uobičajeni klijenti (Cursor, Cline, Roo Code, OpenAI SDK) uklanjaju `reasoning_content` iz povijesti koju ponovno šalju. OmniRoute ga vraća iz predmemorije na poslužitelju kako bi zahtjev koji vidi nadređeni sustav bio dosljedan. Problem #1628 uveo je hibridnu pohranu u memoriji i bazi SQLite kako bi predmemorija opstala nakon ponovnih pokretanja procesa.

## Arhitektura

```
Potez N (asistent generira):
  → odgovor sadrži reasoning_content + tool_calls
  → ako requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      zapisuje (memorija + DB), ključano po svakom tool_call.id
  → prosljeđuje odgovor klijentu (koji može, ali i ne mora zadržati obrazloženje)

Potez N+1 (klijent šalje nastavak):
  → prevoditelj detektira: requiresReasoningReplay(provider, model) === true
  → za svaku poruku asistenta s tool_calls i bez reasoning_content:
      lookupReasoning(toolCalls[0].id) → memorija → DB
      pogodak  → msg.reasoning_content = keširano; recordReplay()
      promašaj → msg.reasoning_content = "" (nasljedni povratak za stariji DeepSeek)
  → uzvodni sustav vidi dosljednu povijest → nema 400
```

Hvatanje se događa u `open-sse/handlers/chatCore.ts` (na dva mjesta, na dva pozivna mjesta `cacheReasoningFromAssistantMessage`). Ponovna reprodukcija (replay) događa se u `open-sse/translator/index.ts` nakon prisile sheme, ali prije otpreme.

Obični (bez poziva alata) potezi asistenta ključani su drugačije: `buildAssistantMessageCacheKey()` sažima opseg sesije plus normalizirani transkript u OpenAI formatu do tog poteza, jer DeepSeek zahtijeva obrazloženje _svakog_ prethodnog poteza kada su `tools` prisutni. Za ciljeve Responses-API-ja (na primjer `opencode-go/deepseek-v4-flash`, usmjereno na `/responses`) uzvodno tijelo nosi `input`, a ne `messages`, pa `translateRequest()` (`open-sse/translator/index.ts`) izvještava o pivot transkriptu koji je sažela putem opcije povratnog poziva, a mjesta hvatanja sažimaju taj isti transkript. Prolaz ponovne reprodukcije (replay) odgovora pokreće se na OpenAI pivotu za svaki izvorni format, tako da se i klijenti Anthropic Messages (Claude → OpenAI → Responses) također ponovno reproduciraju.

## Pohrana — hibridna memorija + SQLite

Putanja za česte operacije koristi `Map` u memoriji (LRU prema vremenu stvaranja), podržan SQLite tablicom radi oporavka od rušenja i vidljivosti na nadzornoj ploči.

| Sloj     | Implementacija                                | Svrha                                               |
| -------- | --------------------------------------------- | --------------------------------------------------- |
| Memorija | `Map` u `open-sse/services/reasoningCache.ts` | Brza pretraživanja, uklanja najstarije nakon 200    |
| DB       | tablica `reasoning_cache` (`src/lib/db/`)     | Opstaje nakon ponovnih pokretanja, pruža statistiku |

Zapisi se upisuju u oba sloja. Čitanja najprije provjeravaju memoriju, a zatim DB (pogodci iz DB-a promiču se natrag u memoriju). Kvarovi DB-a nisu fatalni — predmemorija u memoriji nastavlja posluživati putanju za česte operacije.

**Zadane vrijednosti:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Najveći broj zapisa u memoriji: `200` (`MAX_MEMORY_ENTRIES`)
- Uklanjanje: prvo najstariji `createdAt`

## Shema baze podataka

Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` se pohranjuje kao broj sekundi Unix epohe; sloj SELECT normalizira naslijeđene tekstualne vrijednosti putem `EXPIRES_AT_EPOCH_SQL`.

## Otkrivanje pružatelja / modela

Ponovno umetanje omogućeno je kada `requiresReasoningReplay(provider, model)` vrati `true`. Funkcija provjerava dva popisa u `open-sse/services/reasoningCache.ts`.

**ID-jevi pružatelja (točno podudaranje, neovisno o velikim i malim slovima):**

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

**Regex obrasci modela (neovisno o velikim i malim slovima):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` i `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, neobavezni sufiks `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Dodavanje novog strogog pružatelja/modela podrazumijeva dodavanje u jedan od tih popisa i pisanje jediničnog testa koji potvrđuje umetanje pri ponavljanju. Opis PR-a trebao bi navesti točan izvorni tekst pogreške 400 koja je potaknula promjenu.

## REST API

Predmemorija izlaže dvije krajnje točke pod `src/app/api/cache/reasoning/route.ts`. Obje zahtijevaju upravljačku autentifikaciju (`isAuthenticated` iz `@/shared/utils/apiAuth`).

| Metoda | Krajnja točka                                             | Opis                                                                        |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistika + straničeni unosi                                               |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrirani popis (`limit` je ograničen na raspon `[1, 200]`)                |
| DELETE | `/api/cache/reasoning`                                    | Briše sve (memoriju + bazu podataka) i poništava brojače pogodaka/promāšaja |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Briše samo unose za jednog pružatelja                                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Briše jedan unos                                                            |

**Struktura GET odgovora:**

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

## Operativne napomene

- **Čišćenje:** `cleanupReasoningCache()` uklanja istekle unose iz memorije i izvršava `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Radni procesi za provjeru stanja povremeno pozivaju ovu funkciju.
- **Oporavak nakon rušenja:** Nakon ponovnog pokretanja memorija je prazna, ali baza podataka i dalje sadrži unose koji nisu istekli. Prvo traženje za određeni `tool_call_id` rezultira pogotkom u bazi podataka; sljedeća traženja rezultiraju pogocima u memoriji.
- **Nema zaključivanja, nema predmemorije:** `cacheReasoningFromAssistantMessage` vraća `0` kada poruka asistenta nema polje `reasoning_content` / `reasoning`, pa odgovori bez zaključivanja nemaju nikakav trošak.
- **Pisanje je također uvjetovano:** oba mjesta poziva u `chatCore.ts` (bez strujanja i sa strujanjem) pozivaju `cacheReasoningFromAssistantMessage()` samo kada `requiresReasoningReplay(provider, model)` vrati `true` — isti predikat koji provjerava strana za čitanje. Instalacije koje nikada ne koriste pružatelja koji zahtijeva ponovno umetanje više ne snose trošak pisanja, ažuriranja indeksa ni bloka try/catch za svaki odgovor koji sadrži zaključivanje.
- **Pružatelji bez strogih zahtjeva:** Kada je `requiresReasoningReplay` `false`, a ciljni format OpenAI, prevoditelj **uklanja** svako polje `reasoning_content` iz odlaznih poruka — OpenAI Chat Completions ga ne prihvaća.

## Vidi također

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — prekidači strujnog kruga, razdoblja mirovanja, blokade modela
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — dijagnosticiranje nadređenih pogrešaka 400
- Izvor: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API ruta: `src/app/api/cache/reasoning/route.ts`
- Izvorni problem: #1628
