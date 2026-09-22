# Evaluations (Evals) (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Maßgebliche Quelle:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40

OmniRoute enthält ein generisches Evaluierungsframework, mit dem Sie Routing-
Konfigurationen, einzelne Anbieter/Modelle oder die enthaltenen „Golden Set“-Suiten
benchmarken können. Verwenden Sie es, um Routing-Änderungen zu überprüfen, neue
Anbieter zu validieren und Releases abzusichern, bevor sie für den
Produktivverkehr freigegeben werden.

Das Framework besteht aus:

- Einem reinen Runner (`src/lib/evals/evalRunner.ts`), der integrierte Suiten
  im Arbeitsspeicher registriert, Ausgaben anhand erwarteter Kriterien bewertet
  und Scorecards aggregiert.
- Einer Persistenzschicht (`src/lib/db/evals.ts`) für benutzerdefinierte Suiten
  und historische Ausführungen in SQLite.
- Einer Orchestrierungsschicht (`src/lib/evals/runtime.ts`), die jeden Fall
  ausführt, indem sie echte Aufrufe an `POST /v1/chat/completions` sendet,
  Latenz und Ausgaben erfasst und die Ausführung persistiert.
- REST-Endpunkten unter `/api/evals/*` (nur mit Verwaltungs-Authentifizierung).
- Einer Dashboard-Ansicht unter `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Konzepte

### Suite

Eine Suite ist eine benannte Sammlung von Testfällen mit einer `description`
und einem oder mehreren Fällen. Suiten stammen aus zwei Quellen:

| Quelle     | Definiert in                                          | Zur Laufzeit veränderbar? |
| ---------- | ----------------------------------------------------- | ------------------------- |
| `built-in` | Beim Start über `registerSuite()` registriert         | Nein (im Code definiert)  |
| `custom`   | In SQLite in `eval_suites` + `eval_cases` gespeichert | Ja (über API/UI)          |

Die derzeit integrierten Suiten (siehe `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 grundlegende Fälle aus den Bereichen Begrüßung/Mathematik/Übersetzung/Sicherheit
- `coding-proficiency` — Python/JS/SQL/TS/Fehlererkennung
- `reasoning-logic` — Syllogismen, Textaufgaben, Mustererkennung
- `multilingual` — Übersetzung und Spracherkennung
- `safety-guardrails` — personenbezogene Daten, Jailbreak, Ablehnung, Bewusstsein für Verzerrungen
- `instruction-following` — nur JSON, nummerierte Listen, Spracheinschränkungen
- `codex-comparison` — direkte Programmieraufgaben für den Vergleichsmodus

### Fall

Jeder Fall enthält:

| Feld       | Beschreibung                                                           |
| ---------- | ---------------------------------------------------------------------- |
| `id`       | Stabiler Bezeichner (dient als Schlüssel für Ausgaben und Metriken)    |
| `name`     | Menschenlesbare Bezeichnung                                            |
| `model`    | Standardmodell, wenn die Ausführung das Ziel `suite-default` verwendet |
| `input`    | `{ messages, max_tokens? }` — wird an `/v1/chat/completions` gesendet  |
| `expected` | `{ strategy, value }` — Bewertungsraster (siehe unten)                 |
| `tags`     | Optionale Bezeichnungen (z. B. `safety`, `pii`, `jailbreak`)           |

### Ziel

Dieselbe Suite kann für unterschiedliche Ziele ausgeführt werden. Das Zielschema
ist `evalTargetSchema` in `src/shared/validation/schemas.ts`:

| Zieltyp         | `id`       | Verhalten                                                                      |
| --------------- | ---------- | ------------------------------------------------------------------------------ |
| `suite-default` | `null`     | Jeder Fall verwendet sein integriertes `model`-Feld                            |
| `model`         | Modellname | Erzwingt für jeden Fall die Verwendung eines direkten Modells (z. B. `gpt-4o`) |
| `combo`         | Combo-Name | Führt jeden Fall über eine Combo aus (beansprucht die Routing-Engine)          |

Für `model` und `combo` ist das Feld `id` erforderlich (durch Zod
`superRefine` erzwungen). Wenn `compareTarget` angegeben ist, müssen sich beide
Ziele unterscheiden — der Runner persistiert beide Ausführungen unter derselben
`runGroupId`, um einen A/B-Vergleich zu ermöglichen.

## Bewertungsrubriken

Implementiert in `evaluateCase()` (evalRunner.ts):

| Strategie  | Bestanden, wenn …                                                      |
| ---------- | ---------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                      |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`    |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` wahr ergibt            |
| `custom`   | `expected.fn(actualOutput, evalCase)` wahr zurückgibt (nur integriert) |

**Hinweis:** Die Bewertung mittels benutzerdefinierter Funktionen ist auf im Code definierte (integrierte)
Suites beschränkt, da Funktionen nicht über die API serialisiert werden können. Das
`evalCaseBuilderSchema` akzeptiert für von Benutzern erstellte Suites nur
`contains | exact | regex`.

Derzeit gibt es weder einen LLM-as-Judge- noch einen einbettungsbasierten Ähnlichkeits-Scorer — dies wäre
ein klarer Erweiterungspunkt in `evaluateCase()`.

## Datenbankschema

Drei Tabellen (Migrationen `030_create_eval_runs.sql` und
`031_create_eval_suites.sql`):

| Tabelle       | Zweck                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadaten benutzerdefinierter Suites (`id`, `name`, `description`)                                                                    |
| `eval_cases`  | Fälle pro Suite — `input_json`, `expected_*`, `tags_json`                                                                             |
| `eval_runs`   | Historische Ausführungen — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Integrierte Suites werden **nicht** in der DB gespeichert. Sie befinden sich im Arbeitsspeicher und werden
bei jedem Import von `evalRunner.ts` erneut registriert.

## REST-API

Alle Endpunkte erfordern eine Management-Authentifizierung (`requireManagementAuth`) — sie sind
nicht Teil der öffentlichen Proxy-Oberfläche.

| Endpunkt                      | Methode  | Beschreibung                                                                |
| ----------------------------- | -------- | --------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Suites + letzte Ausführungen + Scorecard + Ziele + Schlüssel auflisten      |
| `/api/evals`                  | `POST`   | Eine Suite ausführen (einzeln oder Vergleich) — Schema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Eine Suite abrufen (integriert oder benutzerdefiniert)                      |
| `/api/evals/suites`           | `POST`   | Benutzerdefinierte Suite erstellen — Schema `evalSuiteSaveSchema`           |
| `/api/evals/suites/{suiteId}` | `GET`    | Eine benutzerdefinierte Suite abrufen                                       |
| `/api/evals/suites/{suiteId}` | `PUT`    | Eine benutzerdefinierte Suite ersetzen (Fälle werden neu eingefügt)         |
| `/api/evals/suites/{suiteId}` | `DELETE` | Eine benutzerdefinierte Suite und ihre Fälle löschen                        |

### Eine Suite ausführen

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Optionale Felder:

- `outputs` — `Record<caseId, string>` mit vorberechneten Ausgaben. Wenn angegeben,
  **überspringt der Runner den Versand** und bewertet nur die zwischengespeicherten Ausgaben (nützlich für
  Offline-Auswertungen).
- `compareTarget` — zweites Ziel, das parallel ausgeführt wird; beide Ausführungen teilen sich eine
  generierte `runGroupId` für die direkte Gegenüberstellung.
- `apiKeyId` — interner API-Schlüssel zur Authentifizierung der versendeten
  `/v1/chat/completions`-Aufrufe. Erforderlich, wenn `REQUIRE_API_KEY` aktiviert ist.

### Eine benutzerdefinierte Suite erstellen

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Ausführungspipeline

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Löst die Suite auf (integriert oder benutzerdefiniert).
2. Erstellt für jeden Fall einen `Request` an `/v1/chat/completions` mit den
   `messages` des Falls, dem aufgelösten `model`, `stream: false` und `max_tokens: 512`
   (oder dem Override des Falls).
3. Ruft den Chat-Handler direkt auf (prozessintern — ohne zusätzlichen HTTP-Sprung).
4. Erfasst die Latenz und extrahiert Text entweder aus `choices[0].message.content`
   oder aus der `output[]`-Payload der Responses-API.
5. Bewertet alle Ausgaben über `runSuite()` und persistiert sie anschließend über `saveEvalRun()`.

Die Fälle werden **sequenziell** ausgeführt. Derzeit gibt es kein Parallelitäts-Flag.

## Dashboard

Die Benutzeroberfläche befindet sich unter `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Dort können Sie:

- Integrierte und benutzerdefinierte Suites mit einer Vorschau für jeden einzelnen Fall durchsuchen.
- Benutzerdefinierte Suites mit dem Fall-Builder erstellen, bearbeiten und löschen.
- Ein Ziel auswählen (Suite-Standardeinstellungen / Modell / Combo), optional ein zweites
  `compareTarget` sowie optional einen API-Schlüssel angeben und die Ausführung bei Bedarf starten.
- Den Ausführungsverlauf, Bestehen/Fehlschlagen pro Fall, Latenzen und erfasste Ausgaben untersuchen.
- Die fortlaufende Scorecard anzeigen, die über die jeweils neueste Ausführung pro
  `(suite, target)`-Bereich aggregiert wird.

## Beziehung zum Auto-Assessment-RFC

Ein separates, enger gefasstes Bewertungssubsystem befindet sich unter `src/domain/assessment/`
(siehe auch [AUTO-COMBO.md](../routing/AUTO-COMBO.md) für die produktiv eingesetzte Bewertungs-Engine).
Dieses Subsystem ist auf die Auto-Combo-Engine ausgerichtet — es bewertet Anbieter und
Modelle automatisch, damit Combos sich selbst wiederherstellen können, wenn vorgelagerte Dienste ausfallen. Es verwendet einen eigenen Runner,
eine eigene Kategorisierung und eine eigene Bewertungslogik.

Das hier dokumentierte Evals-Framework ist die **breiter angelegte, universell einsetzbare
Testoberfläche**. Verwenden Sie es vorzugsweise für beliebige Regressions-Suites, A/B-Vergleiche
und Smoke-Tests pro Release. Verwenden Sie das Auto-Assessment-Subsystem, wenn der
Echtzeit-Zustand von Anbietern Routing-Entscheidungen beeinflussen soll.

## CI-Integration

Derzeit gibt es kein dediziertes npm-Skript `eval:ci`. Wenn Sie Releases anhand von
Eval-Ergebnissen sperren möchten, gibt es zwei Möglichkeiten:

- **HTTP-Pfad**: Starten Sie den Server, senden Sie eine Anfrage an `POST /api/evals` mit einer bekannten
  `suiteId` und einem bekannten `target` und prüfen Sie in der Antwort,
  ob `runs[].summary.passRate >= N` gilt.
- **Prozessinterner Pfad**: Importieren Sie `runEvalSuiteAgainstTarget()` aus
  `@/lib/evals/runtime` in ein Skript, führen Sie es gegen eine Testdatenbank aus und prüfen Sie die
  zurückgegebene `PersistedEvalRun.summary`.

Tests für die Route und den Verlauf befinden sich unter
`tests/unit/evals-route.test.ts` und `tests/unit/evals-history.test.ts`.

## Erweiterungspunkte

Häufige Änderungen und die entsprechenden Stellen:

- **Neue Bewertungsstrategie** — erweitern Sie den Block `switch (evalCase.expected.strategy)`
  in `evaluateCase()` (`evalRunner.ts`) und erweitern Sie `EvalCaseStrategy` in
  `src/lib/db/evals.ts` sowie `evalCaseBuilderSchema` in `schemas.ts`.
- **Neue integrierte Suite** — definieren Sie ein Suite-Objekt und rufen Sie am
  Ende von `evalRunner.ts` `registerSuite()` auf. Sie wird von `listSuites()` automatisch erkannt.
- **Parallele Ausführung** — ersetzen Sie die sequenzielle `for`-Schleife in
  `runEvalSuiteAgainstTarget()` durch ein begrenztes `Promise.all` (derzeit gibt es
  keine Parallelitätssteuerung).
- **Streaming-/Tool-Call-Fälle** — derzeit erzwingt der Runner `stream: false`.
  Streaming- oder Tool-fähige Evaluierungen würden Änderungen in `runtime.ts`
  erfordern (SSE-Chunks vor der Bewertung erfassen und aggregieren).

## Siehe auch

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — allgemeine Produktanleitung
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — Referenz zur Anfrage-Pipeline
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto-Combo-Bewertungs-Engine (Live-Laufzeit)
- Quellcode: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Benutzeroberfläche: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
