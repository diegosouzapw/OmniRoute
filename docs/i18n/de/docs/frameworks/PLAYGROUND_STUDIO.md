# Playground Studio (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Feature:** Playground Studio — einheitlicher KI-Testarbeitsbereich für `/dashboard/playground`.
> **Pläne:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Veröffentlicht in v3.8.6

---

## Überblick

Playground Studio verwandelt `/dashboard/playground` von einem einfachen Monaco-basierten Editor in
einen voll ausgestatteten Testarbeitsbereich. Es ersetzt die bisherige `page.tsx` durch eine `PlaygroundStudio`-Shell,
die vier Tabs und einen gemeinsamen Konfigurationsbereich darstellt.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Vergleich] [{} API] [🔧 Erstellen] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {Inhalt des aktiven Tabs}               │ ─ Konfiguration           │
│                                          │ Endpunkt  [Chat ∨]        │
│                                          │ Modell    [gpt-5.4 ∨]     │
│                                          │ System    [Textbereich]   │
│                                          │ Temp.     ▕▕▔▔ 0.7        │
│                                          │ Vorlagen [▾ laden][speich.]│
│                                          │ [✨ Prompt verbessern]     │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Tabs

### Chat-Tab

Entwickelt `ChatPlayground.tsx` zu einer Streaming-Arbeitsumgebung für Dialoge mit mehreren Gesprächsrunden weiter:

- Vollständige Markdown-Darstellung über `MarkdownMessage.tsx` (Codeblöcke, Tabellen, Listen, Links).
- System-Prompt aus dem gemeinsamen Konfigurationsbereich.
- Token/Kosten pro Nachricht (Prompt- und Vervollständigungs-Token).
- Letzte Antwort erneut generieren.
- Sendet Anfragen per SSE-Streaming an `POST /v1/chat/completions`.

### Vergleichs-Tab

Das entscheidende Alleinstellungsmerkmal für einen Proxy: Einen Prompt parallel mit bis zu **4 Modellen** ausführen.

- Bis zu 4 Spalten, die jeweils unabhängig von `/v1/chat/completions` streamen.
- Schaltfläche `+ Modell hinzufügen` (Tastenkürzel Cmd+K) zum Hinzufügen von Spalten.
- `Alle ausführen ▶` startet alle Streams gleichzeitig über `Promise.all` und einen `AbortController` pro Spalte.
- Die globale Aktion **Alle abbrechen** bricht jeden laufenden Stream ab.
- `ProviderMetrics` zeigt pro Spalte TTFT, TPS, Token und geschätzte Kosten in Echtzeit an.
- Metriken sind als **„clientseitige Schätzung“** (D12) gekennzeichnet — gemessen ab dem ersten SSE-Chunk.

### API-Tab

Bewahrt 100 % des ursprünglichen Monaco-Editors für fortgeschrittene Benutzer (D14):

- 10 Endpunkte: Chat-Vervollständigungen, Vervollständigungen, Einbettungen, Bilder, Audio, Sprache, Transkriptionen, Moderationen, Reranking, Suche.
- Multimodaler Datei-Upload.
- SSE-Streaming mit Echtzeitausgabe.
- Als `ApiTab.tsx` gekapselt (Lazy Loading, `ssr: false`).

### Erstellen-Tab

Benutzeroberfläche für Tools/Funktionsaufrufe und strukturierte Ausgaben:

- `ToolsBuilder.tsx` — `tools[]` mit einem JSON-Schema-Editor pro Tool hinzufügen, bearbeiten und entfernen.
  Validiert Parameter über `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — JSON-Modus umschalten und JSON-Schema bearbeiten.
  Validiert die Antwort anhand des Schemas über `StructuredOutputSchema` (Zod).
- Sendet die Anfrage mit `tools[]` und/oder `response_format` an `/v1/chat/completions`.

---

## Konfigurationsbereich (gemeinsam)

`StudioConfigPane.tsx` — immer sichtbar, einklappbar.

| Feld              | Komponente            | Hinweise                                                                          |
| ----------------- | --------------------- | --------------------------------------------------------------------------------- |
| Endpunkt          | `<select>`            | 10 Optionen entsprechend `PlaygroundEndpoint`                                     |
| Modell            | `<input>`             | Freitext, z. B. `openai/gpt-4o`                                                   |
| System-Prompt     | `<textarea>`          | wird an alle Tabs übergeben                                                       |
| Parameter         | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop            |
| Voreinstellungen  | `PresetPicker`        | benannte Konfigurations-Snapshots laden/speichern (in der DB persistiert)         |
| Prompt verbessern | `ImprovePromptButton` | öffnet ein Modal mit Kontingentwarnung, ruft `/api/playground/improve-prompt` auf |

Der Zustand wird nach `PlaygroundStudio.tsx` verlagert und an alle Tabs weitergegeben. Beim Wechseln der Tabs
bleibt der Konfigurationszustand erhalten.

---

## Obere Leiste

`StudioTopBar.tsx`:

- Tab-Umschalter (role="tablist").
- `TokenCostCounter` — Live-Anzeige der Token (↑/↓) und der geschätzten Kosten.
- Schaltfläche zum Exportieren von Code (`</>`) — öffnet `ExportCodeModal`.

---

## Modal für den Code-Export

`ExportCodeModal.tsx` verwendet `codeExport.ts`, um curl-/Python-/TypeScript-Snippets
aus dem aktuellen `PlaygroundState` zu generieren. Der API-Schlüssel-Platzhalter ist immer `$OMNIROUTE_API_KEY` (D11).

---

## Prompt-Verbesserung

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Das Modal warnt: „verbraucht Kontingent“.
2. Nach der Bestätigung wird `{ system, prompt, model, tone }` an die Route gesendet.
3. Die Route ruft intern `/v1/chat/completions` mit `promptImprover.META_SYSTEM_PROMPT` auf.
4. Gibt `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }` zurück.
5. Die Benutzeroberfläche aktualisiert den System-Prompt im Konfigurationsbereich und den Benutzer-Prompt im Chat-Tab.

---

## Voreinstellungen

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Werden in der SQLite-Tabelle `playground_presets` gespeichert (Migration `084_playground_presets.sql`).
- Jede Voreinstellung speichert: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: Liste mit `GET` abrufen, mit `POST` erstellen, mit `GET /:id` abrufen, mit `PUT /:id` aktualisieren, mit `DELETE /:id` löschen.

---

## Stream-Metriken

`useStreamMetrics.ts` + `streamMetrics.ts` (reine Funktion):

- `start()` — zeichnet die Startzeit der Anfrage auf.
- `onFirstChunk()` — zeichnet TTFT auf.
- `onChunk(n)` — summiert die Anzahl der Vervollständigungs-Token.
- `finish(usage?)` — berechnet die endgültigen Metriken: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Preise aus der statischen Tabelle in `src/lib/playground/types.ts` (als „geschätzt“ gekennzeichnet — D13).

---

## Backend-Routen

| Methode  | Pfad                             | Handler                                                                                         |
| -------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Validiert `ImprovePromptRequestSchema` mit Zod; ruft `/v1/chat/completions` mit Meta-Prompt auf |
| `GET`    | `/api/playground/presets`        | Gibt `{ presets: PlaygroundPresetListItem[] }` zurück                                           |
| `POST`   | `/api/playground/presets`        | Erstellt eine Voreinstellung; validiert `PlaygroundPresetCreateSchema`                          |
| `GET`    | `/api/playground/presets/:id`    | Gibt eine Voreinstellung oder 404 zurück                                                        |
| `PUT`    | `/api/playground/presets/:id`    | Teilweise Aktualisierung                                                                        |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                             |

Authentifizierung: optional (`REQUIRE_API_KEY`). Fehler über `buildErrorBody()` (Feste Regel #12).

---

## Wichtige Dateien

| Pfad                                                                       | Zweck                                                   |
| -------------------------------------------------------------------------- | ------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Shell-Komponente, Tab-Orchestrierung                    |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Tabs + Zähler + Export-Schaltfläche                     |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Gemeinsames Konfigurationspanel                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Chat-Arbeitsbereich                                     |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Vergleich mehrerer Modelle                              |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Monaco-Editor (beibehalten)                             |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Tools + strukturierte Ausgabe                           |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modal zum Codeexport                                    |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Einzelne Vergleichsspalte                               |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | TTFT-/TPS-Anzeige                                       |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Clientseitiger Metrik-Hook                              |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | CRUD-Hook für Voreinstellungen                          |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook zur Prompt-Verbesserung                            |
| `src/lib/playground/codeExport.ts`                                         | curl-/Python-/TS-Generator (gemeinsam mit Search Tools) |
| `src/lib/playground/promptImprover.ts`                                     | Meta-Prompt-Builder                                     |
| `src/lib/playground/streamMetrics.ts`                                      | Reine Metrikberechnung                                  |
| `src/lib/db/playgroundPresets.ts`                                          | DB-Modul (CRUD)                                         |
| `src/app/api/playground/improve-prompt/route.ts`                           | REST-Route zur Prompt-Verbesserung                      |
| `src/app/api/playground/presets/route.ts`                                  | Voreinstellungen auflisten + erstellen                  |
| `src/app/api/playground/presets/[id]/route.ts`                             | Voreinstellungen abrufen/aktualisieren/löschen          |
| `src/lib/db/migrations/084_playground_presets.sql`                         | DB-Migration                                            |

---

## Fehlerbehebung

| Symptom                                          | Ursache                                        | Lösung                                                                                                            |
| ------------------------------------------------ | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Monaco-Editor wird im API-Tab nicht dargestellt  | SSR hat Monaco geladen                         | Überprüfen, ob `ApiTab` `dynamic(..., { ssr: false })` verwendet                                                  |
| Vergleichs-Streams werden nacheinander ausgelöst | Falsche Verwendung von `Promise.all`           | Alle Stream-Starts müssen in einem einzigen `Promise.all`-Aufruf ausgelöst werden                                 |
| Metriken zeigen `null` für TTFT                  | Handler für den ersten Chunk nicht eingebunden | Prüfen, ob `useStreamMetrics.onFirstChunk()` in der SSE-Reader-Schleife aufgerufen wird                           |
| Voreinstellung wird nicht gespeichert            | DB-Migration nicht ausgeführt                  | `npm run db:migrate` ausführen oder den Server neu starten (die Migration wird beim Start automatisch ausgeführt) |
| „Prompt verbessern“ gibt 502 zurück              | Modell nicht in der Konfiguration festgelegt   | Vor der Verbesserung muss im Konfigurationsbereich ein Modellname eingegeben werden                               |
| Exportierter Code zeigt `MISSING_API_KEY`        | Platzhalter nicht eingefügt                    | `codeExport.ts` verwendet immer `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                                      |

---

## Referenzen

- Gesamtplan: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Funktionsplan: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Code-Export: `src/lib/playground/codeExport.ts`
- Prompt-Verbesserung: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
