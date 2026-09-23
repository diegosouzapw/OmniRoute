# Reasoning Replay Cache (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Quelle der Wahrheit:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40

OmniRoute erfasst von Modellen im Denkmodus erzeugte `reasoning_content` und spielt diese bei Anfragen mit mehreren Dialogrunden transparent wieder ein, wenn der Upstream-Anbieter dies erfordert. Dadurch werden HTTP-400-Fehler vermieden, die strikte Anbieter auslösen, wenn im Konversationsverlauf eines Clients die Begründung der vorherigen Dialogrunde fehlt.

## Warum dies erforderlich ist

Mehrere Anbieter mit Denkmodus lehnen eine nachfolgende Dialogrunde ab, sofern die **vorherige Assistentennachricht nicht das ursprüngliche `reasoning_content` enthält**. Der Upstream antwortet mit dem Statuscode 400 und Meldungen wie:

```
Ungültiger Parameter: reasoning_content muss im Denkmodus erneut an die API übergeben werden.
```

Typische Clients (Cursor, Cline, Roo Code, OpenAI SDK) entfernen jedoch `reasoning_content` aus dem von ihnen erneut übertragenen Verlauf. OmniRoute stellt es aus einem serverseitigen Cache wieder her, sodass die für den Upstream sichtbare Anfrage konsistent ist. Issue #1628 führte die hybride Speicher-/SQLite-Persistenz ein, damit der Cache Prozessneustarts übersteht.

## Architektur

```
Runde N (Assistent generiert):
  → Antwort enthält reasoning_content + tool_calls
  → wenn requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      schreibt (Arbeitsspeicher + DB), indiziert über jede tool_call.id
  → Antwort an den Client weiterleiten (der die Reasoning-Daten möglicherweise speichert oder auch nicht)

Runde N+1 (Client sendet Folgeanfrage):
  → Übersetzer erkennt: requiresReasoningReplay(provider, model) === true
  → für jede Assistentennachricht mit tool_calls und ohne reasoning_content:
      lookupReasoning(toolCalls[0].id) → Arbeitsspeicher → DB
      Treffer  → msg.reasoning_content = cached; recordReplay()
      kein Treffer → msg.reasoning_content = "" (Legacy-Fallback für ältere DeepSeek-Versionen)
  → Upstream erhält einen konsistenten Verlauf → kein 400
```

Die Erfassung erfolgt in `open-sse/handlers/chatCore.ts` (an zwei Stellen, nämlich den beiden Aufrufstellen von `cacheReasoningFromAssistantMessage`). Die Wiedergabe erfolgt in `open-sse/translator/index.ts` nach der Schema-Koersion, aber vor der Weiterleitung.

Gewöhnliche Assistentenrunden (ohne Tool-Aufruf) werden anders indiziert: `buildAssistantMessageCacheKey()` bildet einen Digest aus dem Sitzungskontext und dem normalisierten Transkript im OpenAI-Format bis zu dieser Runde, da DeepSeek das Reasoning _jeder_ vorherigen Runde benötigt, sobald `tools` vorhanden ist. Bei Responses-API-Zielen (zum Beispiel `opencode-go/deepseek-v4-flash`, weitergeleitet an `/responses`) enthält der Upstream-Body `input` statt `messages`. Daher meldet `translateRequest()` (`open-sse/translator/index.ts`) das von ihm verarbeitete Pivot-Transkript über eine Callback-Option, und die Erfassungsstellen bilden einen Digest desselben Transkripts. Der Responses-Wiedergabedurchlauf erfolgt für jedes Quellformat auf dem OpenAI-Pivot, sodass auch Anthropic-Messages-Clients (Claude → OpenAI → Responses) wiedergegeben werden.

## Speicherung — Hybrider Arbeitsspeicher + SQLite

Der häufig verwendete Pfad nutzt eine speicherinterne `Map` (LRU nach Erstellungszeit), die durch eine SQLite-Tabelle zur Wiederherstellung nach Abstürzen und für die Sichtbarkeit im Dashboard ergänzt wird.

| Ebene           | Implementierung                                | Zweck                                                      |
| --------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| Arbeitsspeicher | `Map` in `open-sse/services/reasoningCache.ts` | Schnelle Suchvorgänge, entfernt älteste ab 200             |
| DB              | Tabelle `reasoning_cache` (`src/lib/db/`)      | Bleibt über Neustarts hinweg erhalten, liefert Statistiken |

Schreibvorgänge erfolgen in beide Ebenen. Lesevorgänge prüfen zuerst den Arbeitsspeicher und greifen anschließend ersatzweise auf die DB zurück (DB-Treffer werden wieder in den Arbeitsspeicher übernommen). DB-Fehler sind nicht schwerwiegend — der speicherinterne Cache bedient weiterhin den häufig verwendeten Pfad.

**Standardwerte:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maximale Anzahl von Arbeitsspeichereinträgen: `200` (`MAX_MEMORY_ENTRIES`)
- Verdrängung: ältester `createdAt`-Wert zuerst

## Datenbankschema

Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indizes: `expires_at`, `provider`, `model`, `created_at`. `expires_at` wird als Unix-Epochenzeit in Sekunden gespeichert; die SELECT-Schicht normalisiert ältere Textwerte über `EXPIRES_AT_EPOCH_SQL`.

## Provider-/Modellerkennung

Replay wird aktiviert, wenn `requiresReasoningReplay(provider, model)` den Wert `true` zurückgibt. Die Funktion prüft zwei Listen in `open-sse/services/reasoningCache.ts`.

**Provider-IDs (exakte Übereinstimmung, Groß-/Kleinschreibung wird ignoriert):**

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

**Modell-RegEx-Muster (Groß-/Kleinschreibung wird ignoriert):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` und `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, optionales Suffix `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Um einen neuen strikt behandelten Provider oder ein neues strikt behandeltes Modell hinzuzufügen, muss die entsprechende Liste erweitert und ein Unit-Test geschrieben werden, der die Replay-Injektion überprüft. In der PR-Beschreibung sollte die exakte vorgelagerte 400-Fehlermeldung angegeben werden, die die Änderung erforderlich gemacht hat.

## REST-API

Der Cache stellt unter `src/app/api/cache/reasoning/route.ts` zwei Endpunkte bereit. Beide erfordern eine Management-Authentifizierung (`isAuthenticated` aus `@/shared/utils/apiAuth`).

| Methode | Endpunkt                                                  | Beschreibung                                                                      |
| ------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | Statistiken + paginierte Einträge                                                 |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Gefilterte Auflistung (`limit` wird auf den Bereich `[1, 200]` begrenzt)          |
| DELETE  | `/api/cache/reasoning`                                    | Alles löschen (Arbeitsspeicher + DB) und Treffer-/Fehlversuchszähler zurücksetzen |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Nur Einträge eines Providers löschen                                              |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Einen einzelnen Eintrag löschen                                                   |

**Struktur der GET-Antwort:**

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

## Betriebshinweise

- **Bereinigung:** `cleanupReasoningCache()` entfernt abgelaufene Arbeitsspeichereinträge und führt `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` aus. Health-Check-Worker rufen diese Funktion regelmäßig auf.
- **Wiederherstellung nach einem Absturz:** Nach einem Neustart ist der Arbeitsspeicher leer, aber die DB enthält weiterhin nicht abgelaufene Einträge. Die erste Suche nach einer bestimmten `tool_call_id` ist ein DB-Treffer; nachfolgende Suchen sind Arbeitsspeichertreffer.
- **Kein Reasoning, kein Cache:** `cacheReasoningFromAssistantMessage` gibt `0` zurück, wenn die Assistant-Nachricht kein Feld `reasoning_content` / `reasoning` enthält, sodass Antworten ohne Denkprozess keine Kosten verursachen.
- **Auch Schreibvorgänge sind eingeschränkt:** Beide Aufrufstellen in `chatCore.ts` (nicht streamend und streamend) rufen `cacheReasoningFromAssistantMessage()` nur auf, wenn `requiresReasoningReplay(provider, model)` den Wert `true` ergibt — also dasselbe Prädikat, das auch die Leseseite prüft. Installationen, die nie einen Replay-Provider verwenden, verursachen dadurch weder Kosten für den Schreibvorgang oder die Indexaktualisierung noch für `try`/`catch` bei jeder Antwort mit Reasoning-Inhalt.
- **Nicht strikt behandelte Provider:** Wenn `requiresReasoningReplay` den Wert `false` ergibt und das Zielformat OpenAI ist, **entfernt** der Übersetzer jedes Feld `reasoning_content` aus ausgehenden Nachrichten — OpenAI Chat Completions akzeptiert dieses Feld nicht.

## Siehe auch

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — Leistungsschalter, Abklingzeiten, Modellsperren
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — Diagnose vorgelagerter 400-Fehler
- Quellcode: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API-Route: `src/app/api/cache/reasoning/route.ts`
- Ursprüngliches Issue: #1628
