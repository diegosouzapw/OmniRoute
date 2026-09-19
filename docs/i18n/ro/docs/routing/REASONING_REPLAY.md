# Reasoning Replay Cache (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sursa adevărului:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute capturează `reasoning_content` al asistentului, produs de modelele care folosesc modul de gândire, și îl redă în mod transparent în solicitările cu mai multe ture atunci când furnizorul din amonte îl impune. Astfel sunt eliminate erorile HTTP 400 pe care furnizorii stricți le returnează atunci când istoricul conversației unui client nu conține raționamentul din tura anterioară.

## De ce există această funcționalitate

Mai mulți furnizori care folosesc modul de gândire resping o tură ulterioară dacă **mesajul anterior al asistentului nu include valoarea `reasoning_content` originală**. Serviciul din amonte returnează o eroare 400 cu mesaje precum:

```
Parametru incorect: reasoning_content din modul de gândire trebuie retransmis către API.
```

Însă clienții obișnuiți (Cursor, Cline, Roo Code, OpenAI SDK) elimină `reasoning_content` din istoricul pe care îl retrimit. OmniRoute îl restaurează dintr-un cache de pe server, astfel încât solicitarea văzută de serviciul din amonte să fie consecventă. Problema #1628 a introdus persistența hibridă în memorie/SQLite, astfel încât conținutul cache-ului să supraviețuiască repornirilor procesului.

## Arhitectură

```
Tura N (asistentul generează):
  → răspunsul conține reasoning_content + tool_calls
  → dacă requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      scrie (în memorie + DB), folosind fiecare tool_call.id drept cheie
  → transmite răspunsul clientului (care poate păstra sau nu raționamentul)

Tura N+1 (clientul trimite o solicitare ulterioară):
  → translatorul detectează: requiresReasoningReplay(provider, model) === true
  → pentru fiecare mesaj al asistentului cu tool_calls și fără reasoning_content:
      lookupReasoning(toolCalls[0].id) → memorie → DB
      găsit   → msg.reasoning_content = cached; recordReplay()
      negăsit → msg.reasoning_content = "" (variantă de rezervă moștenită pentru versiunile DeepSeek mai vechi)
  → serviciul din amonte vede un istoric consecvent → nicio eroare 400
```

Capturarea are loc în `open-sse/handlers/chatCore.ts` (în două locuri, la cele două apeluri `cacheReasoningFromAssistantMessage`). Redarea are loc în `open-sse/translator/index.ts`, după conversia schemei, dar înainte de expediere.

## Stocare — memorie hibridă + SQLite

Calea critică utilizează un `Map` în memorie (LRU după momentul creării), susținut de un tabel SQLite pentru recuperarea după blocări și vizibilitatea în panoul de control.

| Strat   | Implementare                                   | Scop                                             |
| ------- | ---------------------------------------------- | ------------------------------------------------ |
| Memorie | `Map` în `open-sse/services/reasoningCache.ts` | Căutări rapide, elimină cele mai vechi la 200    |
| DB      | Tabelul `reasoning_cache` (`src/lib/db/`)      | Persistă după reporniri, furnizează statisticile |

Scrierile sunt efectuate în ambele straturi. Citirile verifică mai întâi memoria, apoi apelează la DB dacă nu găsesc rezultatul (rezultatele găsite în DB sunt promovate înapoi în memorie). Erorile DB nu sunt fatale — cache-ul din memorie continuă să deservească calea critică.

**Valori implicite:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Număr maxim de intrări în memorie: `200` (`MAX_MEMORY_ENTRIES`)
- Eliminare: mai întâi cea mai veche valoare `createdAt`

## Schema bazei de date

Migrare: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indecși: `expires_at`, `provider`, `model`, `created_at`. `expires_at` este stocat ca număr de secunde Unix epoch; stratul SELECT normalizează valorile text moștenite prin `EXPIRES_AT_EPOCH_SQL`.

## Detectarea furnizorului / modelului

Reluarea este activată atunci când `requiresReasoningReplay(provider, model)` returnează `true`. Funcția verifică două liste din `open-sse/services/reasoningCache.ts`.

**ID-uri de furnizor (potrivire exactă, fără a ține cont de majuscule și minuscule):**

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

**Expresii regulate pentru modele (fără a ține cont de majuscule și minuscule):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` și `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, cu sufixul opțional `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Adăugarea unui nou furnizor/model strict presupune adăugarea acestuia la una dintre aceste liste și scrierea unui test unitar care confirmă injectarea reluării. Descrierea PR-ului trebuie să citeze exact mesajul 400 din amonte care a motivat modificarea.

## API REST

Cache-ul expune două endpoint-uri în `src/app/api/cache/reasoning/route.ts`. Ambele necesită autentificare de administrare (`isAuthenticated` din `@/shared/utils/apiAuth`).

| Metodă | Endpoint                                                  | Descriere                                                              |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistici + intrări paginate                                          |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Listare filtrată (`limit` este limitat la intervalul `[1, 200]`)       |
| DELETE | `/api/cache/reasoning`                                    | Șterge totul (memorie + BD) și resetează contoarele de reușite/eșecuri |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Șterge doar intrările pentru un singur furnizor                        |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Șterge o singură intrare                                               |

**Structura răspunsului GET:**

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

## Note operaționale

- **Curățare:** `cleanupReasoningCache()` elimină intrările expirate din memorie și execută `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Procesele de verificare a stării apelează periodic această funcție.
- **Recuperare după o oprire neașteptată:** După o repornire, memoria este goală, dar BD păstrează în continuare intrările neexpirate. Prima căutare pentru un anumit `tool_call_id` găsește rezultatul în BD; căutările ulterioare îl găsesc în memorie.
- **Fără raționament, fără cache:** `cacheReasoningFromAssistantMessage` returnează `0` atunci când mesajul asistentului nu are niciun câmp `reasoning_content` / `reasoning`, astfel încât răspunsurile fără raționament nu implică niciun cost.
- **Și scrierea este condiționată:** ambele puncte de apel din `chatCore.ts` (fără streaming și cu streaming) apelează `cacheReasoningFromAssistantMessage()` numai atunci când `requiresReasoningReplay(provider, model)` este `true` — același predicat verificat și de partea de citire. Instalările care nu utilizează niciodată un furnizor cu reluare nu mai suportă costul scrierii, al actualizării indexului și al blocului try/catch pentru fiecare răspuns care conține raționament.
- **Furnizori non-stricți:** Atunci când `requiresReasoningReplay` este `false`, iar formatul țintă este OpenAI, translatorul **elimină** orice câmp `reasoning_content` din mesajele trimise — OpenAI Chat Completions nu îl acceptă.

## Consultați și

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — întrerupătoare de circuit, perioade de așteptare, blocarea modelelor
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosticarea erorilor 400 din amonte
- Sursă: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrare: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Rută API: `src/app/api/cache/reasoning/route.ts`
- Problemă originală: #1628
