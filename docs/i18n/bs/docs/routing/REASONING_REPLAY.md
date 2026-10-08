# Reasoning Replay Cache (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Izvor istine:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute bilježi `reasoning_content` asistenta koji generišu modeli s načinom razmišljanja i transparentno ga ponovo koristi u zahtjevima s više poteza kada to zahtijeva nadređeni pružalac usluge. Time se uklanjaju HTTP 400 greške koje strogi pružaoci usluga prijavljuju kada u historiji razgovora klijenta nedostaje obrazloženje iz prethodnog poteza.

## Zašto ovo postoji

Nekoliko pružalaca usluga s načinom razmišljanja odbija naredni potez osim ako **prethodna poruka asistenta sadrži izvorni `reasoning_content`**. Nadređeni servis vraća 400 s porukama poput:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Međutim, uobičajeni klijenti (Cursor, Cline, Roo Code, OpenAI SDK) uklanjaju `reasoning_content` iz historije koju ponovo šalju. OmniRoute ga vraća iz predmemorije na strani servera kako bi zahtjev koji nadređeni servis vidi bio dosljedan. Problem #1628 uveo je hibridnu postojanost u memoriji/SQLite-u kako bi predmemorija preživjela ponovna pokretanja procesa.

## Arhitektura

```
Potez N (asistent generiše):
  → odgovor sadrži reasoning_content + tool_calls
  → ako requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      upisuje (memorija + baza podataka), koristeći svaki tool_call.id kao ključ
  → prosljeđuje odgovor klijentu (koji može, ali ne mora zadržati obrazloženje)

Potez N+1 (klijent šalje naredni zahtjev):
  → prevodilac otkriva: requiresReasoningReplay(provider, model) === true
  → za svaku poruku asistenta s tool_calls i bez reasoning_content:
      lookupReasoning(toolCalls[0].id) → memorija → baza podataka
      pronađeno    → msg.reasoning_content = cached; recordReplay()
      nije pronađeno → msg.reasoning_content = "" (naslijeđena rezervna opcija za stariji DeepSeek)
  → nadređeni servis vidi dosljednu historiju → nema greške 400
```

Bilježenje se odvija u `open-sse/handlers/chatCore.ts` (na dva mjesta, na dvije lokacije poziva `cacheReasoningFromAssistantMessage`). Ponovna upotreba odvija se u `open-sse/translator/index.ts` nakon usklađivanja sa shemom, ali prije slanja.

Obični potezi asistenta (bez poziva alata) koriste drugačije ključeve: `buildAssistantMessageCacheKey()` sažima opseg sesije zajedno s normaliziranim transkriptom u OpenAI formatu do tog poteza, jer DeepSeek zahtijeva obrazloženje _svakog_ prethodnog poteza čim je prisutan `tools`. Za odredišta Responses API-ja (naprimjer `opencode-go/deepseek-v4-flash`, usmjeren na `/responses`) tijelo nadređenog zahtjeva sadrži `input`, a ne `messages`, pa `translateRequest()` (`open-sse/translator/index.ts`) putem opcije povratnog poziva prijavljuje pivotni transkript koji je sažeo, a mjesta bilježenja sažimaju taj isti transkript. Prolaz ponovne upotrebe za Responses izvršava se nad OpenAI pivotom za svaki izvorni format, pa se ona primjenjuje i na klijente Anthropic Messages (Claude → OpenAI → Responses).

## Pohrana — hibridna memorija + SQLite

Kritična putanja koristi `Map` u memoriji (LRU prema vremenu kreiranja), podržan SQLite tabelom radi oporavka nakon pada i vidljivosti na nadzornoj ploči.

| Sloj     | Implementacija                                | Namjena                                                           |
| -------- | --------------------------------------------- | ----------------------------------------------------------------- |
| Memorija | `Map` u `open-sse/services/reasoningCache.ts` | Brze pretrage, uklanja najstarije nakon 200 unosa                 |
| BP       | tabela `reasoning_cache` (`src/lib/db/`)      | Zadržava podatke nakon ponovnih pokretanja i omogućava statistiku |

Upisi se vrše u oba sloja. Čitanja prvo provjeravaju memoriju, a zatim bazu podataka (pogoci u bazi podataka ponovo se učitavaju u memoriju). Greške baze podataka nisu fatalne — predmemorija u memoriji nastavlja opsluživati kritičnu putanju.

**Zadane vrijednosti:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimalan broj unosa u memoriji: `200` (`MAX_MEMORY_ENTRIES`)
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

Indeksi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` se pohranjuje kao broj sekundi Unix epohe; SELECT sloj normalizira naslijeđene tekstualne vrijednosti putem `EXPIRES_AT_EPOCH_SQL`.

## Otkrivanje pružaoca / modela

Ponovno reproduciranje je omogućeno kada `requiresReasoningReplay(provider, model)` vrati `true`. Funkcija provjerava dvije liste u `open-sse/services/reasoningCache.ts`.

**ID-ovi pružalaca (tačno podudaranje, bez razlikovanja velikih i malih slova):**

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

**Regex obrasci modela (bez razlikovanja velikih i malih slova):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` i `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opcionalni sufiks `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Dodavanje novog strogog pružaoca/modela podrazumijeva dodavanje u jednu od ovih lista i pisanje jediničnog testa koji potvrđuje ubacivanje ponovne reprodukcije. Opis PR-a treba navesti tačan uzvodni tekst greške 400 koji je motivirao promjenu.

## REST API

Keš izlaže dvije krajnje tačke u `src/app/api/cache/reasoning/route.ts`. Obje zahtijevaju upravljačku autentifikaciju (`isAuthenticated` iz `@/shared/utils/apiAuth`).

| Metoda | Krajnja tačka                                             | Opis                                                                     |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | Statistika + straničeni unosi                                            |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrirani prikaz (`limit` ograničen na raspon `[1, 200]`)               |
| DELETE | `/api/cache/reasoning`                                    | Briše sve (memoriju + bazu podataka) i resetuje brojače pogodaka/promaja |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Briše samo unose za jednog pružaoca                                      |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Briše jedan unos                                                         |

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

- **Čišćenje:** `cleanupReasoningCache()` uklanja istekle unose iz memorije i izvršava `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Procesi za provjeru stanja periodično pozivaju ovu funkciju.
- **Oporavak nakon pada:** Nakon ponovnog pokretanja memorija je prazna, ali baza podataka i dalje sadrži unose koji nisu istekli. Prvo traženje za dati `tool_call_id` pristupa bazi podataka; naredna traženja pristupaju memoriji.
- **Bez rezonovanja nema ni keširanja:** `cacheReasoningFromAssistantMessage` vraća `0` kada poruka asistenta nema polje `reasoning_content` / `reasoning`, tako da odgovori bez rezonovanja ne troše resurse.
- **I upis je uslovljen:** obje lokacije poziva u `chatCore.ts` (bez streaminga i sa streamingom) pozivaju `cacheReasoningFromAssistantMessage()` samo kada je `requiresReasoningReplay(provider, model)` jednako `true` — isti predikat koji provjerava strana za čitanje. Instalacije koje nikada ne koriste pružaoca s ponovnom reprodukcijom više ne snose trošak upisa, ažuriranja indeksa i try/catch bloka za svaki odgovor koji sadrži rezonovanje.
- **Pružaoci bez strogih zahtjeva:** Kada je `requiresReasoningReplay` jednako `false`, a ciljni format je OpenAI, prevodilac **uklanja** svako polje `reasoning_content` iz odlaznih poruka — OpenAI Chat Completions ga ne prihvata.

## Pogledajte također

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — prekidači strujnog kola, periodi hlađenja, zaključavanja modela
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — dijagnosticiranje uzvodnih grešaka 400
- Izvor: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API ruta: `src/app/api/cache/reasoning/route.ts`
- Izvorni problem: #1628
