# Reasoning Replay Cache (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

# Keš za ponavljanje rezonovanja (Reasoning Replay Cache)

> **Izvor istine:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute hvata `reasoning_content` asistenta koji generišu modeli sa režimom razmišljanja (thinking-mode) i transparentno ga ponavlja pri zahtjevima sa više okreta (multi-turn) kada to zahtijeva upstream provajder. Ovo eliminiše HTTP 400 greške koje strogi provajderi izbacuju kada u istoriji razgovora klijenta nedostaje rezonovanje iz prethodnog okreta.

## Zašto ovo postoji

Nekoliko provajdera sa režimom razmišljanja odbija naknadni okret (follow-up turn) osim ako **prethodna poruka asistenta ne uključuje originalni `reasoning_content`**. Upstream vraća 400 sa porukama poput:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Ali tipični klijenti (Cursor, Cline, Roo Code, OpenAI SDK) uklanjaju `reasoning_content` iz istorije koju ponavljaju. OmniRoute ga vraća iz keša na strani servera tako da je zahtjev koji upstream vidi konzistentan. Issue #1628 je uveo hibridnu memorijsku/SQLite perzistenciju tako da keš preživljava ponovna pokretanja procesa.

## Arhitektura

```
Turn N (asistent generiše):
  → odgovor sadrži reasoning_content + tool_calls
  → ako requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      upisuje (memorija + DB), ključirano prema svakom tool_call.id
  → prosljeđuje odgovor klijentu (koji može, a ne mora zadržati rezonovanje)

Turn N+1 (klijent šalje nastavak):
  → translator detektuje: requiresReasoningReplay(provider, model) === true
  → za svaku poruku asistenta sa tool_calls i bez reasoning_content:
      lookupReasoning(toolCalls[0].id) → memorija → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (naslijeđeni fallback za stariji DeepSeek)
  → upstream vidi konzistentnu istoriju → nema 400
```

Hvatanje se dešava u `open-sse/handlers/chatCore.ts` (dvije lokacije, na dvije `cacheReasoningFromAssistantMessage` pozivne lokacije). Ponavljanje se dešava u `open-sse/translator/index.ts` nakon prinude šeme (schema coercion), ali prije dispečiranja.

## Skladištenje — Hibridna memorija + SQLite

Hot path koristi `Map` u memoriji (LRU-po-kreiranju) podržan SQLite tabelom za oporavak od pada i vidljivost na kontrolnoj tabli.

| Sloj     | Implementacija                                | Svrha                                             |
| -------- | --------------------------------------------- | ------------------------------------------------- |
| Memorija | `Map` u `open-sse/services/reasoningCache.ts` | Brze pretrage, izbacuje najstarije na 200         |
| DB       | `reasoning_cache` tabela (`src/lib/db/`)      | Traje kroz ponovna pokretanja, pokreće statistiku |

Upisi idu na oba. Čitanja prvo konsultuju memoriju, zatim se vraćaju na DB (DB pogoci se promovišu nazad u memoriju). Neuspjesi DB-a nisu fatalni — keš u memoriji nastavlja da služi hot path.

**Zadane vrijednosti:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimalan broj memorijskih unosa: `200` (`MAX_MEMORY_ENTRIES`)
- Izbacivanje: najstariji `createdAt` prvi

## Šema baze podataka

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

Indeksi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` se pohranjuje kao Unix epoch sekunde; SELECT sloj normalizuje naslijeđene tekstualne vrijednosti putem `EXPIRES_AT_EPOCH_SQL`.

## Detekcija provajdera / modela

Replay je omogućena kada `requiresReasoningReplay(provider, model)` vrati `true`. Funkcija provjerava dvije liste u `open-sse/services/reasoningCache.ts`.

**ID-ovi provajdera (tačno podudaranje, neosjetljivo na velika/mala slova):**

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

**Regex šabloni modela (neosjetljivo na velika/mala slova):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` i `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opcioni `-free` sufiks)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Dodavanje novog strogog provajdera/modela znači dodavanje na jednu od ovih lista i pisanje jediničnog testa koji potvrđuje replay injekciju. PR opis treba citirati tačan upstream 400 string koji je motivisao promjenu.

## REST API

Keš izlaže dvije krajnje tačke (endpoints) pod `src/app/api/cache/reasoning/route.ts`. Obje zahtijevaju upravljačku autentifikaciju (`isAuthenticated` iz `@/shared/utils/apiAuth`).

| Metoda | Endpoint                                                  | Opis                                                                      |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistika + paginirani unosi                                             |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrirani ispis (limit ograničen na `[1, 200]`)                          |
| DELETE | `/api/cache/reasoning`                                    | Brisanje svega (memorija + baza) i resetovanje brojača pogodaka/promašaja |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Brisanje samo unosa za jednog provajdera                                  |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Brisanje jednog unosa                                                     |

**Oblik GET odgovora:**

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

- **Čišćenje:** `cleanupReasoningCache()` briše istekle memorijske unose i pokreće `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Radnici za provjeru ispravnosti (health-check workers) ovo pozivaju periodično.
- **Oporavak od pada:** Nakon ponovnog pokretanja, memorija je prazna, ali baza podataka i dalje sadrži neistekle unose. Prva pretraga za dati `tool_call_id` je pogodak u bazi podataka; naknadne pretrage su pogoci u memoriji.
- **Bez rezonovanja, bez keša:** `cacheReasoningFromAssistantMessage` vraća `0` kada poruka asistenta nema polje `reasoning_content` / `reasoning`, tako da odgovori bez razmišljanja ne koštaju ništa.
- **Upis je također ograničen:** oba mjesta poziva u `chatCore.ts` (nestriming i striming) pozivaju `cacheReasoningFromAssistantMessage()` samo kada je `requiresReasoningReplay(provider, model)` jednako `true` — isti predikat koji provjerava strana za čitanje. Instalacije koje nikada ne koriste provajder za ponovnu reprodukciju (replay provider) prestaju plaćati cijenu upisa, ažuriranja indeksa i try/catch bloka pri svakom odgovoru koji sadrži rezonovanje.
- **Nestriktni provajderi:** Kada je `requiresReasoningReplay` `false` i ciljni format je OpenAI, prevodilac **uklanja** svako polje `reasoning_content` iz odlaznih poruka — OpenAI Chat Completions ga ne prihvata.

## Vidi također

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — prekidači strujnog kola (circuit breakers), periodi hlađenja (cooldowns), blokade modela
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — dijagnosticiranje uzvodnih 400 grešaka
- Izvor: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API ruta: `src/app/api/cache/reasoning/route.ts`
- Originalni problem: #1628
