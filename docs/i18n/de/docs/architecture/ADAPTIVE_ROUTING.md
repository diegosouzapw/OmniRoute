# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Dieses Dokument beschreibt die Grundlage für feedbackgesteuertes adaptives Routing, die
OmniRoute hinzugefügt wurde. Sie ist bewusst schlank gehalten: Sie führt einen typisierten
Kanal für Routing-Ergebnisse, ein Online-Qualitätssignal zur Einspeisung in den bestehenden
Auto-Combo-Scorer, einen optionalen OpenTelemetry-Exporter und einen Endpunkt zur
Erklärbarkeit ein. Sie ersetzt **nicht** den bestehenden Resilienz-Stack (Circuit Breaker,
Connection Cooldown, Model Lockout, Health Matrix, Autopilot), sondern ergänzt ihn.

## 1. Architekturkontext

OmniRoute ist eine Datenebene mit einem **Request-Hot-Path** und einer
**Steuerungs-/Intelligenzebene**. Der Hot Path muss schnell, speichereffizient, asynchron,
resilient und vorhersehbar bleiben. Evaluierung, Qualitätsbewertung, Experimente und
historische Analysen gehören zur Steuerungsebene.

```
KI-Agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   Datenebene (schnell, synchron, In-Memory)
│ Routing / Failover  │
│ Zustand / Leitplanke│
│ Cache / Streaming   │
└──────────┬──────────┘
           │ RoutingEvent (Fire-and-Forget, ~0.2µs)
           ▼
┌─────────────────────┐
│ Feedback-Sinks      │   Steuerungsebene (asynchron, Best-Effort)
│ Qualitäts-Tracker   │
│ OTel-Exporter       │
│ Erklärungsspeicher  │
└──────────┬──────────┘
           ▼  Qualitätswert
      Auto-Combo-Scorer
```

### Was bereits vorhanden war (geprüft, nicht dupliziert)

| Konzept                                       | Bestehende Implementierung                                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Verfügbarkeit (können wir Traffic senden?)    | Circuit Breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB-persistiert), Connection Cooldown, Model Lockout    |
| Zustandsberichte                              | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                 |
| Shadow-Traffic                                | `open-sse/services/combo/shadowRouting.ts`                                                              |
| Leitplanken                                   | `src/lib/guardrails/` (Pre-/Post-Hooks)                                                                 |
| Exakter Cache                                 | `src/lib/semanticCache.ts` (signaturbasiert)                                                            |
| Evaluatoren / evaluierungsgesteuertes Routing | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                    |
| Erklärbarkeit von Combo-Entscheidungen        | `open-sse/services/combo/decisionTrace.ts`                                                              |
| Echtzeitereignisse des Dashboards             | `src/lib/events/eventBus.ts` (UI-Benachrichtigungskanal, `unknown`-Payloads, Verlauf mit 100 Einträgen) |

Die Routing-Ereignisebene ist **keine** Neuimplementierung von `eventBus`: Dieser Bus ist
der Echtzeit-Benachrichtigungskanal des Dashboards (typisierte _Ereignisnamen_, opake
Payloads, UI-Konsumenten). `RoutingEvent` ist eine typisierte _Ergebnisstruktur_
(Latenz/Token/Kosten/Ergebnis/Abschlussgrund), die von den Feedback-Sinks der
Steuerungsebene (Qualitäts-Tracker, OTel-Exporter, Erklärungsspeicher) verarbeitet wird.

### Was fehlte (hier hinzugefügt)

1. Ein **typisiertes Routing-Ergebnisereignis samt Sink-Abstraktion** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` ist auf Combos beschränkt und nur In-Memory;
   `comboMetrics` sind kumulative Zähler; `call_logs` ist rohe asynchrone Persistierung.
   Keines davon ist ein typisierter, Sink-basierter Ergebniskanal, den ein Qualitäts-Tracker,
   ein OTel-Exporter oder ein Evaluator im Stil von Future AGI abonnieren kann.
2. Ein **Online-Qualitätssignal** (EWMA) für die Ausgabequalität — zuvor bildete der
   Scorer „Qualität“ nur indirekt über statische Aufgabeneignung und optional aktivierte
   Erfolgsraten von Evaluierungen ab.
3. Ein **optionaler, abhängigkeitsfreier OTel-Exporter**, der die semantischen
   GenAI-Konventionen verwendet.
4. Ein **Endpunkt zur Erklärbarkeit**, der die tatsächlichen Routing-Entscheidungen
   und den Qualitätszustand zurückgibt.

## 2. Routing-Ereignisse (Feedback-Grundlage)

Dateien: `open-sse/services/routing/events.ts`, `.../index.ts`

Ein `RoutingEvent` enthält ausschließlich Routing-Metadaten:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // Union mit Positivliste
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` ist ein Trait nach Art von `Send+Sync` in TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // muss O(1) sein, keine synchrone E/A
}
```

Der Hot Path ruft `emitRoutingEvent(event)` einmal pro abgeschlossener Anfrage auf
(im Callback für Streaming-Abschlüsse, im Erfolgspfad ohne Streaming und im
Fehlerpfad für fehlerhafte 200-Antworten in `handleChatCore`). Die Verteilung
erfolgt synchron per Fan-out an registrierte Sinks, aber jeder Sink reiht lediglich
Ereignisse ein oder aktualisiert den In-Memory-Zustand. **Keine synchronen
Datenbankschreibvorgänge und keine Netzwerk-E/A im Hot Path.**

Standard-Sinks:

- `MemoryRoutingEventStore` — begrenzter Ringpuffer (500), neueste zuerst, für den
  Explain-Endpunkt.
- `QualityTracker`-Consumer — aktualisiert die EWMA-Qualitätsschätzung.
- `OtlpHttpsEventSink` — optional, nur aktiviert, wenn `OMNIROUTE_OTEL_ENDPOINT`
  (oder `OTEL_EXPORTER_OTLP_ENDPOINT`) gesetzt ist.

### Gemessener Overhead (ehrlicher Vergleich)

`npm run bench:routing-events` auf diesem Arbeitsplatzrechner (100.000 Iterationen;
Operationen unterhalb einer Mikrosekunde werden aggregiert in µs/op gemessen, da
die Per-Operation-Perzentile unterhalb der Zeitgeberauflösung von
`performance.now()` liegen):

| Szenario                              | µs/op  | ops/s  |
| ------------------------------------- | ------ | ------ |
| Baseline (nur Scoring)                | ~0.045 | ~22 M  |
| Baseline + RoutingEvent (2 Sinks)     | ~0.168 | ~5.9 M |
| Baseline + Ereignis + OTel-Einreihung | ~0.163 | ~6.1 M |
| Parallel (8 verschachtelte Bursts)    | ~0.18  | —      |

Die Differenz durch die Ereignisverteilung gegenüber dem Baseline-Scoring beträgt
~0,12 µs/Anfrage; der OTel-Sink reiht lediglich ein (O(1)-Puffer-Push) und verursacht
keinen messbaren zusätzlichen Aufwand. Diese Zahlen sind rechnerspezifisch und
relativ — sie stellen keine Produktionsgarantie dar. Der v1-Wert von „~0,2 µs“
war eine aggregierte Schätzung; diese Methodik trennt die Scoring-Baseline von den
Kosten der Ereignisverteilung.

## 3. Qualitätssignal (Feedback-gesteuerter Provider-Zustand)

Dateien: `open-sse/services/routing/quality.ts`

v2 trennt **operative** von **semantischer** Qualität:

- **Operativ** — abgeleitet aus dem Routing-Hot-Path (HTTP 4xx/5xx,
  Verbindungsfehler, 429-Antworten, fehlerhafte Antworten, Stream-Unterbrechungen,
  `finish_reason=length`, erfolgreiche Antworten ohne Ausgabe, Latenz-/TTFT-EWMA).
  Eine 200-Antwort wird NICHT als semantische Qualität behandelt.
- **Semantisch** — der tatsächliche Wert der generierten Ausgabe. Wird
  AUSSCHLIESSLICH von einem Evaluator über `setSemanticQuality()` erzeugt. Der Wert
  ist `null`, bis ein Evaluator ihn bereitstellt, und fließt niemals in den
  operativen Score ein.

Zustand pro (Provider, Modell) (EWMA + begrenzte Zähler):

- `successEwma` — EWMA (α=0,2) des erfolgreichen Ergebnisses.
- `latencyEwma` / `ttftEwma` — EWMA der Latenz (α=0,1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — wie lange die letzte Beobachtung des Modells zurückliegt.

### Berücksichtigung von Konfidenz und Stichprobengröße

`confidence = clamp01(samples / 50)`, und der an den Scorer zurückgegebene Score
wird in Richtung des neutralen Mittelpunkts gewichtet:

```
score = 0.5 + confidence * (operational - 0.5)
```

Auswirkungen (durch Tests verifiziert):

- Ein kalter Provider (0 Stichproben) erhält den Score **0,5** — er wird nicht
  unfair benachteiligt, kann aber einen Provider mit Tausenden solider
  Beobachtungen nicht übertreffen.
- Ein Provider mit 7 zufälligen Erfolgen wird in Richtung 0,5 gezogen (und kann
  aufgrund optimistischer Initialisierung niemals dominieren).
- Ein Provider mit mindestens 50 Stichproben konvergiert gegen seinen tatsächlichen
  operativen Score.
- Verschlechterung und Erholung erfolgen schrittweise (EWMA), und ein einzelner
  isolierter Fehler ruiniert keinen ansonsten zuverlässigen Provider.

`ProviderQuality` stellt `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` bereit.

Dies fließt als Scoring-Faktor `quality` in den Auto-Combo-Scorer ein:

- `ScoringFactors.quality` / `ScoringWeights.quality` in
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0,1905 → 0,1605, `quality` 0,03. Die Summe bleibt 1,0.
- `buildAutoCandidates` befüllt `candidate.quality` aus dem Tracker; Kandidaten
  ohne Daten erhalten standardmäßig den neutralen Wert **0,5** (ein kalter Kandidat
  wird weder bevorzugt noch benachteiligt).

Der geschlossene Regelkreis:

```
RoutingEvent → QualityTracker → getQualityScore → Auto-Combo-Qualitätsfaktor
      ↑                                                    │
      └────── Anfrageergebnis (handleChatCore) ←────────────┘
```

### Harter Ausschluss gegenüber weicher Abwertung

Das Qualitätssignal ist lediglich eine **weiche adaptive Präferenz**. Der harte
Ausschluss verbleibt beim bestehenden Resilienz-Stack: Circuit Breaker OPEN,
erschöpfte Quote, Authentifizierungsfehler, Modellsperre — nichts davon wird durch
den Qualitätsscore beeinflusst. Ein Provider, dessen Qualitätsscore vorübergehend
sinkt, wird weniger bevorzugt, aber niemals vollständig deaktiviert.

## 3b. Kanonisches Stream-Timing (TTFT / ITL)

Dateien: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` ist der zentrale Instrumentierungspunkt für den Streaming-Pfad,
der in `createSSEStream` (`open-sse/utils/stream.ts`) eingebunden ist:

- `markByte()` — erster empfangener Upstream-Chunk.
- `markForward()` — erster an den Client weitergeleiteter Chunk (wird für TTFT verwendet).
- `markInterrupted()` — Stream-Timeout/-Abbruch/-Fehler vor einem regulären Abschluss.
- `ttft()` = Latenz bis zum ersten weitergeleiteten SSE-Chunk. **Dies ist KEINE TTFT auf Token-Ebene** —
  ein einzelner SSE-Chunk kann null, ein oder mehrere Token enthalten. Präzise dokumentiert.
- `avgItlMs()` = mittlerer Abstand zwischen Chunks (ein Chunk-Latenz-Proxy für ITL).

TTFT/ITL/Unterbrechungsstatus fließen in das `RoutingEvent` (`ttftMs`, `itlMs`) ein und werden
von der OTel-Senke als GenAI-/OmniRoute-Span-Attribute exportiert.

## 4. OpenTelemetry-/GenAI-Beobachtbarkeit

Dateien: `open-sse/services/routing/otel.ts`

- Abhängigkeitsfreier OTLP/HTTP-JSON-Exporter (verwendet das globale `fetch`, kein
  `@opentelemetry/*`-SDK).
- Spans folgen den semantischen GenAI-Konventionen (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) sowie den OmniRoute-Routing-
  Attributen (Ergebnis, Status, TTFT, Wiederholungsversuche, Fallback).
- `record()` reiht Elemente lediglich in einen begrenzten Puffer ein (O(1)); ein Hintergrund-Timer
  überträgt sie asynchron mittels `POST {endpoint}/v1/traces`. Bei Überlast werden die
  ältesten Ereignisse verworfen (`dropped`-Zähler) — die Datenebene wird niemals durch
  Backpressure belastet.
- **Deaktiviert, sofern nicht konfiguriert.** `OMNIROUTE_OTEL_ENDPOINT` (oder
  `OTEL_EXPORTER_OTLP_ENDPOINT`) muss gesetzt sein; andernfalls wird die Senke nicht
  registriert und es wird kein OTel-Code ausgeführt.

## 5. Erklärbarkeit

- `GET /v1/explain/routing` gibt die neuesten `RoutingEvent`s (die tatsächlichen
  Entscheidungen, neueste zuerst) sowie die Qualitätsübersicht pro Anbieter/Modell zurück.
- Die Authentifizierung entspricht `/v1/combos` (Bearer-API-Schlüssel oder Dashboard-Sitzung;
  anonymer Zugriff bei lokalen Einzelbenutzer-Bereitstellungen mit `REQUIRE_API_KEY=false`).
- Aufrufbezogene Traces auf Combo-Ebene bleiben über die bestehende
  `decisionTrace.ts` verfügbar (Header `X-OmniRoute-Combo-Trace`).
- Sicherheit: Ereignisse enthalten ausschließlich Routing-Metadaten, niemals Prompts,
  Request-Bodys oder Zugangsdaten.

## 6. Integration der Evaluierungsebene (Vorbereitung auf Future AGI)

OmniRoute behandelt Future AGI (oder jeden anderen Evaluator) als **potenzielles
Intelligenz-/Evaluierungs-Backend, nicht als Abhängigkeit**. Die Integrationspunkte:

- Eine `RoutingEventSink` kann Ereignisse asynchron an einen Evaluator weiterleiten.
- Der `MemoryRoutingEventStore` und die Qualitätsübersicht stellen einem Evaluator den
  unverarbeiteten Entscheidungsstrom bereit.
- Ein zukünftiger `Evaluator` (deterministisch, lokaler Judge, HTTP, WASM) würde
  Ereignisse/Traces verarbeiten und einen `QualityScore` zurückgeben, der in denselben
  `getQualityScore`-/Qualitätsfaktor-Pfad einfließt.
- Das bestehende evaluierungsgesteuerte Routing (`open-sse/services/evalRouting.ts`)
  ordnet Combo-Ziele bereits anhand der Erfolgsraten von `eval_runs` neu, wenn es aktiviert ist.

Auf dem Request-Pfad werden keine Evaluierungen synchron ausgeführt, und das Gateway
funktioniert auch ohne Evaluator vollständig.

## 7. Abschließende Architekturüberprüfung

1. **Was verbleibt auf dem synchronen Hot Path?** Routing/Scoring, Guardrail-
   Vorabprüfungen, Cache-Lookup und ein `emitRoutingEvent`-Fan-out (~0,12 µs
   zusätzlich zum Basis-Scoring) an In-Memory-Senken.
2. **Was wurde in die asynchrone Verarbeitung verschoben?** OTel-Export (Timer + Fetch),
   Persistierung von `call_logs`/Nutzung, Schreibvorgänge in den semantischen Cache;
   die Qualitätsverarbeitung erfolgt im Arbeitsspeicher und in O(1) (keine asynchrone
   Verarbeitung erforderlich).
3. **Wie wird ein Routing-Ergebnis zu Feedback?** `handleChatCore` emittiert ein
   `RoutingEvent` → `QualityTracker` aktualisiert den EWMA-Zustand → `getQualityScore`
   speist den `quality`-Faktor der automatischen Combo.
4. **Wie beeinflusst die Qualität zukünftiges Routing?** Ein niedriger Qualitätsscore
   reduziert den gewichteten Score dieses Anbieters/Modells in `scoreAutoTargets`,
   sodass beeinträchtigte Modelle schrittweise seltener bevorzugt werden und sich
   wieder erholen, wenn sich ihr EWMA verbessert.
5. **Wie kann Future AGI integriert werden, ohne zu einer Abhängigkeit zu werden?** Über
   die `RoutingEventSink`-Schnittstelle bzw. einen zukünftigen `Evaluator`-Adapter —
   ohne hartcodierte Abhängigkeit.
6. **Was geschieht, wenn der Evaluator nicht verfügbar ist?** Das Routing bleibt
   unbeeinflusst; für Modelle ohne beobachtetes Signal wird die Qualität auf den
   neutralen Wert (1.0) zurückgesetzt.
7. **Was geschieht, wenn die Telemetrie nicht verfügbar ist?** Die OTel-Senke wird
   einfach nicht registriert; der Rest der Routing-Schicht wird unverändert ausgeführt.
8. **Was geschieht bei Überlast?** Der OTel-Puffer verwirft die ältesten Ereignisse;
   die Qualitätsdaten und der Ringpuffer sind konstruktionsbedingt begrenzt; es gibt
   keine Backpressure.
9. **Wie erholt sich der Anbieterzustand nach einer Beeinträchtigung?** Der EWMA
   konvergiert erneut, während sich erfolgreiche Aufrufe ansammeln; das Warm-up hält
   neue Modelle neutral; der Circuit Breaker erholt sich unabhängig davon über
   HALF_OPEN-Probes.
10. **Welche vorgeschlagenen Funktionen wurden bewusst NICHT implementiert und warum?**
    - Shadow Traffic / Experimente — bereits implementiert
      (`combo/shadowRouting.ts`); nicht erneut erstellt.
    - Guardrails — bereits implementiert (`src/lib/guardrails/`); nicht dupliziert.
    - Semantischer Cache — bereits implementiert (`src/lib/semanticCache.ts`); nicht
      dupliziert.
    - Eine vollständige Plattform für Experimentverwaltung, Dataset-Werkzeuge, eine
      Plattform zur Prompt-Optimierung, eine Vektordatenbank oder eine obligatorische
      externe OTel-Infrastruktur — außerhalb des Umfangs einer schlanken Datenebene.
    - Ein Rust-`RoutingEvent`-Struct — die Datenebene ist in TypeScript implementiert;
      der TS-Typ ist das entsprechend angepasste Äquivalent.

## 8. Konfigurationsreferenz

| Variable                      | Standardwert  | Auswirkung                                                                             |
| ----------------------------- | ------------- | -------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | nicht gesetzt | Aktiviert, wenn gesetzt, den OTLP/HTTP-Trace-Exporter (z. B. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | nicht gesetzt | Fallback-Alias für den OTLP-Endpunkt.                                                  |
| `OTEL_SERVICE_NAME`           | `omniroute`   | Ressourcenattribut `service.name`.                                                     |

## 9. Tests

- `tests/unit/routing-events.test.ts` — Ereignisnormalisierung, Statusklassifizierung, begrenzter Ringpuffer, Sink-Verteilung und -Isolation.
- `tests/unit/routing-quality.test.ts` — EWMA-Aufwärmphase, Wiederherstellung nach Fehlern/Erfolgen, Anomaliestrafen, vorübergehende Behandlung von 429-Fehlern, Snapshot, Zurücksetzen.
- `tests/unit/routing-scoring-quality.test.ts` — Gewichtungsintegrität, neutraler Standardwert, Rangfolge nach Qualitätsfaktor.
- `tests/unit/routing-otel.test.ts` — Aktivierungssteuerung, GenAI-Span-Nutzdaten, asynchrones Leeren, Verwerfen bei Überlastung.
- `tests/unit/routing-events-concurrency.test.ts` — Tausende Ereignisse, Größenbegrenzung des Ringpuffers, Isolation fehlerauslösender Sinks, verschachtelte asynchrone Bursts, Zurücksetzen während Einfügevorgängen.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministische End-to-End-Schleife über den echten `scoreAutoTargets`-Scorer: stabil → Verschlechterung → Erholung → kurzfristige Störung, zusätzlich Kaltstart- und „glücklicher kalter Anbieter“-Szenarien.
- `tests/unit/stream-timing.test.ts` — TTFT (erster weitergeleiteter Chunk), ITL, erstes Byte gegenüber erster Weiterleitung, Unterbrechung, Sicherheit bei fehlerhaften/leeren Chunks.

## 10. Status bereits bestehender Probleme (Phase 18)

| Problem                                                  | Status                         | Hinweise                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Export-Diskrepanz bei `omniglyph`                        | **BEHOBEN (umgebungsbedingt)** | `node_modules` war nicht mit `package-lock.json` synchronisiert (installiert war 1.3.1, gesperrt war 1.4.0). Durch Ausführen von `npm install omniglyph@1.4.0` wurde die gesperrte Version wiederhergestellt; die Anzahl der Typfehler sank auf 0. Manifeste unverändert.                                                |
| Veraltete `getKnownContextOverflow`-Tests                | **BEKANNT — nicht behoben**    | `combo-context-overflow-compression-probe.test.ts` importiert eine Funktion, die in `open-sse/services/combo.ts` nicht mehr vorhanden ist (nur Kommentare verweisen darauf). Eine Behebung erfordert die Neuimplementierung der Funktion oder das Neuschreiben dieser Tests — eine sachfremde architektonische Änderung. |
| DB-Isolation in `combo-runtime-unit-concurrency.test.ts` | **BEKANNT — nicht behoben**    | Die SQLite-Isolationsprüfung des Test-Harness schlägt bei direkter Ausführung fehl; auf dem Basis-Branch tritt derselbe Fehler auf.                                                                                                                                                                                      |
| Abweichung bei i18n-`llm.txt`                            | **BEKANNT — nicht behoben**    | `docs/i18n/*/llm.txt` unterscheiden sich von der Root-Version; dies bestand bereits zuvor und blockiert die Pre-Commit-Prüfung zur Dokumentationssynchronisierung.                                                                                                                                                       |

Umgebungs- und Codeprobleme werden getrennt behandelt; keine sachfremden Fehler werden hinter geänderten Testfiltern verborgen.
