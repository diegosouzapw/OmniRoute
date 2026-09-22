# Reasoning Replay Cache (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Vir resnice:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Nazadnje posodobljeno:** 2026-06-28 — v3.8.40

OmniRoute zajame `reasoning_content`, ki ga ustvari pomočnik v modelih z načinom razmišljanja, in ga pri večkrožnih zahtevah pregledno ponovno predvaja, kadar to zahteva nadrejeni ponudnik. S tem odpravi napake HTTP 400, ki jih strogi ponudniki vrnejo, kadar v zgodovini pogovora odjemalca manjka sklepanje iz prejšnjega kroga.

## Zakaj to obstaja

Več ponudnikov z načinom razmišljanja zavrne nadaljevalni krog, če **prejšnje sporočilo pomočnika ne vključuje izvirnega `reasoning_content`**. Nadrejeni ponudnik vrne napako 400 s sporočili, kot je:

```
Neveljaven parameter: reasoning_content v načinu razmišljanja je treba poslati nazaj API-ju.
```

Vendar običajni odjemalci (Cursor, Cline, Roo Code, OpenAI SDK) odstranijo `reasoning_content` iz zgodovine, ki jo ponovno pošljejo. OmniRoute ga obnovi iz strežniškega predpomnilnika, tako da je zahteva, ki jo prejme nadrejeni ponudnik, skladna. Zadeva #1628 je uvedla hibridno trajno shranjevanje v pomnilniku/SQLite, da predpomnilnik preživi ponovne zagone procesa.

## Arhitektura

```
Obrat N (pomočnik ustvari):
  → odgovor vsebuje reasoning_content + tool_calls
  → če requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      zapiše (pomnilnik + podatkovna zbirka), indeksirano po vsakem tool_call.id
  → posreduje odgovor odjemalcu (ki lahko reasoning ohrani ali pa ne)

Obrat N+1 (odjemalec pošlje nadaljevanje):
  → prevajalnik zazna: requiresReasoningReplay(provider, model) === true
  → za vsako sporočilo pomočnika s tool_calls in brez reasoning_content:
      lookupReasoning(toolCalls[0].id) → pomnilnik → podatkovna zbirka
      zadetek  → msg.reasoning_content = cached; recordReplay()
      zgrešeno → msg.reasoning_content = "" (stari nadomestni način za starejši DeepSeek)
  → nadrejena storitev prejme dosledno zgodovino → brez napake 400
```

Zajem poteka v `open-sse/handlers/chatCore.ts` (na dveh mestih, kjer se kliče `cacheReasoningFromAssistantMessage`). Ponovno predvajanje poteka v `open-sse/translator/index.ts` po uskladitvi s shemo, vendar pred posredovanjem.

Običajni obrati pomočnika (brez klica orodja) so indeksirani drugače: `buildAssistantMessageCacheKey()` izračuna izvleček obsega seje skupaj z normaliziranim prepisom v obliki OpenAI do tega obrata, ker DeepSeek zahteva reasoning za _vsak_ predhodni obrat, ko je prisoten `tools`. Pri ciljih Responses API (na primer `opencode-go/deepseek-v4-flash`, preusmerjenem na `/responses`) telo nadrejene zahteve vsebuje `input` in ne `messages`, zato `translateRequest()` (`open-sse/translator/index.ts`) prek možnosti povratnega klica sporoči vmesni prepis, iz katerega je izračunal izvleček, mesta zajema pa izračunajo izvleček istega prepisa. Prehod za ponovno predvajanje Responses se za vsako izvorno obliko izvede na vmesni predstavitvi OpenAI, zato se ponovno predvajajo tudi odjemalci Anthropic Messages (Claude → OpenAI → Responses).

## Shranjevanje — hibrid pomnilnika in SQLite

Vroča pot uporablja pomnilniški `Map` (LRU glede na čas ustvarjanja), podprt s tabelo SQLite za obnovitev po sesutju in vidnost na nadzorni plošči.

| Plast     | Implementacija                                | Namen                                                                 |
| --------- | --------------------------------------------- | --------------------------------------------------------------------- |
| Pomnilnik | `Map` v `open-sse/services/reasoningCache.ts` | Hitra iskanja, odstrani najstarejše pri 200 vnosih                    |
| DB        | Tabela `reasoning_cache` (`src/lib/db/`)      | Ohrani podatke med ponovnimi zagoni in zagotavlja statistične podatke |

Zapisi se shranijo v obe plasti. Branje najprej preveri pomnilnik, nato pa uporabi DB kot rezervno možnost (zadetki v DB se ponovno prenesejo v pomnilnik). Napake DB niso usodne — pomnilniški predpomnilnik še naprej obdeluje vročo pot.

**Privzete vrednosti:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Največje število vnosov v pomnilniku: `200` (`MAX_MEMORY_ENTRIES`)
- Odstranjevanje: najprej najstarejši `createdAt`

## Shema podatkovne zbirke

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

Indeksi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` je shranjen kot število sekund epohe Unix; plast SELECT normalizira starejše besedilne vrednosti prek `EXPIRES_AT_EPOCH_SQL`.

## Zaznavanje ponudnika/modela

Ponovno predvajanje je omogočeno, ko `requiresReasoningReplay(provider, model)` vrne `true`. Funkcija preveri dva seznama v `open-sse/services/reasoningCache.ts`.

**ID-ji ponudnikov (natančno ujemanje, brez razlikovanja med velikimi in malimi črkami):**

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

**Vzorci regularnih izrazov za modele (brez razlikovanja med velikimi in malimi črkami):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` in `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, neobvezna pripona `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Dodajanje novega strogega ponudnika/modela pomeni dodajanje na enega od teh seznamov in pisanje testa enote, ki preverja vstavljanje ponovnega predvajanja. Opis zahteve za združitev mora navesti natančen niz napake 400 iz izvornega sistema, zaradi katerega je bila sprememba potrebna.

## REST API

Predpomnilnik izpostavlja dve končni točki v `src/app/api/cache/reasoning/route.ts`. Obe zahtevata skrbniško preverjanje pristnosti (`isAuthenticated` iz `@/shared/utils/apiAuth`).

| Metoda | Končna točka                                              | Opis                                                                               |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistika + vnosi po straneh                                                      |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtriran seznam (`limit` je omejen na razpon `[1, 200]`)                          |
| DELETE | `/api/cache/reasoning`                                    | Počisti vse (pomnilnik + podatkovno zbirko) in ponastavi števce zadetkov/zgrešitev |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Počisti samo vnose enega ponudnika                                                 |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Izbriše posamezen vnos                                                             |

**Oblika odgovora GET:**

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

## Operativne opombe

- **Čiščenje:** `cleanupReasoningCache()` odstrani potekle vnose iz pomnilnika in izvede `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Delovni procesi za preverjanje stanja to kličejo periodično.
- **Obnovitev po sesutju:** Po ponovnem zagonu je pomnilnik prazen, vendar podatkovna zbirka še vedno vsebuje vnose, ki niso potekli. Prvo iskanje za določen `tool_call_id` je zadetek v podatkovni zbirki; naslednja iskanja so zadetki v pomnilniku.
- **Brez sklepanja ni predpomnjenja:** `cacheReasoningFromAssistantMessage` vrne `0`, kadar sporočilo pomočnika nima polja `reasoning_content` / `reasoning`, zato odzivi brez razmišljanja ne povzročajo nobenih stroškov.
- **Tudi zapisovanje je pogojeno:** obe mesti klica v `chatCore.ts` (brez pretakanja in s pretakanjem) pokličeta `cacheReasoningFromAssistantMessage()` samo, ko `requiresReasoningReplay(provider, model)` vrne `true` — to je isti predikat, ki ga preverja bralna stran. Namestitve, ki nikoli ne uporabljajo ponudnika s ponovnim predvajanjem, tako ne plačujejo več stroškov zapisovanja, posodabljanja indeksa in izvajanja bloka try/catch pri vsakem odgovoru, ki vsebuje sklepanje.
- **Nestrogi ponudniki:** Ko `requiresReasoningReplay` vrne `false` in je ciljna oblika OpenAI, prevajalnik **odstrani** vsa polja `reasoning_content` iz odhodnih sporočil — OpenAI Chat Completions jih ne sprejema.

## Glejte tudi

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — odklopniki, obdobja mirovanja, zaklepi modelov
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosticiranje napak 400 pri nadrejenih storitvah
- Izvorna koda: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Pot API-ja: `src/app/api/cache/reasoning/route.ts`
- Izvorna težava: #1628
