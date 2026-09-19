# Reasoning Replay Cache (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Tiesos šaltinis:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

OmniRoute fiksuoja mąstymo režimo modelių sugeneruotą asistento `reasoning_content` ir skaidriai jį atkuria kelių žingsnių užklausose, kai to reikalauja aukštesnio lygio paslaugos teikėjas. Taip pašalinamos HTTP 400 klaidos, kurias griežti paslaugų teikėjai pateikia, kai kliento pokalbio istorijoje trūksta ankstesnio žingsnio samprotavimo.

## Kodėl Tai Reikalinga

Kai kurie mąstymo režimo paslaugų teikėjai atmeta tolesnį žingsnį, nebent **ankstesniame asistento pranešime yra originalus `reasoning_content`**. Aukštesnio lygio paslauga grąžina 400 klaidą su tokiais pranešimais:

```
Neteisingas parametras: mąstymo režimo reasoning_content turi būti perduotas atgal API.
```

Tačiau įprasti klientai (Cursor, Cline, Roo Code, OpenAI SDK) pašalina `reasoning_content` iš pakartotinai siunčiamos istorijos. OmniRoute jį atkuria iš serverio talpyklos, kad aukštesnio lygio paslaugai siunčiama užklausa būtų nuosekli. Užduotyje #1628 buvo pristatytas hibridinis atminties ir SQLite išsaugojimas, todėl talpykla išlieka ir iš naujo paleidus procesą.

## Architektūra

```
N žingsnis (asistentas generuoja):
  → atsakyme yra reasoning_content + tool_calls
  → jei requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      įrašo (į atmintį + DB), naudodama kiekvieną tool_call.id kaip raktą
  → persiunčia atsakymą klientui (kuris gali išsaugoti samprotavimą arba jo neišsaugoti)

N+1 žingsnis (klientas siunčia tolesnę užklausą):
  → vertyklė aptinka: requiresReasoningReplay(provider, model) === true
  → kiekvienam asistento pranešimui, turinčiam tool_calls, bet neturinčiam reasoning_content:
      lookupReasoning(toolCalls[0].id) → atmintis → DB
      rasta   → msg.reasoning_content = cached; recordReplay()
      nerasta → msg.reasoning_content = "" (senasis atsarginis variantas, skirtas ankstesnei DeepSeek versijai)
  → aukštesnio lygio paslauga gauna nuoseklią istoriją → nėra 400 klaidos
```

Fiksavimas vyksta faile `open-sse/handlers/chatCore.ts` (dviejose vietose, ties dviem `cacheReasoningFromAssistantMessage` iškvietimo vietomis). Atkūrimas vyksta faile `open-sse/translator/index.ts` po schemos konvertavimo, bet prieš išsiuntimą.

## Saugykla — Hibridinė Atmintis + SQLite

Dažniausiai vykdomoje dalyje naudojamas atmintyje esantis `Map` (LRU pagal sukūrimo laiką), kurio atsarginė saugykla yra SQLite lentelė, skirta atkūrimui po gedimų ir matomumui valdymo skydelyje.

| Sluoksnis | Įgyvendinimas                                     | Paskirtis                                               |
| --------- | ------------------------------------------------- | ------------------------------------------------------- |
| Atmintis  | `Map` faile `open-sse/services/reasoningCache.ts` | Greitos paieškos, seniausi įrašai šalinami pasiekus 200 |
| DB        | Lentelė `reasoning_cache` (`src/lib/db/`)         | Išlieka paleidus iš naujo, naudojama statistikai        |

Duomenys įrašomi į abu sluoksnius. Skaitant pirmiausia tikrinama atmintis, o tada DB (DB rasti įrašai vėl perkeliami į atmintį). DB triktys nėra kritinės — atminties talpykla ir toliau aptarnauja dažniausiai vykdomą dalį.

**Numatytosios reikšmės:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Didžiausias įrašų skaičius atmintyje: `200` (`MAX_MEMORY_ENTRIES`)
- Šalinimas: pirmiausia seniausias pagal `createdAt`

## Duomenų Bazės Schema

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

Indeksai: `expires_at`, `provider`, `model`, `created_at`. `expires_at` saugomas kaip Unix epochos sekundės; SELECT sluoksnis normalizuoja senąsias tekstines reikšmes naudodamas `EXPIRES_AT_EPOCH_SQL`.

## Teikėjo / modelio aptikimas

Pakartojimas įjungiamas, kai `requiresReasoningReplay(provider, model)` grąžina `true`. Funkcija tikrina du sąrašus faile `open-sse/services/reasoningCache.ts`.

**Teikėjų ID (tikslus atitikimas, nepaisant raidžių dydžio):**

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

**Modelių reguliariųjų išraiškų šablonai (nepaisant raidžių dydžio):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` ir `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, pasirinktinė `-free` priesaga)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Norint pridėti naują griežtą teikėją / modelį, reikia papildyti vieną iš šių sąrašų ir parašyti vieneto testą, patvirtinantį pakartojimo įterpimą. PR apraše turėtų būti nurodytas tikslus pirminės sistemos 400 klaidos tekstas, paskatinęs šį pakeitimą.

## REST API

Talpykla pateikia du galinius taškus, apibrėžtus `src/app/api/cache/reasoning/route.ts`. Abiem būtinas valdymo autentifikavimas (`isAuthenticated` iš `@/shared/utils/apiAuth`).

| Metodas | Galinis taškas                                            | Aprašas                                                                                 |
| ------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | Statistika ir puslapiais suskirstyti įrašai                                             |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtruotas sąrašas (`limit` apribojamas iki intervalo `[1, 200]`)                       |
| DELETE  | `/api/cache/reasoning`                                    | Išvalyti viską (atmintį + DB) ir iš naujo nustatyti pataikymų / nepataikymų skaitiklius |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Išvalyti tik vieno teikėjo įrašus                                                       |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Ištrinti vieną įrašą                                                                    |

**GET atsakymo struktūra:**

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

## Eksploatavimo pastabos

- **Valymas:** `cleanupReasoningCache()` pašalina pasibaigusio galiojimo įrašus iš atminties ir įvykdo `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Būklės tikrinimo darbiniai procesai tai periodiškai iškviečia.
- **Atkūrimas po strigties:** paleidus iš naujo, atmintis būna tuščia, tačiau DB vis dar saugo nepasibaigusio galiojimo įrašus. Pirmoji konkretaus `tool_call_id` paieška yra pataikymas į DB; vėlesnės paieškos yra pataikymai į atmintį.
- **Nėra samprotavimo, nėra talpyklos:** `cacheReasoningFromAssistantMessage` grąžina `0`, kai asistento pranešime nėra `reasoning_content` / `reasoning` lauko, todėl atsakymai be samprotavimo nieko nekainuoja.
- **Rašymas taip pat valdomas sąlyga:** abi iškvietimo vietos faile `chatCore.ts` (nesrautinis ir srautinis režimai) iškviečia `cacheReasoningFromAssistantMessage()` tik tada, kai `requiresReasoningReplay(provider, model)` yra `true` — tai tas pats predikatas, kurį tikrina skaitymo pusė. Dieginiuose, kurie niekada nenaudoja pakartojimo teikėjo, nebelieka rašymo, indekso atnaujinimo ir try/catch sąnaudų kiekvienam atsakymui su samprotavimu.
- **Negriežti teikėjai:** kai `requiresReasoningReplay` yra `false`, o tikslinis formatas yra OpenAI, transformavimo priemonė **pašalina** visus `reasoning_content` laukus iš siunčiamų pranešimų — OpenAI Chat Completions jų nepriima.

## Taip pat žr.

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — grandinės pertraukikliai, atvėsimo laikotarpiai, modelių blokavimas
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — išorinių paslaugų 400 klaidų diagnostika
- Šaltinis: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API maršrutas: `src/app/api/cache/reasoning/route.ts`
- Pradinė problema: #1628
