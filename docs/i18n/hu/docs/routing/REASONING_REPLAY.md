# Reasoning Replay Cache (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Hiteles forrás:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Legutóbb frissítve:** 2026-06-28 — v3.8.40

Az OmniRoute rögzíti a gondolkodási módot használó modellek által előállított asszisztensi `reasoning_content` tartalmát, és többfordulós kérések esetén transzparens módon újrajátssza azt, amikor a felsőbb szintű szolgáltató ezt megköveteli. Ez kiküszöböli azokat a HTTP 400 hibákat, amelyeket a szigorú szolgáltatók akkor adnak vissza, ha az ügyfél beszélgetési előzményeiből hiányzik az előző forduló érvelési tartalma.

## Miért van erre szükség?

Több gondolkodási módot használó szolgáltató elutasítja a következő fordulót, ha az **előző asszisztensi üzenet nem tartalmazza az eredeti `reasoning_content` tartalmat**. A felsőbb szintű szolgáltató ilyenkor az alábbihoz hasonló üzenettel küld 400-as hibát:

```
Helytelen paraméter: Gondolkodási módban a reasoning_content tartalmát vissza kell küldeni az API-nak.
```

A tipikus kliensek (Cursor, Cline, Roo Code, OpenAI SDK) azonban eltávolítják a `reasoning_content` tartalmát az általuk újrajátszott előzményekből. Az OmniRoute visszaállítja azt egy szerveroldali gyorsítótárból, így a felsőbb szintű szolgáltató által látott kérés konzisztens marad. A #1628 számú probléma vezette be a hibrid memória-/SQLite-alapú perzisztenciát, hogy a gyorsítótár a folyamat újraindítása után is megmaradjon.

## Architektúra

```
N. kör (asszisztens generál):
  → a válasz tartalmazza: reasoning_content + tool_calls
  → ha requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      írás (memória + DB), minden tool_call.id kulccsal
  → válasz továbbítása a kliensnek (amely megtarthatja vagy eldobhatja a gondolatmenetet)

N+1. kör (kliens küldi a folytatást):
  → a fordító észleli: requiresReasoningReplay(provider, model) === true
  → minden olyan asszisztens üzenethez, amelyben vannak tool_calls, de nincs reasoning_content:
      lookupReasoning(toolCalls[0].id) → memória → DB
      találat → msg.reasoning_content = gyorsítótárazott; recordReplay()
      nincs találat → msg.reasoning_content = "" (örökölt tartalék régebbi DeepSeek verziókhoz)
  → az upstream konzisztens előzményeket lát → nincs 400-as hiba
```

A rögzítés az `open-sse/handlers/chatCore.ts` fájlban történik (két helyen, a két `cacheReasoningFromAssistantMessage` hívási pontnál). A visszajátszás az `open-sse/translator/index.ts` fájlban történik, a séma kényszerítése után, de a továbbítás előtt.

Az egyszerű (nem tool-call) asszisztens körök kulcsozása eltérő: a `buildAssistantMessageCacheKey()` a munkamenet hatókörét és az adott körig terjedő, normalizált OpenAI-formátumú átiratot dolgozza fel, mivel a DeepSeek minden korábbi kör gondolatmenetét igényli, amint a `tools` jelen van. A Responses-API célpontok esetében (például `opencode-go/deepseek-v4-flash`, a `/responses` útvonalra irányítva) az upstream törzs `input`-ot tartalmaz, nem `messages`-t, ezért a `translateRequest()` (`open-sse/translator/index.ts`) jelenti a feldolgozott pivot átiratot egy visszahívási opción keresztül, a rögzítési pontok pedig ugyanazt az átiratot dolgozzák fel. A Responses visszajátszási menet minden forrásformátum esetén az OpenAI pivoton fut, így az Anthropic Messages kliensek (Claude → OpenAI → Responses) szintén visszajátszásra kerülnek.

## Tárolás — hibrid memória + SQLite

A gyakran használt útvonal egy memóriabeli `Map` struktúrát használ (létrehozási idő szerinti LRU), amelyet egy SQLite-tábla támogat az összeomlás utáni helyreállítás és az irányítópulton való megjelenítés érdekében.

| Réteg   | Megvalósítás                                           | Cél                                                                       |
| ------- | ------------------------------------------------------ | ------------------------------------------------------------------------- |
| Memória | `Map` az `open-sse/services/reasoningCache.ts` fájlban | Gyors keresések, 200 elemnél eltávolítja a legrégebbit                    |
| DB      | `reasoning_cache` tábla (`src/lib/db/`)                | Újraindítások között is megőrzi az adatokat, és statisztikákat szolgáltat |

Az írás mindkét rétegbe megtörténik. Az olvasás először a memóriát vizsgálja, majd sikertelen keresés esetén a DB-t használja (a DB-találatok visszakerülnek a memóriába). A DB-hibák nem végzetesek — a memóriabeli gyorsítótár továbbra is kiszolgálja a gyakran használt útvonalat.

**Alapértelmezések:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Memóriabejegyzések maximális száma: `200` (`MAX_MEMORY_ENTRIES`)
- Kiürítés: először a legrégebbi `createdAt` értékű bejegyzés

## Adatbázis séma

Migráció: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Indexek: `expires_at`, `provider`, `model`, `created_at`. Az `expires_at` Unix epoch másodpercként van tárolva; a SELECT réteg normalizálja az örökölt szöveges értékeket az `EXPIRES_AT_EPOCH_SQL` segítségével.

## Szolgáltató-/modellészlelés

A visszajátszás akkor engedélyezett, ha a `requiresReasoningReplay(provider, model)` értéke `true`. A függvény két listát ellenőriz az `open-sse/services/reasoningCache.ts` fájlban.

**Szolgáltatóazonosítók (pontos, kis- és nagybetűket figyelmen kívül hagyó egyezés):**

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

**Modell-reguláriskifejezés-minták (kis- és nagybetűket figyelmen kívül hagyva):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` és `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opcionális `-free` utótaggal)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Új szigorú szolgáltató/modell hozzáadásához ki kell egészíteni e listák egyikét, és olyan egységtesztet kell írni, amely ellenőrzi a visszajátszás beillesztését. A PR leírásában szerepelnie kell a módosítást indokoló, felsőbb rétegből származó pontos 400-as hibaüzenetnek.

## REST API

A gyorsítótár két végpontot tesz elérhetővé az `src/app/api/cache/reasoning/route.ts` alatt. Mindkettő kezelői hitelesítést igényel (az `@/shared/utils/apiAuth` modulból származó `isAuthenticated` használatával).

| Metódus | Végpont                                                   | Leírás                                                                     |
| ------- | --------------------------------------------------------- | -------------------------------------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | Statisztikák + lapozott bejegyzések                                        |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Szűrt lista (a `limit` az `[1, 200]` tartományra van korlátozva)           |
| DELETE  | `/api/cache/reasoning`                                    | Minden törlése (memória + DB), valamint a találati/hibaszámlálók nullázása |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Csak egy szolgáltató bejegyzéseinek törlése                                |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Egyetlen bejegyzés törlése                                                 |

**A GET-válasz szerkezete:**

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

## Üzemeltetési megjegyzések

- **Tisztítás:** A `cleanupReasoningCache()` eltávolítja a lejárt memóriabejegyzéseket, és végrehajtja a `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` utasítást. Az állapotellenőrző feldolgozók ezt rendszeresen meghívják.
- **Összeomlás utáni helyreállítás:** Újraindítás után a memória üres, a DB azonban továbbra is tartalmazza a még le nem járt bejegyzéseket. Egy adott `tool_call_id` első keresése DB-találat; a további keresések memóriatalálatok.
- **Nincs érvelés, nincs gyorsítótárazás:** A `cacheReasoningFromAssistantMessage` `0` értéket ad vissza, ha az asszisztensi üzenet nem tartalmaz `reasoning_content` / `reasoning` mezőt, így a nem gondolkodó válaszoknak nincs többletköltségük.
- **Az írás is feltételhez kötött:** A `chatCore.ts` mindkét hívási helye (nem streamelt és streamelt) csak akkor hívja meg a `cacheReasoningFromAssistantMessage()` függvényt, ha a `requiresReasoningReplay(provider, model)` értéke `true` — ugyanazt a predikátumot használva, amelyet az olvasási oldal is ellenőriz. Azoknál a telepítéseknél, amelyek soha nem használnak visszajátszást igénylő szolgáltatót, megszűnik az írás, az indexfrissítés és a try/catch költsége minden érvelést tartalmazó válasznál.
- **Nem szigorú szolgáltatók:** Ha a `requiresReasoningReplay` értéke `false`, és a célformátum OpenAI, a fordító **eltávolítja** a `reasoning_content` mezőt a kimenő üzenetekből — az OpenAI Chat Completions nem fogadja el azt.

## Lásd még

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — megszakítók, várakozási idők, modellzárolások
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — a felsőbb rétegből érkező 400-as hibák diagnosztizálása
- Forrás: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migráció: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API-útvonal: `src/app/api/cache/reasoning/route.ts`
- Eredeti hibajegy: #1628
