# Memory System (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Verbindliche Quelle:** `src/lib/memory/` und `src/app/api/memory/`
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40 (standardmäßig deaktiviert + Nachholung der int8-Quantisierung)

OmniRoute bietet einen dauerhaften Konversationsspeicher, der nach API-Schlüssel
(und optional nach Sitzungs-ID) getrennt ist. Erinnerungen werden mittels
leichtgewichtiger Regex-Mustererkennung automatisch aus LLM-Antworten extrahiert
und als vorangestellte Systemnachricht wieder in nachfolgende Anfragen eingefügt
(oder als erste Benutzernachricht bei Anbietern, die die Systemrolle ablehnen).

> **Der Speicher ist standardmäßig DEAKTIVIERT (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> ist jetzt `false` (`src/lib/memory/settings.ts`). Durch Aktivieren des Speichers
> werden bis zu `maxTokens` (~2k) an abgerufenem Kontext in **jede** Chat-Anfrage
> eingefügt, was abgerechnet wird — unerwartete Kosten für neue Installationen und
> für Clients, die ihren eigenen Kontext verwalten. Aktivieren Sie die Funktion
> explizit unter **Einstellungen → Speicher** (der `MemorySkillsTab` zeigt bei
> aktiviertem Speicher einen Warnhinweis zu Token-Kosten an). Ein Client kann den
> Speicher für eine einzelne Anfrage über den Anfrage-Header
> `x-omniroute-no-memory` (`true`/`1`/`yes`) deaktivieren — siehe die
> Anfrage-Header-Tabelle in [API_REFERENCE.md](../reference/API_REFERENCE.md).
> Eine Anfrage ohne Speicher setzt `memoryOwnerId = null`, wodurch für diese
> Anfrage **sowohl** die Speicher- als auch die Skill-Injektion deaktiviert wird
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

Der Speicher ist **pro API-Schlüssel abgegrenzt**, nicht pro Benutzer — jede
Anfrage, die mit demselben API-Schlüssel authentifiziert wird, verwendet
denselben Speicherpool, mit optionaler weiterer Abgrenzung über `sessionId`.

## Architektur

```
Client → /v1/chat/completions (apiKeyInfo vorgelagert aufgelöst)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # extrahiert die ID
    → getMemorySettings()                     # zwischengespeicherte Einstellungen
    → shouldInjectMemory(body, {enabled})     # Zugriffsprüfung
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + optionaler Vektor
    → injectMemory(body, memories, provider)  # System- oder Benutzernachricht
  → Aufruf des vorgelagerten Anbieters
  → bei Antwort: extractFacts(text, apiKeyId, sessionId)  # nicht blockierend
    → setImmediate → createMemory(fact) pro Treffer
                   → embed(content) + upsertVector(id, vec)
```

Die Aufrufstellen für Injektion und Extraktion sind in
`open-sse/handlers/chatCore.ts` eingebunden (suchen Sie nach `retrieveMemories`,
`injectMemory` und `extractFacts`).

## Engine-Architektur (dreistufige Auflösung)

Die Memory Engine bestimmt den Abrufpfad zur Laufzeit anhand der verfügbaren
Infrastruktur und Einstellungen. Es gibt drei Stufen, die in der folgenden
Prioritätsreihenfolge angewendet werden:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  STUFE 0 — Schlüsselwort (FTS5)                              │
  │  Testbasierte Verfügbarkeit: FTS5, wenn der SQLite-Build     │
  │  es unterstützt (better-sqlite3 / node:sqlite / bun:sqlite);│
  │  nicht verfügbar bei Builds ohne FTS5 (z. B. sql.js/WASM —  │
  │  "no such module: fts5"). Wird bei strategy = "exact" oder  │
  │  als Rückfalloption verwendet; der Schlüsselwortstatus der  │
  │  Engine gibt das Testergebnis wieder.                       │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  STUFE 1 — Eingebetteter Vektor (sqlite-vec)                 │
  │  sqlite-vec v0.1.9 wird über db.loadExtension() geladen.     │
  │  KNN-Brute-Force-Suche über Float32-Vektoren. Aktiv, wenn:   │
  │   • sqlite-vec loadExtension erfolgreich ist                │
  │   • Eine Embedding-Quelle verfügbar ist (remote | static |  │
  │     transformers), die ein Float32Array erzeugen kann       │
  │   • die Tabelle vec_memories existiert (beim ersten ready() │
  │     erstellt)                                               │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  STUFE 2 — Qdrant (optionale externe Vektordatenbank)        │
  │  Wenn aktiviert, ersetzt Qdrant sqlite-vec für semantische/  │
  │  hybride Suchen. Erfordert eine laufende Qdrant-Instanz und │
  │  einen konfigurierten Host/Port.                            │
  └─────────────────────────────────────────────────────────────┘
```

Die Herabstufung erfolgt automatisch und transparent:

- Wenn sqlite-vec nicht geladen werden kann, ist Stufe 1 nicht verfügbar → es
  wird auf Stufe 0 zurückgefallen.
- Wenn die Embedding-Quelle einen Fehler zurückgibt, fällt Stufe 1 auf Stufe 0
  zurück.
- Wenn Qdrant nicht funktionsfähig ist, fällt Stufe 2 auf Stufe 1 zurück (oder
  auf Stufe 0, wenn auch Stufe 1 nicht verfügbar ist).

## Embedding-Quellen

Die Embedding-Schicht (`src/lib/memory/embedding/`) bestimmt anhand von
`MemorySettingsExtended.embeddingSource`, welche Quelle verwendet wird:

| Quelle         | Beschreibung                                                                        | Schlüssel erforderlich | Kaltstart        |
| -------------- | ----------------------------------------------------------------------------------- | ---------------------- | ---------------- |
| `remote`       | Verwendet die Embedding-API eines konfigurierten Anbieters (OpenAI, Cohere usw.)    | Ja                     | Keiner           |
| `static`       | Lokales Lookup-Tabellen-Embedding über `potion-base-8M` (WordPiece + Mean-Pooling)  | Nein                   | ~200ms           |
| `transformers` | Lokale ONNX-Inferenz über `@huggingface/transformers` v4, `all-MiniLM-L6-v2`        | Nein                   | ~3s + ~400MB RAM |
| `auto`         | Laufzeitauflösung: remote (wenn Schlüssel vorhanden) → static → transformers → null | Abhängig               | Abhängig         |

**Auflösungsreihenfolge für `auto`:**

1. Ersten Anbieter in `listEmbeddingProviders()` mit `hasKey === true` suchen → `remote`.
2. Wenn `settings.staticEnabled === true` → `static`.
3. Wenn `settings.transformersEnabled === true` → `transformers`.
4. Andernfalls → `null` (fällt auf die FTS5-Schlüsselwortsuche zurück).

Der Embedding-Cache (`src/lib/memory/embedding/cache.ts`) verwendet eine
In-Memory-LRU-Map mit Schlüsseln im Format `${source}:${model}:${dim}:${sha256(text)}`,
die auf `MEMORY_EMBEDDING_CACHE_MAX` Einträge (Standardwert 1000) begrenzt ist und
eine TTL von `MEMORY_EMBEDDING_CACHE_TTL_MS` (Standardwert 5 Min.) besitzt. Sie wird
während des Prozesslebenszyklus von allen Aufrufern gemeinsam genutzt.

## Hybrides RRF (k=60)

Wenn `strategy = "hybrid"` gilt und der Vektorspeicher verfügbar ist, verwendet
der Abruf Reciprocal Rank Fusion, um FTS5- und Vektorergebnisse zusammenzuführen:

```
RRF(d) = Σ  1 / (k + rank_i(d))      wobei k = 60 (konfigurierbar über MEMORY_RRF_K)
          i
```

Konkret:

1. FTS5-Suche ausführen → sortierte Liste `R_fts` (Position 1..N).
2. KNN-Vektorsuche ausführen → sortierte Liste `R_vec` (Position 1..M).
3. Für jede eindeutige `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0, wenn nicht in der Liste).
4. Nach `rrf_score` DESC sortieren und das Token-Budget schrittweise anwenden.

RRF ist dafür bekannt, auch ohne Normalisierung der Scores verschiedener
Abrufsysteme effektiv zu sein. Der Standardwert `k=60` stammt aus der
ursprünglichen Veröffentlichung von Cormack et al. und funktioniert gut für
kleine Korpora (<10k Erinnerungen).

## Nachträgliche Befüllung (verzögert + Neuindizierung)

Wenn sich das Embedding-Modell ändert (erkannt über `embedding_signature`), wird
der Vektorspeicher neu aufgebaut und alle vorhandenen Erinnerungen werden in
der Tabelle `memories` mit `needs_reindex = 1` markiert.

**Verzögerte nachträgliche Befüllung**: Beim nächsten Abruf werden alle
Erinnerungen ohne Vektoreintrag eingebettet und vor Ausführung der Suche in
`vec_memories` eingefügt. Dadurch werden die Kosten der nachträglichen Befüllung
auf tatsächliche Anfragen verteilt, ohne den Start zu blockieren.

**Explizite Neuindizierung**: Die Registerkarte „Engine“ unter
`/dashboard/memory` stellt eine Schaltfläche „Jetzt neu indizieren“ bereit, die
`POST /api/memory/reindex` aufruft. Der Handler ruft `runReindexBatch()` aus
`src/lib/memory/reindex.ts` auf, wodurch pro Anfrage bis zu `limit` ausstehende
Einträge verarbeitet werden. Der Fortschritt kann über
`GET /api/memory/engine-status` (`vectorStore.needsReindex`) abgefragt werden.

Die Tabelle `memory_vec_meta` (Migration `083_memory_vec.sql`) speichert:

- `active_dim` — aktuelle Vektordimension (null = noch nicht kalibriert).
- `embedding_signature` — `${source}:${model}:${dim}` zur Erkennung von Änderungen.
- `last_reset_at` — Zeitstempel der letzten vollständigen Zurücksetzung.
- `vec_loaded` — 0/1-Kennzeichen dafür, ob sqlite-vec erfolgreich geladen wurde.

## Einstellungserweiterung

Neun Einbettungs- und Vektorfelder sind in `MemorySettingsExtended` in
`src/shared/schemas/memory.ts` verfügbar und werden über `src/lib/db/settings.ts` persistiert:

| Feld                     | Typ                                                | Standard | Beschreibung                                                         |
| ------------------------ | -------------------------------------------------- | -------- | -------------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Zu verwendende Einbettungsquelle                                     |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Anbieter/Modell im Format `provider/model`                           |
| `customBaseUrl`          | `string \| null`                                   | `null`   | Nur für Memory verwendete, OpenAI-kompatible Basis-URL des Endpunkts |
| `customModelId`          | `string \| null`                                   | `null`   | An den benutzerdefinierten Endpunkt gesendete Modell-ID              |
| `transformersEnabled`    | `boolean`                                          | `false`  | Opt-in für Transformers.js (MiniLM, ~400MB)                          |
| `staticEnabled`          | `boolean`                                          | `false`  | Opt-in für das lokale statische Modell potion-base-8M                |
| `rerankEnabled`          | `boolean`                                          | `false`  | Reranking-Schritt aktivieren (zusätzlich +200-500ms/Anfrage)         |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Reranking-Anbieter/Modell im Format `provider/model`                 |

`rerankProviderModel` wird durch `POST /v1/rerank` aufgelöst (Aufruf über Loopback) und akzeptiert daher alles, was diese Route akzeptiert: ein kuratiertes Cloud-Reranking-Modell (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) oder einen OpenAI-kompatiblen Anbieterknoten als `<node-prefix>/<model>` (z. B. `skilled-mini/bge-reranker-v2-m3` für eine TEI/Infinity-Instanz). Loopback-Knoten sind immer zulässig; ein Knoten auf einem anderen Host (LAN, Tailscale) erfordert zusätzlich den Feature-Flag `RERANK_REMOTE_PROVIDER_NODES` und muss die Richtlinie für ausgehende Anbieter-URLs erfüllen — siehe [Feature-Flags](../reference/FEATURE_FLAGS.md). Der Dashboard-Selektor listet kuratierte Anbieter sowie lokale Knoten auf; jede gültige Zeichenfolge im Format `provider/model` kann direkt über `PUT /api/settings/memory` festgelegt werden.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Zu verwendendes Vektor-Backend |

Diese werden über `GET /PUT /api/settings/memory` bereitgestellt (Schema `MemorySettingsExtendedSchema`).

Für die Quelle `remote` akzeptiert Memory außerdem die optionalen Einstellungen `customBaseUrl` und
`customModelId`. Zusammen wählen sie einen OpenAI-kompatiblen `/embeddings`-Endpunkt
und ein Modell aus, ohne die globale Einbettungsregistrierung zu ändern. Der Endpunkt wird
vor der Verwendung normalisiert und anhand der Richtlinie für ausgehende Anbieter-URLs geprüft: HTTP(S) ist
erforderlich, eingebettete Anmeldedaten und Abfragezeichenfolgen werden abgelehnt und Cloud-Metadaten-
Adressen bleiben blockiert. Leere Werte behalten den ausgewählten Registrierungsanbieter bei. An
das Dashboard zurückgegebene Fehler werden bereinigt, und Endpunkt-Anmeldedaten werden niemals protokolliert.

> **TODO (D20):** Der Geltungsbereich `global` (Freigabe von Erinnerungen für alle API-Schlüssel) ist in
> dieser Version nicht implementiert. Er erfordert Schemaänderungen und einen globalen Abruf-
> pfad. Separat nachverfolgen.

## Speicherschichten

### Primär: SQLite (Tabelle `memories`)

Erstellt durch die Migration `015_create_memories.sql`:

| Spalte                      | Typ                | Hinweise                                                                             |
| --------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | Über `crypto.randomUUID()` generierte UUID                                           |
| `api_key_id`                | `TEXT NOT NULL`    | Zugehöriger API-Schlüssel                                                            |
| `session_id`                | `TEXT`             | Optionaler Gültigkeitsbereich pro Unterhaltung                                       |
| `type`                      | `TEXT NOT NULL`    | Einer von `factual`, `episodic`, `procedural`, `semantic`                            |
| `key`                       | `TEXT`             | Stabiler Upsert-Schlüssel, z. B. `preference:i_prefer_python`                        |
| `content`                   | `TEXT NOT NULL`    | Der eigentliche Faktentext                                                           |
| `metadata`                  | `TEXT`             | JSON-Blob (Kategorie, extractedAt, Quelle, ...)                                      |
| `created_at` / `updated_at` | `TEXT`             | ISO-8601-Zeichenfolgen                                                               |
| `expires_at`                | `TEXT`             | Optionales Ablaufdatum; `NULL` bedeutet dauerhaft                                    |
| `memory_id`                 | `INTEGER UNIQUE`   | Durch `023_fix_memory_fts_uuid.sql` hinzugefügt, um UUIDs ↔ FTS5-rowids zu verbinden |

Indizes: `api_key_id`, `session_id`, `type`, `expires_at` sowie der eindeutige
`memory_id`-Index.

**Upsert-Semantik**: `createMemory()` sucht nach einer vorhandenen Zeile mit demselben
`(api_key_id, key)` und aktualisiert sie direkt, wenn sie gefunden wird (wobei `metadata` mittels
flacher Verteilung zusammengeführt wird). Dadurch wächst die Tabelle bei wiederholten
Präferenzaussagen nicht unbegrenzt.

### Volltextsuche (virtuelle Tabelle `memory_fts`)

`022_add_memory_fts5.sql` erstellt eine virtuelle FTS5-Tabelle über `content` und
`key`. `023_fix_memory_fts_uuid.sql` behebt einen in der Praxis aufgetretenen Fehler, bei dem der UUID-
Primärschlüssel nicht mit der ganzzahligen rowid von FTS5 verknüpft werden konnte — die Migration fügt die
Spalte `memory_id` hinzu, erstellt die FTS-Tabelle neu und richtet Trigger
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) ein, die FTS bei
INSERT, DELETE und UPDATE synchron halten.

Wird von `retrieval.ts` für die Strategien `semantic` und `hybrid` verwendet (siehe unten).
Der Abrufcode prüft mit `hasTable("memory_fts")` und fällt auf die
chronologische Reihenfolge zurück, wenn die FTS-Tabelle fehlt oder die FTS-Abfrage einen Fehler auslöst.

### Optional: Qdrant (Vektorspeicher der Stufe 2)

`src/lib/memory/qdrant.ts` implementiert eine optionale Qdrant-Integration als Vektorspeicher
der Stufe 2. Der Abruf wird nur dann an Qdrant weitergeleitet, wenn der Engine-Selektor
`memoryVectorStore === "qdrant"` ist — der Standardwert `"auto"` (und `"sqlite-vec"`)
wählt Qdrant **niemals** aus. Der Umschalter auf der Registerkarte „Engine“ setzt **sowohl** `qdrantEnabled` als auch
`memoryVectorStore` gemeinsam: Durch Aktivieren wird Qdrant zum primären Speicher, durch Deaktivieren
wird auf `"auto"` zurückgesetzt (#5597 — vor dieser Korrektur hatte das Aktivieren keine Wirkung, da nichts
den Engine-Selektor setzte). Wenn Qdrant nicht erreichbar ist oder nichts zurückgibt, fällt der Abruf
auf sqlite-vec → FTS5 zurück.

- `upsertSemanticMemoryPoint()` — bettet `key + content` mit dem konfigurierten
  Embedding-Modell ein, stellt sicher, dass die Collection vorhanden ist (erstellt
  bei der ersten Verwendung Vektoren mit Kosinusdistanz), und fügt einen Punkt mit
  der Payload `{memoryId, apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`
  ein oder aktualisiert ihn.
- `searchSemanticMemory(query, topK, scope)` — bettet die Abfrage ein, durchsucht
  die Collection, gefiltert nach `kind = "omniroute_memory"` und optional nach
  `apiKeyId` / `sessionId`. Begrenzt `topK` auf `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — löscht einen einzelnen Punkt. Wird von
  `deleteMemory()` aufgerufen, nachdem die SQLite-Zeile entfernt wurde (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — löscht gesammelt Punkte, deren
  `expiresAtUnix` in der Vergangenheit liegt oder deren `createdAtUnix` älter als
  der Aufbewahrungsgrenzwert ist. Zählt sie zuerst, damit das Dashboard die
  tatsächlichen Zahlen anzeigen kann.
- `checkQdrantHealth()` — Zustandsprüfung über `GET /readyz` einschließlich Latenz.

Die Einstellungsoberfläche stellt die Qdrant-Konfiguration, Zustandsprüfung,
einen Test der semantischen Suche und die Bereinigung im **Engine-Tab** von
`/dashboard/memory` bereit. Die entsprechenden Routen unter
`src/app/api/settings/qdrant/` sind seit v3.8.6 vollständig angebunden:

| Route                                   | Methode       | Beschreibung                             |
| --------------------------------------- | ------------- | ---------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant-Einstellungen lesen/aktualisieren |
| `/api/settings/qdrant/health`           | `GET`         | Verfügbarkeitsprüfung + Latenz           |
| `/api/settings/qdrant/search`           | `POST`        | Test der semantischen Suche              |
| `/api/settings/qdrant/cleanup`          | `POST`        | Abgelaufene/alte Punkte entfernen        |
| `/api/settings/qdrant/embedding-models` | `GET`         | Verfügbare Embedding-Modelle auflisten   |

**Hinweise zum Verhalten (was zu erwarten ist):**

- **Engine-Auswahl** — wenn Qdrant im Engine-Tab aktiviert wird, wird es zum
  primären Speicher (setzt `memoryVectorStore="qdrant"`); beim Deaktivieren wird
  die Einstellung auf `"auto"` zurückgesetzt (#5597).
- **Keine nachträgliche Übernahme** — nur Erinnerungen, die **nach** der Aktivierung
  von Qdrant erstellt/aktualisiert werden, werden dorthin geschrieben
  (asynchrones Dual-Write ohne Warten auf das Ergebnis). Bereits vorhandene
  SQLite-Erinnerungen werden **nicht** migriert; „Jetzt neu indizieren“ erstellt
  lediglich den sqlite-vec-Index neu, nicht Qdrant.
- **Die Vektordimension wird bei der ersten Verwendung automatisch** aus dem
  tatsächlichen Embedding erkannt — es muss kein Dimensionsfeld ausgefüllt
  werden. Das Ändern des Embedding-Modells nach dem Erstellen einer Collection
  wird **nicht** automatisch verarbeitet: Die vorhandene Collection bleibt
  unverändert, Schreib-/Suchvorgänge mit abweichender Dimension schlagen fehl
  und greifen ersatzweise auf sqlite-vec zurück. Erstellen Sie die Collection
  neu (neuer Name oder Löschen in Qdrant), um den Embedder zu wechseln.
- **Distanzmetrik** — immer **Kosinus** (bei der Erstellung der Collection fest
  codiert; nicht konfigurierbar).
- **Authentifizierung** — nur per API-Schlüssel (wird als `api-key`-Header
  gesendet; für nicht authentifiziertes lokales Docker optional). JWT/RBAC
  werden nicht verwendet.
- **Konfigurationsfelder** — die Benutzeroberfläche stellt `host`, `port`,
  `collection`, `embeddingModel`, `apiKey` bereit. `vectorSize` /
  `hnswEfConstruct` sind nur über Umgebungsvariablen bzw. die Datenbank
  verfügbar, und `vectorSize` wird nicht für die Erstellung der Collection
  verwendet (die Dimension stammt aus dem Embedding).

### Vektorquantisierung (int8 — optional, beide Backends)

Beide Vektor-Backends unterstützen eine **optionale int8-Quantisierung**, um den
Speicherbedarf der gespeicherten Vektoren zu reduzieren (etwa 4-mal kleiner als
Float32), wobei die Trefferquote geringfügig sinkt. Standardmäßig ist sie bei
beiden **deaktiviert** — die Vektoren behalten ihre volle Genauigkeit, sofern
sie nicht ausdrücklich aktiviert wird.

| Backend    | Einstellung                                   | Typ                            | Standard | Ausgelesen in                                               |
| ---------- | --------------------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB-Schlüssel)           | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (Umgebungsvariable) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** wird pro Instanz über den Einstellungsschlüssel
  `qdrantQuantization` konfiguriert (als Feld `quantization` bei
  `PUT /api/settings/qdrant` verfügbar). Bei `"int8"` fordert
  `buildQuantizationConfig()` eine skalare Quantisierung (`always_ram`, Quantil
  `0.99`) an, und Suchvorgänge aktivieren `rescore: true`, damit die
  Vektoren mit voller Genauigkeit die int8-Kandidatenmenge verfeinern.
- Die Quantisierung von **sqlite-vec** ist **nur über die Umgebung**
  konfigurierbar (keine DB-Einstellung): Setzen Sie
  `MEMORY_VEC_QUANTIZATION=int8`, um die lokalen Vektoren über
  `vec_quantize_int8(?, 'unit')` als `int8[dim]`-Spalte zu speichern. Der
  ausgewählte Modus wird in die `embedding_signature` aufgenommen (mit dem
  Suffix `:int8`), sodass ein Wechsel des Modus eine vollständige
  Neuindizierung der Tabelle `vec_memories` auslöst — über denselben verzögerten
  Backfill-Pfad, der bei einer Änderung des Embedding-Modells verwendet wird.

## Speichertypen

`MemoryType` (`src/lib/memory/types.ts`):

| Typ          | Verwendungszweck                                                                              |
| ------------ | --------------------------------------------------------------------------------------------- |
| `factual`    | Präferenzen, stabile Benutzerfakten, Verhaltensmuster                                         |
| `episodic`   | Entscheidungen, die an einen bestimmten Zeitpunkt gebunden sind („Ich habe Postgres gewählt“) |
| `procedural` | Workflow-/Anleitungswissen (reserviert; derzeit keine automatische Extraktion)                |
| `semantic`   | Reserviert für Einträge im Vektorspeicher                                                     |

Die Abrufstrategie von `MemoryConfig` ist entweder `exact`, `semantic` oder `hybrid`,
und der Geltungsbereich ist entweder `session`, `apiKey` oder `global`. Der
Standardgeltungsbereich von `getMemorySettings()` ist `apiKey`.

## Faktenextraktion (`extraction.ts`)

Die Extraktion ist **regex-basiert**, nicht LLM-basiert — sie wird prozessintern mit
`setImmediate()` ausgeführt, sodass sie den Antwortstream niemals blockiert:

- **Präferenzmuster** → `MemoryType.FACTUAL`
  (z. B. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Entscheidungsmuster** → `MemoryType.EPISODIC`
  (z. B. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Verhaltensmuster** → `MemoryType.FACTUAL`
  (z. B. `I usually …`, `I always …`, `I tend to …`)

Jeder Treffer wird bereinigt (`trim`, Zusammenfassung von Leerraum, Begrenzung
auf 500 Zeichen), innerhalb des Batches über einen stabilen
`factKey(category, content)` dedupliziert und mittels `createMemory()` mit den
Metadaten `{category, extractedAt, source: "llm_response"}` gespeichert. Der
Eingabetext ist auf 64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) begrenzt — bei
längeren Texten wird das **Ende** des Textes verwendet, damit die neuesten
Assistenteninhalte immer berücksichtigt werden.

`extractFactsFromText(text)` wird für Tests exportiert und gibt die
strukturierten Fakten zurück, ohne sie zu speichern.

## Abruf (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` ist der Haupteinstiegspunkt. Die Funktion:

1. Normalisiert und validiert die Konfiguration mithilfe von `MemoryConfigSchema`.
2. Gibt sofort `[]` zurück, wenn `enabled` false oder `maxTokens <= 0` ist.
3. Begrenzt `maxTokens` auf `[1, 8000]`.
4. Erkennt, ob die moderne Tabelle `memories` vorhanden ist (im Gegensatz zur
   älteren Tabelle `memory`), damit ältere Datenbanken weiterhin funktionieren.
5. Erstellt die Basisabfrage mit einer Ablaufprüfung
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), einem
   optionalen Sitzungsbereich und einem optionalen Grenzwert für `retentionDays`.
6. Verzweigt abhängig von der Strategie:
   - **`exact`** (Standard): chronologisch mit `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: Wenn `config.query` gesetzt ist und `memory_fts` existiert,
     wird per JOIN `memory_fts MATCH ?` verknüpft und nach FTS-Rang sortiert;
     wenn FTS 0 Zeilen zurückgibt, wird auf die chronologische Sortierung
     zurückgegriffen.
   - **`hybrid`**: Vereinigung der FTS-Ergebnisse (höhere Relevanz) mit der
     chronologischen Menge, dedupliziert nach ID.
7. Berechnet bei Angabe einer Abfrage einen Schlüsselwort-Relevanzwert
   (`getRelevanceScore`) über `content`, `key` und das JSON-Feld `metadata`.
   Zeilen mit einem Wert von null werden herausgefiltert.
8. Sortiert absteigend nach Relevanzwert und anschließend absteigend nach
   `createdAt`.
9. Durchläuft die Rangliste und übernimmt Einträge, solange die fortlaufende
   Summe von `estimateTokens(content)` (≈ `length / 4`) das Budget nicht
   überschreitet. Gibt immer mindestens einen Eintrag zurück, sofern es
   mindestens einen Treffer gibt.

`estimateTokens` wird exportiert und vom Abruf, von der Zusammenfassung und vom
MCP-Tool `omniroute_memory_search` verwendet.

## Injektion (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Fügt alle Speicherinhalte zu einer einzigen Zeichenfolge `Memory context: …` zusammen.
2. Wählt anhand des Anbieternamens eine Strategie:
   - **Systemnachricht** (Standard für OpenAI, Anthropic, Gemini, …) — stellt
     eine `{role: "system", content: memoryText}`-Nachricht allen vorhandenen
     Systemnachrichten voran, sodass System-Prompts des Benutzers weiterhin Vorrang haben.
   - **Benutzernachricht** (Fallback) — für Anbieter in
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Diese lehnen die Systemrolle ab
     und würden andernfalls einen 400-Fehler zurückgeben (siehe Issue #1701 für GLM/Zhipu).
3. Protokolliert Anzahl, Strategie und Modell unter `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` wird für Aufrufer exportiert, die
eigene Routing-Entscheidungen treffen müssen. Bei unbekannten Anbietern wird
aus Sicherheitsgründen standardmäßig `true` verwendet (Systemrolle zulässig).

## Einstellungen (`settings.ts`)

Die Speicherkonfiguration wird **in der DB-Einstellungstabelle gespeichert**, nicht in Umgebungsvariablen.
`getMemorySettings()` liest aus `getSettings()` und speichert das Ergebnis
prozessintern zwischen; `invalidateMemorySettingsCache()` wird nach Schreibvorgängen
von der PUT-Route für Einstellungen aufgerufen.

### Legacy-Felder (alle Versionen)

| DB-Schlüssel          | Typ     | Standard                                              | UI-Steuerelement                                                       |
| --------------------- | ------- | ----------------------------------------------------- | ---------------------------------------------------------------------- |
| `memoryEnabled`       | boolean | `false` (seit v3.8.30 standardmäßig deaktiviert)      | Speicher ein/aus                                                       |
| `memoryMaxTokens`     | integer | `2000` (Bereich `0–16000`)                            | Token-Budget für die Injektion                                         |
| `memoryRetentionDays` | integer | `30` (Bereich `1–365`)                                | Aufbewahrungszeitraum                                                  |
| `memoryStrategy`      | enum    | `"hybrid"` (einer von `recent`, `semantic`, `hybrid`) | Abrufstrategie                                                         |
| `skillsEnabled`       | boolean | `false`                                               | Schaltet die schlüsselspezifische Skill-Injektion um (siehe SKILLS.md) |

Hinweis: Die UI-Strategie `"recent"` wird über `toMemoryRetrievalConfig()` der
internen Abrufstrategie `"exact"` zugeordnet (chronologische Reihenfolge).

### Neue Felder (v3.8.6, Plan 21 D9)

Siehe auch den obigen Abschnitt „Erweiterung der Einstellungen“ für Feldbeschreibungen.

| DB-Schlüssel                | API-Feld                 | Standard |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-bezogene DB-Schlüssel (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` mit dem Standardwert `"omniroute_memory"`,
`qdrantEmbeddingModel` mit dem Standardwert `"openai/text-embedding-3-small"`) werden von
`normalizeQdrantConfig()` in `qdrant.ts` gelesen.

### Umgebungsvariablen (v3.8.6)

Sechs optionale Umgebungsvariablen passen das Laufzeitverhalten der Engine an (dokumentiert in `.env.example`):

| Variable                        | Standard                   | Beschreibung                                                                                                                                      |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | TTL des Embedding-Caches (5 Min.)                                                                                                                 |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Maximale Anzahl von Einträgen im Embedding-LRU-Cache                                                                                              |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF-Repository für das Transformers.js-Modell                                                                                                      |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF-Repository für das statische Potion-Modell                                                                                                     |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Speicherort für heruntergeladene Modelle                                                                                                          |
| `MEMORY_VEC_TOP_K`              | `20`                       | Standardmäßiges Top-K für die Vektorsuche                                                                                                         |
| `MEMORY_RRF_K`                  | `60`                       | RRF-k-Konstante für die Hybridsuche                                                                                                               |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Auf `int8` setzen, um lokale sqlite-vec-Vektoren quantisiert zu speichern (~4× kleiner; Opt-in). Eine Modusänderung erzwingt eine Neuindizierung. |

## Zusammenfassung (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` komprimiert ältere
Inhalte, wenn die laufende Gesamtzahl der Token in den Erinnerungen eines Schlüssels
das Budget überschreitet. Die Funktion durchläuft die Zeilen absteigend nach `created_at`,
behält passende Zeilen bei und ersetzt bei den übrigen `content` direkt durch die ersten
drei Sätze des Originals. `tokensSaved` ist die Differenz von `estimateTokens` zwischen
altem und neuem Inhalt.

Diese Routine ist **verfügbar, wird aber in der aktuellen Chat-Pipeline nicht automatisch
aufgerufen** — rufen Sie sie über einen Cronjob, eine Administratoraktion oder eine
`MemoryConfig.autoSummarize`-Integration auf, wenn Sie eine fortlaufende Komprimierung
benötigen. Der Datenverlust ist unumkehrbar: Der ursprüngliche Text wird überschrieben.

## REST-API

Alle Endpunkte erfordern eine Management-Authentifizierung (`requireManagementAuth`).

### Zentrale Speicherendpunkte (vorhanden + aktualisiert)

| Methode  | Pfad                 | Beschreibung                                                                                                                                                                                            |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Paginierte Liste mit Filtern: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Die Antwort enthält `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                     |
| `POST`   | `/api/memory`        | Erstellt einen Eintrag (Zod-validiert: `content`, `key`, optional `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Ruft `createMemory()` auf, das für `(apiKeyId, key)` ein Upsert durchführt |
| `GET`    | `/api/memory/[id]`   | Ruft einen einzelnen Eintrag anhand der UUID ab                                                                                                                                                         |
| `PUT`    | `/api/memory/[id]`   | Aktualisiert Eintragsfelder (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Synchronisiert außerdem den Vektor, wenn eine Embedding-Quelle verfügbar ist.                        |
| `DELETE` | `/api/memory/[id]`   | Löscht einen Eintrag; löscht ihn nach Möglichkeit auch aus `vec_memories` (D15) und Qdrant. Gibt 404 zurück, wenn er nicht vorhanden ist.                                                               |
| `GET`    | `/api/memory/health` | Führt `verifyExtractionPipeline("health-check")` aus — Rundlauf aus Erstellen→Auflisten→Löschen. Gibt `{working, latencyMs, error?}` zurück                                                             |

### Neue Endpunkte der Speicher-Engine (Plan 21)

| Methode | Pfad                              | Beschreibung                                                                                                                                                                                |
| ------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`  | `/api/memory/retrieve-preview`    | Probelauf von `retrieveMemories` — gibt sortierte Ergebnisse mit Bewertung, Stufe und Token zurück. Body: `RetrievePreviewSchema`. Fügt KEINE Erinnerungen ein und verändert sie nicht.     |
| `GET`   | `/api/memory/embedding-providers` | Listet Anbieter mit Embedding-Modellen auf und gibt an, für welche ein API-Schlüssel konfiguriert ist.                                                                                      |
| `GET`   | `/api/memory/engine-status`       | Gibt den vollständigen Engine-Status zurück: Schlüsselwortstufe, Embedding-Auflösung, Vektorspeicherstatistiken, Qdrant-Status, Rerank-Konfiguration. Struktur: `MemoryEngineStatusSchema`. |
| `POST`  | `/api/memory/summarize`           | Löst die Speicherkomprimierung manuell aus. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Gibt `{candidates, tokensSaved}` zurück.                                |
| `POST`  | `/api/memory/reindex`             | Löst die Vektorneuindizierung für Erinnerungen mit `needs_reindex=1` aus. Body: `MemoryReindexSchema` (`force`). Gibt `{started, pending}` zurück.                                          |

### Einstellungsendpunkte

| Methode | Pfad                                    | Beschreibung                                                                                                                          |
| ------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/memory`                  | Aktuelle normalisierte `MemorySettingsExtended` (7 neue Felder + Legacy-Felder)                                                       |
| `PUT`   | `/api/settings/memory`                  | Aktualisiert ein beliebiges Feld aus `MemorySettingsExtendedSchema` (insgesamt 12 Felder)                                             |
| `GET`   | `/api/settings/qdrant`                  | Aktuelle Qdrant-Einstellungen (`QdrantSettingsSchema`)                                                                                |
| `PUT`   | `/api/settings/qdrant`                  | Aktualisiert die Qdrant-Einstellungen. Body: `QdrantSettingsUpdateSchema`. `apiKey` = eine leere Zeichenfolge entfernt den Schlüssel. |
| `GET`   | `/api/settings/qdrant/health`           | Verfügbarkeitsprüfung der konfigurierten Qdrant-Instanz. Gibt `QdrantHealthResultSchema` zurück.                                      |
| `POST`  | `/api/settings/qdrant/search`           | Test der semantischen Suche in Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).                                                  |
| `POST`  | `/api/settings/qdrant/cleanup`          | Entfernt Qdrant-Punkte für abgelaufene / alte Erinnerungen.                                                                           |
| `GET`   | `/api/settings/qdrant/embedding-models` | Listet die für Qdrant verfügbaren Embedding-Modelle auf.                                                                              |

Die Listenabfrage von `/api/memory` unterstützt entweder eine `page`-basierte
Paginierung (`parsePaginationParams`) **oder** ein direktes `offset` — wenn `offset`
vorhanden ist, hat es Vorrang, und für die Antwortstruktur wird ein abgeleitetes
`page` berechnet.

## MCP-Tools (`open-sse/mcp-server/tools/memoryTools.ts`)

Wenn der MCP-Server aktiviert ist, werden drei Speicher-Tools registriert:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → umschließt `retrieveMemories()`. Seit v3.8.6 (D16) wird die `strategy`
  aus `getMemorySettings()` gelesen, anstatt fest auf `"exact"` codiert zu sein. Wenn
  `query` angegeben ist und `strategy` den Wert `semantic` oder `hybrid` hat, wird
  der Vektorspeicher verwendet, sofern er verfügbar ist.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → umschließt `createMemory()`. Akzeptiert nur die 4 kanonischen Typen:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → listet passende
  Einträge auf, filtert optional nach einem „erstellt vor“-Zeitstempel und löscht anschließend jeden
  über `deleteMemory()` (wodurch auch Vektoren aus sqlite-vec + Qdrant entfernt werden).

Details zu Transport und Geltungsbereich finden Sie unter [MCP-SERVER.md](./MCP-SERVER.md).

## Dashboard (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` ist jetzt ein **Studio mit 3 Tabs**:

### Tab: Erinnerungen

- Konzeptkarte (einklappbare Erklärung „So funktioniert es“).
- Echtzeitliste, Suche und Paginierung (Entprellung von 300 ms).
- Typfilter (`factual` / `episodic` / `procedural` / `semantic` / alle).
- Modal zum Hinzufügen von Erinnerungen (Schlüssel, Inhalt, Typ).
- Inline-Bearbeitung (Stift-Schaltfläche → `PUT /api/memory/[id]`).
- Löschen pro Zeile (mit Bestätigungsdialog).
- JSON-Export der aktuellen Seite; JSON-Import über die Dateiauswahl.
- Statistikkarten: `totalEntries`, `tokensUsed`, `hitRate`.
- Schaltfläche „Alte komprimieren“ → `POST /api/memory/summarize` (ein
  Probelauf zeigt zunächst die Anzahl der Kandidaten an, danach erfolgt die Bestätigung).
- Ein grüner/roter Statuspunkt, der durch `GET /api/memory/health` gesteuert wird.

### Tab: Playground

- Abfrageeingabe + Strategieauswahl (Exakt / Semantisch / Hybrid) + Token-Budget.
- „Simulieren“ → `POST /api/memory/retrieve-preview` — zeigt bewertete Ergebnisse mit
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Auflösungsbereich, der anzeigt, welche Embedding-Quelle/welcher Vektorspeicher verwendet wurde und
  ob ein Fallback erfolgt ist.

### Tab: Engine

- Engine-Statusbereich (Keyword-FTS5-Chip, Embedding-Chip, Vektorspeicher-Chip,
  Qdrant-Zustands-Chip, Rerank-Chip).
- Schaltfläche „Jetzt neu indizieren“ → `POST /api/memory/reindex`.
- Auswahl der Embedding-Quelle (automatisch / remote / statisch / Transformers + Umschalter).
- Qdrant-Konfigurationskarte (Aktivierungsumschalter, Host/Port/Collection/Schlüssel, Verbindung testen,
  semantische Suche testen, Bereinigung).
- Rerank-Konfigurationskarte (Aktivierungsumschalter, Anbieter-/Modellauswahl).

Die Speicher- und Qdrant-Einstellungen befinden sich außerdem unter
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) als
Legacy-/globale Einstellungsoberfläche.

## Caching

`src/lib/memory/store.ts` verwaltet einen prozessinternen LRU-ähnlichen Cache
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, mit Entfernung der ältesten 20 %)
für `getMemory(id)`-Lesezugriffe sowie eine generische Schlüssel/Wert-
`memoryCache`-Schicht (`src/lib/memory/cache.ts`) mit den Methoden `get`/`set`/`invalidate`,
die von Aufrufern verwendet wird, die einen eigenen Cache mit spezifischem Geltungsbereich benötigen (LRU mit 1.000 Einträgen,
Standard-TTL 5 min).

## Datenschutz & Lebenszyklus

- Eigentümer des Speichers ist die API-Schlüssel-ID (`resolveMemoryOwnerId` in
  `chatCore.ts`). Ohne eine `apiKeyInfo.id` werden weder Abruf noch Injektion
  noch Extraktion ausgeführt.
- Einträge mit einem in der Zukunft liegenden `expires_at` werden beim Abruf
  herausgefiltert; alte Einträge, die über `retentionDays` hinausgehen, werden
  durch die Klausel `created_at >= cutoff` in `retrieveMemories` ausgeschlossen.
- Verwenden Sie für die endgültige Löschung `DELETE /api/memory/[id]` oder
  `omniroute_memory_clear`.
- Die Extraktion erfolgt nach dem Fire-and-Forget-Prinzip über `setImmediate`;
  Fehler werden unter `memory.extraction.background.failed` protokolliert und
  niemals an den Aufrufer weitergegeben.
- Verifizierungsdurchläufe (`verifyExtractionPipeline`) bereinigen ihre eigenen
  Testeinträge in einem `finally`-Block.

## Siehe auch

- [SKILLS.md](./SKILLS.md) — die Einstellung `skillsEnabled` injiziert
  Werkzeugdefinitionen zusammen mit dem Speicher.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-Transport/Berechtigungsbereiche.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — umfassendere API-Oberfläche.
- Quellmodule:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybrides RRF
  - `src/lib/memory/embedding/index.ts` — Einbettungsschicht mit mehreren Quellen
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod-Schemas für alle Speicher-API-Anfragekörper
  - `src/shared/schemas/qdrant.ts` — Zod-Schemas für Qdrant-Einstellungen/-Operationen
  - `src/lib/db/memoryVec.ts` — CRUD für `memory_vec_meta`
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + Unterrouten
  - `src/app/(dashboard)/dashboard/memory/` — Studio-Benutzeroberfläche (Seite +
    Komponenten + Registerkarten + Hooks)
  - `open-sse/handlers/chatCore.ts` (Verknüpfung von Injektion/Extraktion)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Auswahl eines Einbettungsanbieters (v3.8.16+)

Die Speicher-Engine von OmniRoute unterstützt **vier Einbettungsquellen** (`src/lib/memory/embedding/`). Jede bietet unterschiedliche Vor- und Nachteile hinsichtlich **Latenz, Kosten, Modellqualität und Einrichtungsaufwand**.

### Die Einbettungsquellen

| Anbieter       | Quelle                                             | Latenz                                    | Kosten              | Qualität                           | Einrichtung                            |
| -------------- | -------------------------------------------------- | ----------------------------------------- | ------------------- | ---------------------------------- | -------------------------------------- |
| `transformers` | Lokales ONNX-Modell (Xenova/all-MiniLM-L6-v2)      | ~50-150ms (CPU)                           | Kostenlos           | Gut                                | Nur `npm install`                      |
| `static`       | Vorberechnete Vektoren (zwischengespeichert)       | <1ms                                      | Kostenlos           | N. z. (abhängig vom Cache-Treffer) | Keine                                  |
| `remote`       | OpenAI-/Cohere-/Voyage-API                         | ~100-300ms                                | $0.02-0.10/1M Token | Ausgezeichnet                      | API-Schlüssel                          |
| `auto`         | Wählt zur Laufzeit die beste verfügbare Quelle aus | Wie die gewählte Quelle                   | Kostenlos           | Wie die gewählte Quelle            | Keine                                  |
| _(cache)_      | LRU-In-Memory-Schicht über einer beliebigen Quelle | <1ms (Treffer), volle Latenz (Fehlschlag) | Kostenlos           | Wie die zugrunde liegende Quelle   | Immer aktiv (keine auswählbare Quelle) |

### Entscheidungsbaum

```
                  Wie sieht Ihr Bereitstellungskontext aus?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  ENTW./TEST   KLEINE PROD.  GROSSE PROD.  EDGE/OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (kostenlos, keine API)     (beste Qualität) (kein Internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            IMMER die `cache`-Schicht darüber hinzufügen
            (`LruCache` umschließt jeden Anbieter)
```

### Datenbank- und API-Konfiguration

Optionen für Speichereinbettungen werden über die Einstellungs-API/-Benutzeroberfläche und nicht über Umgebungsvariablen konfiguriert. Die relevanten Datenbankschlüssel unter „Einstellungen“ (`normalizeMemorySettings` in `src/lib/memory/settings.ts`) sind:

- `memoryEmbeddingSource`: `"transformers"` (lokal), `"remote"` (API-basiert, z. B. OpenAI), `"static"` (externer Speicher) oder `"auto"`
- `memoryEmbeddingProviderModel`: Modellkennung für Remote-/statische Quellen (z. B. `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` oder `"auto"`

#### Lokales Modell (`transformers`)

Verwendet intern transformers.js, um lokale Modelle auszuführen:

```bash
# Im Code gelesene Umgebungsvariablen (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF-Modell-Repository
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Statisches HF-Potion-Modell
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Cache-Verzeichnis
```

#### LRU-Einbettungscache

Der Cache ist standardmäßig immer aktiviert und wird über Umgebungsvariablen konfiguriert:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Maximale Anzahl zwischengespeicherter Elemente
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 Min.)
```

### Leistungswerte

Benchmark auf einem typischen x86-Server mit 4 Kernen (Texte mit jeweils ~100 Tokens):

| Anbieter             | p50   | p95   | p99   | Kosten / 1 Mio. Embeddings         |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Kostenlos                          |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Abhängig vom Qdrant-Hosting        |
| `cache` (Treffer)    | <1ms  | <1ms  | 2ms   | Kostenlos                          |

---

## Muster zur Faktenextraktion (v3.8.16+)

Das Modul `extraction.ts` (`src/lib/memory/extraction.ts`) verwendet **Musterabgleich mit regulären Ausdrücken**, um strukturierte Fakten aus Konversationsnachrichten zu extrahieren. Das Verständnis dieser Muster hilft Ihnen, die Extraktionsqualität für Ihren Anwendungsfall zu optimieren.

### Standardmäßige Musterkategorien

| Kategorie           | Beispielmuster                                                                  | Erfasst                             |
| ------------------- | ------------------------------------------------------------------------------- | ----------------------------------- |
| PREFERENCE_PATTERNS | `"Ich bevorzuge <X>"`, `"Ich mag <X>"`, `"Ich hasse <X>"`                       | Benutzerpräferenzen                 |
| DECISION_PATTERNS   | `"Ich werde <X> verwenden"`, `"Ich habe mich für <X> entschieden"`              | Benutzerentscheidungen (episodisch) |
| PATTERN_PATTERNS    | `"Ich mache normalerweise <X>"`, `"Ich mache immer <X>"`, `"Ich mache nie <X>"` | Dauerhafte Verhaltensmuster         |

### Beispielmuster (vereinfacht)

```ts
// Aus src/lib/memory/extraction.ts
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### Was extrahiert wird

Wenn ein Benutzer Folgendes sagt:

> „Ich bevorzuge TypeScript. Ich werde Postgres für dieses Projekt verwenden. Ich committe immer vor dem Pushen. Ich mag Python nicht.“
> Die Extraktion erzeugt 4 Erinnerungen:
>
> | Schlüssel                            | Kategorie    | Typ        | Inhalt                        |
> | ------------------------------------ | ------------ | ---------- | ----------------------------- |
> | `preference:typescript`              | Präferenz    | faktisch   | "TypeScript"                  |
> | `decision:postgres_for_this_project` | Entscheidung | episodisch | "Postgres für dieses Projekt" |
> | `pattern:commit_before_pushing`      | Muster       | faktisch   | "vor dem Pushen committen"    |
> | `preference:python`                  | Präferenz    | faktisch   | "Python"                      |

### Extraktionsgrenzen

Um eine unkontrollierte Extraktion zu verhindern, gelten die folgenden Grenzen:

| Mindestlänge des Inhalts | 3 Zeichen |
| Maximallänge des Inhalts | 500 Zeichen |

### Wann die Extraktion deaktiviert werden sollte

Die Extraktion wird automatisch ausgeführt, sobald der Speicher aktiviert ist; es gibt keinen separaten
Schalter nur für die Extraktion. Um sie zu deaktivieren, deaktivieren Sie den Speicher vollständig (`enabled: false`
über `PUT /api/settings/memory`). Dies kann in folgenden Fällen sinnvoll sein:

- Sie haben ein hohes Nachrichtenvolumen und die Extraktionskosten sind nicht unerheblich
- Ihre Konversationen sind überwiegend temporär (Chat, Debugging) und haben keinen langfristigen Wert
- Sie erfassen den Kontext bereits über benutzerdefinierte Plugins

---

## Optimierung von Hybrid-RRF (v3.8.16+)

Der Algorithmus **Reciprocal Rank Fusion (RRF)** kombiniert Ergebnisse aus FTS5 (Schlüsselwörter) und Vektorsuche (Semantik). Der Parameter `k` steuert, wie stark niedriger eingestufte Ergebnisse gewichtet werden.

### Die Formel

Für jede infrage kommende Erinnerung lautet der RRF-Score:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Dabei gilt:

- `k` ist die Konstante (Standardwert 60)
- `rank_i(d)` ist der Rang des Dokuments `d` im i-ten Abrufsystem (FTS, Vektor)
- Die Summe erstreckt sich über alle Abrufsysteme

### Auswirkungen von `k` auf die Ergebnisse

| `k`-Wert              | Auswirkung                                                                                                 | Am besten geeignet für                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `k=0`                 | Reine Rangfusion (keine Glättung)                                                                          | Theoretische Basislinie                        |
| `k=10-30`             | Gewichtet die besten Ergebnisse stark; niedrige Ränge tragen kaum bei                                      | Wenn die Top-3-Ergebnisse meist korrekt sind   |
| **`k=60`** (Standard) | Ausgewogen — alle Top-10-Ergebnisse tragen wesentlich bei                                                  | Allgemeine Suche                               |
| `k=100+`              | Flacher — selbst Ergebnisse mit niedrigem Rang können dominieren, wenn sie in mehreren Systemen erscheinen | Wenn Trefferquote > Präzision entscheidend ist |

### `k` in der Praxis optimieren

```bash
# Standardwert
MEMORY_RRF_K=60

# Aggressive Präzision (kleiner Speicher, wenige Dokumente)
MEMORY_RRF_K=20

# Maximale Trefferquote (großer Speicher, vielfältige Abfragen)
MEMORY_RRF_K=120
```

**Beispiel mit `k=20`:**

- FTS-Rang 1 → Beitrag `1/21 = 0.048`
- FTS-Rang 10 → Beitrag `1/30 = 0.033`
- Vektorrang 1 → Beitrag `0.048`
- Kombiniertes Maximum: `0.096`

**Beispiel mit `k=60`:**

- FTS-Rang 1 → Beitrag `1/61 = 0.016`
- FTS-Rang 10 → Beitrag `1/70 = 0.014`
- Vektorrang 1 → Beitrag `0.016`
- Kombiniertes Maximum: `0.033`

Bei einem höheren `k` ist der **relative Unterschied** zwischen Rang 1 und Rang 10 kleiner, sodass sich der Algorithmus stärker auf den **Konsens zwischen den Abrufsystemen** als auf die Konfidenz des höchsten Rangs stützt.

### Wann `k` geändert werden sollte

| Symptom                                                      | Versuch                                                                    |
| ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Das Top-Ergebnis gewinnt immer, ist aber falsch              | `k` **senken** (z. B. 20) — die Konfidenz des höchsten Rangs zählt stärker |
| Die richtige Antwort ist in den Top 5, aber nicht auf Rang 1 | `k` **erhöhen** (z. B. 100) — eine flachere Bewertung belohnt Konsens      |
| Die Trefferquote ist hoch, aber die Präzision niedrig        | `k` **senken** — die Rangfolge schärfen                                    |
| Die Trefferquote ist niedrig (relevante Dokumente fehlen)    | `k` **erhöhen** — niedriger eingestuften Dokumenten eine Chance geben      |

### RRF-Gewichtung

Die Reciprocal Rank Fusion verwendet gleiche Gewichtungen für den Rang der semantischen Vektorsuche und den Rang der Volltextsuche:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Es gibt keine Umgebungsvariablen, mit denen sich die einzelnen Gewichtungen anpassen lassen (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` existieren nicht).

---

## Zusammenfassungsstrategie (v3.8.16+)

Das Modul `summarization.ts` (`src/lib/memory/summarization.ts`) komprimiert ältere Erinnerungen, um die aktive Menge klein zu halten und gleichzeitig die Abrufbarkeit zu bewahren.

### Wann die Zusammenfassung ausgelöst wird

| Auslöser                        | Schwellenwert (Standard) |
| ------------------------------- | ------------------------ |
| Manuelle Auslösung über die API | k. A.                    |

### Was zusammengefasst wird

Aus `summarization.ts` werden zwei Einstiegspunkte exportiert:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — verdichtet die
  Erinnerungen einer Sitzung zu einem einzigen Zusammenfassungstext, der durch ein Token-Budget begrenzt ist.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — die von der API
  verwendete altersbasierte Komprimierung: Sie wählt jede Erinnerung aus, die älter als `days` ist,
  erstellt daraus eine einzige verdichtete Zusammenfassungserinnerung und löscht
  (wenn `dryRun` den Wert `false` hat) die Originale. Übergeben Sie `dryRun: true`, um eine Vorschau
  der Kandidatenmenge und der gesamten Token-Anzahl anzuzeigen, ohne Änderungen vorzunehmen.

Es gibt weder einen Clustering-Durchlauf nach Tags/Schlüsseln noch eine Bewertung einzelner Erinnerungen als „zentral“ oder „zusammenfassbar“ —
die Auswahl basiert ausschließlich auf dem Altersgrenzwert, und der Zusammenfassungstext besteht aus einer verdichteten,
mit dem Typ präfixierten Zeile pro Kandidat.

### Zusammenfassung auslösen

Die Zusammenfassung ist **manuell / optional** — die Einstellung `autoSummarize` ist
standardmäßig `false`, sodass nichts automatisch komprimiert wird. Lösen Sie sie über die API aus:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Um sie deaktiviert zu lassen, belassen Sie `autoSummarize` einfach auf dem Standardwert (`false`).

### Tipps zur Qualität der Zusammenfassung

- **Zeigen Sie zuerst mit `dryRun` eine Vorschau an** — `summarizeMemoriesOlderThan(..., true)` gibt
  die Kandidatenliste und die gesamte Token-Anzahl zurück, sodass Sie vor dem Löschen der Originale
  überprüfen können, was zusammengeführt würde.
- **Führen Sie die Zusammenfassung in Zeiten mit geringem Datenverkehr aus**, wenn Sie über einen großen Erinnerungsbestand verfügen — der LLM-Aufruf ist der langsame Teil

```bash
# Cron-Stil: täglich um 3 Uhr zusammenfassen
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend-Provider-Muster

> **Maßgebliche Quelle:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Tests:** `src/lib/memory/__tests__/generic-backend.test.ts`

Das MemoryBackend-Provider-Muster führt eine **austauschbare Backend-Abstraktionsschicht** über der bestehenden Memory-Engine ein. Statt an eine einzige Speicherimplementierung gebunden zu sein, unterstützt das Memory-System nun mehrere Backends (SQLite, Obsidian, Notion, benutzerdefinierte HTTP-Backends) mit konfigurierbarem Primär-/Fallback-Routing.

### Architektur

```
┌──────────────────────────────────────────────────────────┐
│                    API-Routen                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│        Singleton-Orchestrator (manager.ts)                │
│                                                          │
│  Primär   ──► Backend A  (z. B. SQLite)                  │
│  Fallback ──► Backend B  (z. B. Obsidian)                │
│               Backend C  (z. B. Notion via GenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite-    │ │ Obsidian-  │ │ GenericMemory-   │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Kernschnittstelle (`backend.ts`)

Jedes Backend muss die Schnittstelle `MemoryBackend` implementieren:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD-Operationen
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Suche
  search(config: SearchConfig): Promise<Memory[]>;

  // Zustandsprüfung
  health(): Promise<HealthCheckResult>;

  // Lebenszyklus (optional)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Singleton-Orchestrator, der:

- Backends über `register(backend)` **registriert** — wird beim Start aus `index.ts` aufgerufen
- Primär- und Fallback-Backends über `configure(primary, fallbacks)` **konfiguriert**
- CRUD-Operationen und Suchanfragen an das primäre Backend **weiterleitet**, bei Fehlern über die Fallback-Kette
- regelmäßig **Zustandsprüfungen** für alle Backends durchführt

**Fallback-Verhalten:**

| Operation | Primär                       | Fallbacks                      |
| --------- | ---------------------------- | ------------------------------ |
| `create`  | ✅ Nur primäres Backend      | ❌                             |
| `get`     | ✅ Zuerst primäres versuchen | ✅ Fallback, falls null        |
| `update`  | ✅ Nur primäres Backend      | ✅ Asynchrone Synchronisierung |
| `delete`  | ✅ Nur primäres Backend      | ✅ Asynchrone Synchronisierung |
| `list`    | ✅ Nur primäres Backend      | ❌                             |
| `search`  | ✅ Zuerst primäres Backend   | ✅ Fallback bei Fehler         |

#### GenericMemoryBackend (`genericBackend.ts`)

Ein generischer HTTP-Konnektor, der jede REST-API an ein MemoryBackend anpasst. Nützlich für:

- **Notion** — Verbindung über die Notion API
- **Obsidian** — Verbindung über die Obsidian Local REST API
- **Benutzerdefinierte Backends** — jeder Dienst, der eine RESTful Memory-API bereitstellt

**Konfiguration:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Basis-URL der Backend-API
  apiKey?: string;           // Bearer-Token für die Authentifizierung
  headers?: Record<string, string>;  // Benutzerdefinierte HTTP-Header
  timeout?: number;          // Anfrage-Timeout (Standard: 30000ms)
  backendType?: string;      // Für die Protokollierung

  // Überschreibungen für Endpunkte (Standardwerte folgen REST-Konventionen)
  endpoints?: {
    search?: string;   // Standard: "/memories/search"
    create?: string;   // Standard: "/memories"
    list?: string;     // Standard: "/memories"
    get?: string;      // Standard: "/memories/{id}"
    update?: string;   // Standard: "/memories/{id}"
    delete?: string;   // Standard: "/memories/{id}"
    health?: string;   // Standard: "/health"
  };

  // Zuordnungen von Abfrageparameternamen
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Zuordnungen von Pfadparameternamen
  pathParams?: {
    id?/memoryId?
  };
}
```

**Bekannte Backends** sind in `KNOWN_BACKENDS` vorkonfiguriert:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend verweist auf localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend verweist auf api.notion.com/v1
```

#### Integrierte Backends

##### SQLiteBackend (`sqliteBackend.ts`)

Das standardmäßige primäre Backend. Kapselt den vorhandenen SQLite-basierten Speicher unter Verwendung von `src/lib/memory/store.ts`. Wird beim Start automatisch registriert.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Kapselt die vorhandene Obsidian-Integration (`src/lib/memory/obsidianBackend.ts`). Stellt über die Obsidian Local REST API eine Verbindung zu einem Obsidian-Vault her.

### Einstellungen

Die Einstellungen für Speicher-Backends werden in der App-Einstellungstabelle gespeichert und über `src/lib/memory/settings.ts` verwaltet:

| Einstellung             | Umgebungs-/Konfigurationsschlüssel | Standard   | Beschreibung                              |
| ----------------------- | ---------------------------------- | ---------- | ----------------------------------------- |
| Primäres Backend        | `memoryPrimaryBackend`             | `"sqlite"` | ID des primären Backends                  |
| Fallback-Backends       | `memoryFallbackBackends`           | `[]`       | Geordnete IDs der Fallback-Backends       |
| Backend-Konfigurationen | `memoryBackendConfigs`             | `{}`       | Konfigurationsüberschreibungen je Backend |

Die Einstellungen werden über `normalizeMemorySettings()` normalisiert und bei `getMemorySettings()` zwischengespeichert.

### Initialisierungsablauf

```
App-Bootstrap
  → index.ts-Importe (Nebeneffekt): registrieren SQLiteBackend
  → initMemoryBackends() wird aus dem App-Lebenszyklus aufgerufen:
      1. Einstellungen laden (getMemorySettings)
      2. Primäres Backend und Fallbacks konfigurieren
      3. Alle Backends initialisieren (Integritätsprüfung)
      4. Bereit für Anfragen
```

### Hinzufügen eines neuen Backends

1. **`MemoryBackend`-Schnittstelle implementieren** in `src/lib/memory/<name>Backend.ts`
2. **Exportieren** aus `src/lib/memory/index.ts`
3. **Registrieren** mit `memoryManager.register(yourBackend)` beim Start
4. **Konfigurieren** über die Einstellungen: `memoryPrimaryBackend` auf die ID Ihres Backends setzen
5. **Testen** mit `src/lib/memory/__tests__/generic-backend.test.ts` als Referenz

#### Beispiel: Brain-Backend

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### Verifizierung

#### Unit-Tests

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Erwartete Ausgabe: **35 Tests, alle erfolgreich**, mit Abdeckung für:

- Konstruktor (2)
- Integritätsprüfung (4) — Erfolg, Fehler 500, Netzwerkfehler, Latenz
- Initialisierung (2) — Erfolg, Fehler
- Erstellen (2) — Standardendpunkt, benutzerdefinierter Endpunkt
- Abrufen (4) — Erfolg, 404 → null, Ausnahme bei anderem Status als 404, benutzerdefinierte Pfadparameter
- Aktualisieren (2) — Erfolg, 404 → false
- Löschen (2) — Erfolg, 404 → false
- Auflisten (2) — Abfrageparameter, benutzerdefinierte Parameternamen
- Suchen (3) — Abfrageparameter, benutzerdefinierter Endpunkt, Serialisierung von Optionen
- Authentifizierungs-Header (2) — Bearer-Token, benutzerdefinierte Header
- Factory (1)

#### Typprüfung

```bash
npm run typecheck:core
```

Erwartet: **0 Fehler**.
