# Reasoning Replay Cache (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Patiesības avots:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute tver domāšanas režīma modeļu ģenerēto asistenta `reasoning_content` un nemanāmi to atkārtoti izmanto vairāku soļu pieprasījumos, ja augšupējais pakalpojumu sniedzējs to pieprasa. Tas novērš HTTP 400 kļūdas, kuras stingri pakalpojumu sniedzēji atgriež, ja klienta sarunas vēsturē trūkst iepriekšējā soļa spriešanas satura.

## Kāpēc tas ir nepieciešams

Vairāki domāšanas režīma pakalpojumu sniedzēji noraida nākamo sarunas soli, ja **iepriekšējā asistenta ziņojumā nav iekļauts sākotnējais `reasoning_content`**. Augšupējais pakalpojums atgriež 400 kļūdu ar šādiem ziņojumiem:

```
Nederīgs parametrs: domāšanas režīma reasoning_content ir jānosūta atpakaļ API.
```

Taču tipiski klienti (Cursor, Cline, Roo Code, OpenAI SDK) izņem `reasoning_content` no atkārtoti nosūtāmās vēstures. OmniRoute to atjauno no servera puses kešatmiņas, lai augšupējam pakalpojumam redzamais pieprasījums būtu konsekvents. Problēmas pieteikums #1628 ieviesa hibrīdu atmiņas/SQLite persistenci, lai kešatmiņa saglabātos pēc procesa restartēšanas.

## Arhitektūra

```
Solis N (asistents ģenerē):
  → atbilde satur reasoning_content + tool_calls
  → ja requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      ieraksta (atmiņā + DB), izmantojot katru tool_call.id kā atslēgu
  → pārsūta atbildi klientam (kurš spriešanas saturu var saglabāt vai nesaglabāt)

Solis N+1 (klients nosūta nākamo pieprasījumu):
  → tulkotājs konstatē: requiresReasoningReplay(provider, model) === true
  → katram asistenta ziņojumam ar tool_calls un bez reasoning_content:
      lookupReasoning(toolCalls[0].id) → atmiņa → DB
      atrasts  → msg.reasoning_content = cached; recordReplay()
      nav atrasts → msg.reasoning_content = "" (mantotā atkāpšanās vecākām DeepSeek versijām)
  → augšupējais pakalpojums redz konsekventu vēsturi → nav 400 kļūdas
```

Tveršana notiek failā `open-sse/handlers/chatCore.ts` (divās vietās, abās `cacheReasoningFromAssistantMessage` izsaukuma vietās). Atkārtotā izmantošana notiek failā `open-sse/translator/index.ts` pēc shēmas piespiedu pārveidošanas, bet pirms nosūtīšanas.

## Glabāšana — hibrīda atmiņa + SQLite

Aktīvais ceļš izmanto atmiņā esošu `Map` (LRU pēc izveides laika), kuru dublē SQLite tabula avāriju atkopšanai un informācijas paneļa redzamībai.

| Slānis | Realizācija                                       | Mērķis                                                        |
| ------ | ------------------------------------------------- | ------------------------------------------------------------- |
| Atmiņa | `Map` failā `open-sse/services/reasoningCache.ts` | Ātra meklēšana; vecākie ieraksti tiek izņemti, sasniedzot 200 |
| DB     | Tabula `reasoning_cache` (`src/lib/db/`)          | Saglabājas pēc restartēšanas un nodrošina statistiku          |

Ieraksti tiek veikti abos slāņos. Lasīšana vispirms pārbauda atmiņu un pēc tam izmanto DB kā rezerves avotu (DB atrastie ieraksti tiek atkārtoti ievietoti atmiņā). DB kļūmes nav fatālas — atmiņā esošā kešatmiņa turpina apkalpot aktīvo ceļu.

**Noklusējuma vērtības:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimālais ierakstu skaits atmiņā: `200` (`MAX_MEMORY_ENTRIES`)
- Izņemšana: vispirms vecākais `createdAt`

## Datubāzes shēma

Migrācija: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` tiek glabāts kā Unix laikmeta sekunžu vērtība; SELECT slānis normalizē mantotās teksta vērtības, izmantojot `EXPIRES_AT_EPOCH_SQL`.

## Nodrošinātāja / modeļa noteikšana

Atkārtota atskaņošana ir iespējota, ja `requiresReasoningReplay(provider, model)` atgriež `true`. Funkcija pārbauda divus sarakstus failā `open-sse/services/reasoningCache.ts`.

**Nodrošinātāju ID (precīza atbilstība, reģistrnejutīga):**

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

**Modeļu regulāro izteiksmju paraugi (reģistrnejutīgi):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` un `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, neobligāts sufikss `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Lai pievienotu jaunu stingro nodrošinātāju/modeli, tas jāpievieno vienam no šiem sarakstiem un jāuzraksta vienībtests, kas pārbauda atkārtotas atskaņošanas ievietošanu. PR aprakstā jānorāda precīza augšupstraumes 400 kļūdas virkne, kas pamatoja izmaiņas.

## REST API

Kešatmiņa nodrošina divus galapunktus failā `src/app/api/cache/reasoning/route.ts`. Abiem ir nepieciešama pārvaldības autentifikācija (`isAuthenticated` no `@/shared/utils/apiAuth`).

| Metode | Galapunkts                                                | Apraksts                                                         |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistika + lapota ierakstu izvade                              |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrēts saraksts (`limit` ierobežots diapazonā `[1, 200]`)      |
| DELETE | `/api/cache/reasoning`                                    | Notīrīt visu (atmiņu + DB) un atiestatīt trāpījumu/kļūdu skaitus |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Notīrīt tikai viena nodrošinātāja ierakstus                      |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Dzēst vienu ierakstu                                             |

**GET atbildes struktūra:**

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

## Ekspluatācijas piezīmes

- **Tīrīšana:** `cleanupReasoningCache()` iztīra atmiņas ierakstus, kuriem beidzies derīguma termiņš, un izpilda `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Veselības pārbaužu darbinieki to periodiski izsauc.
- **Atkopšana pēc avārijas:** pēc restartēšanas atmiņa ir tukša, taču DB joprojām glabā ierakstus, kuriem nav beidzies derīguma termiņš. Pirmais konkrētā `tool_call_id` uzmeklējums ir DB trāpījums; turpmākie uzmeklējumi ir atmiņas trāpījumi.
- **Nav spriešanas, nav kešatmiņas:** `cacheReasoningFromAssistantMessage` atgriež `0`, ja asistenta ziņojumā nav lauka `reasoning_content` / `reasoning`, tādēļ atbildes bez spriešanas neko nemaksā.
- **Arī rakstīšana ir nosacīta:** abas izsaukuma vietas failā `chatCore.ts` (bez straumēšanas un ar straumēšanu) izsauc `cacheReasoningFromAssistantMessage()` tikai tad, ja `requiresReasoningReplay(provider, model)` ir `true` — tas ir tas pats predikāts, ko pārbauda lasīšanas puse. Instalācijām, kas nekad neizmanto atkārtotas atskaņošanas nodrošinātāju, vairs nav jāmaksā par rakstīšanu, indeksa atjaunināšanu un try/catch katrai atbildei, kas satur spriešanu.
- **Nestingrie nodrošinātāji:** ja `requiresReasoningReplay` ir `false` un mērķa formāts ir OpenAI, tulkotājs **noņem** jebkuru `reasoning_content` lauku no izejošajiem ziņojumiem — OpenAI Chat Completions to nepieņem.

## Skatiet arī

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ķēdes pārtraucēji, nogaidīšanas periodi, modeļu bloķēšana
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — augšupstraumes 400 kļūdu diagnostika
- Avota kods: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrācija: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API maršruts: `src/app/api/cache/reasoning/route.ts`
- Sākotnējā problēma: #1628
