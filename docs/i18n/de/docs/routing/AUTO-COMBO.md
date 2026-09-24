# OmniRoute Auto-Combo Engine (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Für Benutzer**: Sie suchen einen schnellen Einstieg? Einfache Erklärungen und Beispiele finden Sie im [Auto-Combo-Benutzerhandbuch](../getting-started/AUTO-COMBO-GUIDE.md).

> Selbstverwaltende Modellketten mit adaptiver Bewertung und konfigurationsfreiem automatischem Routing

## Konfigurationsfreies automatisches Routing (`auto/`-Präfix)

> **NEU:** Keine Combo-Erstellung erforderlich. Verwenden Sie das Präfix `auto/` direkt in einem beliebigen Client.

### Kurze Beispiele

| Modell-ID      | Variante | Verhalten                                                                         |
| -------------- | -------- | --------------------------------------------------------------------------------- |
| `auto`         | Standard | Alle verbundenen Provider, LKGP-Strategie, ausgewogene Gewichtungen               |
| `auto/coding`  | Coding   | Qualitätsorientierte Gewichtungen, geeignet für die Codegenerierung               |
| `auto/fast`    | Schnell  | Gewichtete Auswahl mit niedriger Latenz                                           |
| `auto/cheap`   | Günstig  | Kostenoptimiertes Routing (niedrigste Kosten zuerst)                              |
| `auto/offline` | Offline  | Bevorzugt Provider mit der höchsten verfügbaren Quote                             |
| `auto/smart`   | Smart    | Qualitätsorientiert + höhere Explorationsrate (10 %) zur besseren Modellerkennung |
| `auto/lkgp`    | LKGP     | Explizites LKGP (identisch mit dem Standard `auto`)                               |
| `auto/chaos`   | Chaos    | Gewichtungen zur Fehlerinjektion für Resilienztests (Chaos Engineering)           |

### Zusammensetzung aus Kategorie × Stufe (`auto/<category>:<tier>`)

Suffixe im OpenRouter-Stil trennen **die Art der Route** (Kategorie) von **ihrer Optimierung** (Stufe), sodass sie frei kombiniert werden können (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorien** (filtern den Kandidatenpool nach Fähigkeit): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` behalten visionsfähige Modelle bei; `reasoning` behält Reasoning-/Thinking-Modelle bei.
- **Stufen** (bestimmen die Bewertungsgewichtungen bzw. den Poolfilter): `fast` (schnelle Auslieferung) · `cheap` (Alias `floor`, kostensparend) · `reliable` (Circuit-Breaker-Zustand + Latenzstabilität) · `free` / `pro` (filtern den Pool über `classifyTier` nach Modellstufe — kostenlose gegenüber Premium-Stufe).

| Beispiel               | Wird aufgelöst zu                                              |
| ---------------------- | -------------------------------------------------------------- |
| `auto/coding:fast`     | Coding-Pool, Gewichtungen für niedrige Latenz                  |
| `auto/coding:cheap`    | Coding-Pool, kostenoptimiert (Alias `auto/coding:floor`)       |
| `auto/reasoning:pro`   | Nur Reasoning-/Thinking-Modelle, Premium-Stufe                 |
| `auto/vision`          | Visionsfähige Modelle (keine Stufe → ausgewogene Gewichtungen) |
| `auto/multimodal:free` | Multimodal-fähige Modelle, nur kostenlose Stufe                |

Jedes gültige `auto/<category>[:<tier>]` wird bei Bedarf aufgelöst; eine kuratierte Teilmenge wird in `/v1/models` und im Dashboard angeboten (`AUTO_SUFFIX_VARIANTS` in `open-sse/services/autoCombo/builtinCatalog.ts`). Die Filterung ist **ausfallsicher offen** — wenn keine verbundenen Modelle einer Einschränkung entsprechen, wird der vollständige Pool verwendet, damit das Routing niemals ausfällt. Der zentrale Scorer (`combo.ts`) bleibt unverändert; der Kategorie-/Stufenfilter wird in `buildAutoCandidates` angewendet.

> **Live-Modellinformationen:** Die Eignungsbewertung für das automatische Routing basiert auf aktuellen **Arena-ELO**-Ranglisten und **models.dev**-Stufendaten, wenn das Flag `ARENA_ELO_SYNC_ENABLED` aktiviert ist (andernfalls wird auf die statische Eignungstabelle zurückgegriffen).

**Verwendung:**

```bash
# Beliebiges IDE- oder CLI-Tool, das das OpenAI-Format unterstützt
Basis-URL: http://localhost:20128/v1
API-Schlüssel:  <Ihr-Endpunkt-Schlüssel>

# Legen Sie in Ihrem Code/Ihrer Konfiguration das Modell wie folgt fest:
model: "auto"                 # ausgewogener Standard
model: "auto/coding"          # am besten für Coding-Aufgaben
model: "auto/fast"            # schnellstes verfügbares Modell
model: "auto/cheap"           # günstigstes Modell pro Token
```

**Was geschieht:**

1. OmniRoute erkennt das Präfix `auto/` in `src/sse/handlers/chat.ts`
2. Fragt alle **aktiven Provider-Verbindungen** aus der Datenbank ab
3. Filtert nach Verbindungen mit gültigen Anmeldedaten (API-Schlüssel oder OAuth-Token)
4. Bestimmt das Modell pro Verbindung (`connection.defaultModel` oder das erste Modell des Providers)
5. Erstellt eine **virtuelle Combo** im Arbeitsspeicher (wird nicht in der DB gespeichert)
6. Führt das Routing mit dem Gewichtungsprofil der ausgewählten Variante und der LKGP-Strategie durch

**Wesentliche Eigenschaften:**

- ✅ **Immer aktiv:** Kein Umschalter, keine Combo-Erstellung und keine Konfiguration erforderlich
- ✅ **Dynamisch:** Bildet die aktuell verbundenen Provider automatisch ab
- ✅ **Sitzungsbindung:** LKGP stellt sicher, dass der zuletzt erfolgreiche Provider priorisiert wird
- ✅ **Unterstützung mehrerer Konten:** Jede Provider-Verbindung wird zu einem separaten Kandidaten
- ✅ **Keine DB-Schreibvorgänge:** Die virtuelle Combo existiert nur für die Anfrage, ohne Persistenz-Overhead

### Kandidatensteuerung pro Schlüssel (#7819, Stufe 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = das Suffix nach `auto/` oder
das Literal `auto` für den Basiskanal) ist ein **schreibgeschützter** Endpunkt, der den
aktuellen Kandidatenpool eines `auto/*`-Kanals samt Live-Erreichbarkeit auflistet und
dafür die vorhandenen Resilienzabfragen wiederverwendet (niemals den rohen Breaker-`state`):

- Provider-Circuit-Breaker — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- Verbindungs-Cooldown — `rateLimitedUntil` / `testStatus` in der aufgelösten
  `provider_connections`-Zeile
- Modellsperre — `isModelLocked(provider, connectionId, model)`

Jeder Kandidat enthält außerdem das Flag `excluded` dieses API-Schlüssels. Ausschlüsse werden
pro API-Schlüssel gespeichert (Tabelle `auto_candidate_overrides`, Migration `128`) — OmniRoute ist
eine Single-Tenant-Anwendung ohne Tabelle `users`, daher ist `apiKeyId` die am ehesten geeignete
reale Identität pro Aufrufer — und am Engpasspunkt des Kandidatenpools in
`open-sse/services/autoCombo/virtualFactory.ts` über die reine, durch Unit-Tests geprüfte Funktion
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`) durchgesetzt.
Der Filter ist **ausfallsicher offen**: Sowohl eine nicht festgelegte apiKeyId bzw. ein nicht
festgelegter Kanal als auch ein fehlgeschlagener DB-Lookup lassen den Pool ungefiltert, sodass
ein Betreiber ohne konfigurierte Überschreibungen ein Routing erhält, das auf Byte-Ebene mit
dem Verhalten vor Einführung dieser Funktion identisch ist.

**Auf ein Folge-Issue verschoben:** Gewichtungen pro Kandidat + explizite Reihenfolge (Level 3
— fließt in die bestehenden gewichteten/Prioritätsstrategie-Pfade ein) und Festlegung einer bestimmten
`combo.ts`-Strategie pro `auto/*`-Kanal (Level 4). Siehe den Plan zu #7819 bezüglich der offenen
Frage, ob Überschreibungen weiterhin pro API-Schlüssel gelten oder angesichts des
Single-Tenant-Modells global werden sollen.

**Hinter den Kulissen:**

```txt
Anfrage: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts erkennt das Präfix
   ↓
createVirtualAutoCombo('coding') → candidatePool aus aktiven Verbindungen
   ↓
handleComboChat (dieselbe Engine wie für persistierte Kombinationen)
   ↓
Automatische Bewertung wählt pro Anfrage den besten Anbieter/das beste Modell aus
```

**Implementierungsdateien:**

| Datei                                                     | Zweck                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Präfix-Parser (`parseAutoPrefix`)                             |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Erstellt virtuelle `AutoComboConfig`-Objekte                  |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Test-Hook zum Mocking der Anbieter-Registry                   |
| `src/sse/handlers/chat.ts`                                | Integration: Kurzschlussverarbeitung für automatische Präfixe |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto`-Systemeintrag                         |

## Combo-Namen, die einer echten Modell-ID entsprechen

Eine Combo, deren `name` mit einer reinen Modell-ID identisch ist (z. B. eine Combo namens
`gpt-5.5`), ist ein **beabsichtigtes und unterstütztes Muster** und kein Fehler: Es handelt sich um den
in [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940) dokumentierten Mechanismus für einen Provider-Fallback pro Modell-ID. Da die Combo-Auflösung vor der Auflösung reiner Modell-IDs geprüft wird
(`getComboForModel()` in `src/sse/services/model.ts`), wird eine Anfrage für die reine
ID `gpt-5.5` über die Ziele der Combo (z. B.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) geleitet, anstatt direkt an
einen einzelnen Provider zu gehen — dabei wird die für
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) implementierte Priorität „Combo vor Umschreibung“ wiederverwendet und durch `tests/unit/responses-combo-resolution-3227.test.ts` sowie
`tests/unit/combo-name-codex-responses-rewrite.test.ts` auf Regressionen getestet.

Das Erstellen oder Umbenennen einer Combo auf einen Namen, der eine echte Modell-ID überschattet, wird
**niemals abgelehnt** — andernfalls würde dieser dokumentierte Workflow nicht mehr funktionieren. Stattdessen
fügen `POST /api/combos` und `PUT /api/combos/[id]` (#8530) der Antwort ein nicht blockierendes
`warning`-Feld hinzu, wenn der (neue) Name mit einer echten
Modell-ID kollidiert:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Beim Start protokolliert `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) außerdem eine einzeilige `[STARTUP]`-Warnung,
die jede vorhandene Combo aufführt, die eine Modell-ID überschattet, sodass Betreiber, bei denen dies versehentlich auftritt (statt wie gemäß #6940 beabsichtigt), einen entsprechenden Hinweis erhalten.
Die Hilfsfunktion zur Erkennung befindet sich in `src/lib/combos/modelNameCollision.ts`.

## Aufrufen einer benutzerdefinierten Combo über einen Client

Persistierte Combos (Einstellungen → Combos) werden nur verwendet, wenn der Client den **exakten Namen** der Combo im Feld `model` sendet — es gibt weder eine unscharfe noch eine partielle Übereinstimmung mit dem Combo-Namen und es wird auch kein Präfix `auto/` verwendet. Reihenfolge der Auflösung (`getComboForModel()` in `src/sse/services/model.ts`):

1. exakte Übereinstimmung mit dem Combo-Namen (`model: "my-combo"`),
2. Präfix `combo/<name>` (`model: "combo/my-combo"`),
3. Glob-Zuordnungen von Modell zu Combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Zwei häufige Stolperfallen:

- **`auto` verwendet Ihre Combos nicht.** `auto`/`auto/*` erstellt einen eigenen konfigurationsfreien Kandidatenpool und berücksichtigt persistierte Combos nur dann, wenn eine Combo tatsächlich `auto` heißt (nicht empfohlen). Um über eine Combo zu routen, senden Sie deren exakten Namen — nicht `auto`.
- **`openrouter/auto` ist ein echtes kostenpflichtiges OpenRouter-Produkt** („Auto Best Available“) und kein OmniRoute-Alias. Es ist der einzige statische Modelleintrag der OpenRouter-Registry (`open-sse/config/providers/registry/openrouter/index.ts`) und wird separat abgerechnet. Verwenden Sie Einstellungen → Routing → Kostenpflichtige Modelle ausblenden, um es aus `auto`-Pools auszuschließen.

Siehe [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) und [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) zu den ursprünglichen Missverständnissen, die hier dokumentiert werden.

## Funktionsweise (persistierte Auto-Combos)

Die Auto-Combo-Engine wählt mithilfe einer **Bewertungsfunktion mit 16 Faktoren** (definiert in `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`) dynamisch den besten Anbieter bzw. das beste Modell für jede Anfrage aus. Die Standardgewichtungen ergeben in Summe `1.0`; benutzerdefinierte Gewichtungen werden durch `normalizeScoringWeights()` neu normalisiert. Zwei der sechzehn Faktoren — `cacheAffinity` und `resetWindowAffinity` — haben standardmäßig eine Gewichtung von `0`; `reliability` hat in `DEFAULT_WEIGHTS` die Gewichtung `0`, aber `0.03` in allgemeinen Paketen und `0.04` in `reliability-first`, während `quality` in Paketen die Gewichtung `0.02` hat (`0.03` in `quality-first`): Sie werden dennoch für jeden Kandidaten berechnet, und `cacheAffinity` steuert die Prompt-Cache-Deduplizierung außerhalb der Bewertung. Daher fließen die standardmäßig mit null gewichteten Faktoren lediglich standardmäßig nicht in die Entscheidung ein, während sie dies bei Paketen tun.

![Auto-Combo-Bewertung mit 16 Faktoren](../diagrams/exported/auto-combo-scoring.svg)

> Quelle: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (Neugenerierung über `npm run docs:render-diagrams`). Der Dateiname ist historisch bedingt; die Quelle und das gerenderte Diagramm zeigen alle 16 in `DEFAULT_WEIGHTS` deklarierten Faktoren.

| Faktor                | Standardgewichtung | Beschreibung                                                                                                                                                                                                                                             |
| :-------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429             | Verbleibendes Kontingent bzw. verbleibender Spielraum bis zum Ratenlimit [0..1]                                                                                                                                                                          |
| `health`              | 0.1605             | Zustandswert des Circuit Breakers (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                                  |
| `costInv`             | 0.1429             | Inverse **kombinierte** Kosten (60 % Preis für Eingabe- + 40 % Preis für Ausgabetoken, normalisiert) — günstiger = höhere Bewertung                                                                                                                      |
| `latencyInv`          | 0.1143             | Inverse p95-Latenz, auf den Pool normalisiert — schneller = höhere Bewertung                                                                                                                                                                             |
| `taskFit`             | 0.0762             | Eignung für den Aufgabentyp (Programmierung, Review, Planung, Analyse, Debugging, Dokumentation)                                                                                                                                                         |
| `stability`           | 0.0476             | Varianzbasierte Stabilität anhand der Standardabweichung der Latenz — ein Kandidat mit stark schwankender Antwortzeit erhält eine niedrigere Bewertung                                                                                                   |
| `tierPriority`        | 0.0476             | Priorität der Kontostufe — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                                  |
| `tierAffinity`        | 0.0476             | Affinität zwischen der Stufe des Kandidaten und der im Manifest empfohlenen Stufe                                                                                                                                                                        |
| `specificityMatch`    | 0.0476             | Übereinstimmung zwischen der Spezifität der Anfrage (Manifest-Hinweis) und der Modellstufe                                                                                                                                                               |
| `contextAffinity`     | 0.0476             | Affinität zwischen dem Kontextfensterbedarf der Anfrage und dem Kontextfenster des Modells                                                                                                                                                               |
| `sessionAvailability` | 0.0476             | Verfügbarkeit der OAuth-Sitzung der Kandidatenverbindung für diese Sitzung (`getOAuthSessionAvailability()`; Nicht-OAuth-Verbindungen erhalten die Bewertung 1.0)                                                                                        |
| `connectionDensity`   | 0.0476             | Verteilt die Last auf Verbindungen desselben Anbieters (gegen Konzentration)                                                                                                                                                                             |
| `cacheAffinity`       | 0.00               | Rendezvous-Hash-Affinität zu der Verbindung, die höchstwahrscheinlich bereits das Prompt-Cache-Präfix dieser Anfrage enthält (`open-sse/services/combo/promptCacheAffinity.ts`); standardmäßig deaktiviert (#8008)                                       |
| `resetWindowAffinity` | 0.00               | Bevorzugung von Verbindungen mit einem günstigen Zeitfenster für die Kontingentzurücksetzung (standardmäßig deaktiviert)                                                                                                                                 |
| `quality`             | 0.03               | Feedbackgesteuertes Signal für die Ausgabequalität aus dem Qualitäts-Tracker für Routing-Ereignisse; Kandidaten ohne Beobachtungen erhalten den neutralen Wert 0.5                                                                                       |
| `reliability`         | 0.00               | Beobachteter Erfolgsanteil, `1 - failureRate`, aus dem Nutzungsverlauf der letzten 24 Stunden ab einer Mindestanzahl von zehn Stichproben (andernfalls Echtzeitmetriken); Kandidaten ohne Beobachtungen erhalten den Wert 1.0. Standardmäßig deaktiviert |

**Summe:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, wie in `DEFAULT_WEIGHTS` deklariert; benutzerdefinierte Gewichtungen werden vor der Bewertung durch `normalizeScoringWeights()` neu zu einer Verteilung normalisiert.

## Modus-Pakete

6 vordefinierte Gewichtungsprofile in `open-sse/services/autoCombo/modePacks.ts`. Jedes Paket ersetzt die Standardgewichtungen vollständig, um die Auswahl auf ein bestimmtes Ziel auszurichten. Jedes Paket ergibt bereits in Summe `1.0` (`0.9999` bei Ausgabe mit vier Dezimalstellen), sodass `normalizeScoringWeights()` nichts Wesentliches korrigieren muss, wenn ein Paket aktiv ist — die folgenden Werte entsprechen, abgesehen von Rundungsabweichungen, den vom Bewertungssystem verwendeten Werten.

| Faktor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Hinweise:

- **Pakete enthalten `quality` und `reliability`** (`quality 0.02`, bei `quality-first 0.03`; `reliability 0.03`, bei `reliability-first 0.04`) und ersetzen die Gewichtungszuordnung vollständig (`weights = pack`, keine Zusammenführung). `DEFAULT_WEIGHTS` enthält `quality 0.03 / reliability 0`; bei Auswahl von `balanced`/`default` bleiben diese Standardwerte erhalten, während bei Auswahl eines Pakets die oben aufgeführten Werte verwendet werden. Bei einem kalten Pool (noch keine Beobachtungen, daher `quality 0.5` und `reliability 1`) erhöhen diese beiden Faktoren den Wert unter einem generischen Paket um `+0.04` (`0.03 + 0.01`), unter `quality-first` um `+0.045` und unter `reliability-first` um `+0.05`.
- `tierAffinity`, `specificityMatch` und `resetWindowAffinity` sind in jedem Paket explizit auf `0` gesetzt.
- Die Schwerpunkte der einzelnen Pakete auf einen Blick:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (Verbindungen mit niedriger Latenz und gutem Zustand)
  - **cost-saver** → costInv 0.3324 (die günstigsten Token gewinnen)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, der höchste Wert aller Pakete (bestes Modell für die Aufgabe, konsistent)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maximaler Spielraum, unabhängig von Geschwindigkeit/Kosten)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, der höchste Wert aller Pakete (wenigste Überraschungen)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (Fehlerinjektionsprofil)

### Anfragebezogene Steuerung (Header) — #6023 / #6024 / #6025 / #3470

Eine `auto`-Kombination kann **für jede Anfrage** über drei Header gesteuert werden, ohne die
gespeicherte Konfiguration der Kombination zu verändern. Diese gelten nur für die Strategie `auto` und nur für die Anfrage,
die sie enthält; die gespeicherten Werte `modePack`/`budgetCap`/`budgetFallback` der Kombination werden verwendet,
wenn der Header fehlt.

| Header                        | Akzeptiert                                                                                                                                                                                                     | Wirkung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | einen Preset-Alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) oder einen unverarbeiteten Paketnamen (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Überschreibt die Bewertungsgewichtungen für diese Anfrage. `balanced`/`default` erzwingen die Standardgewichtungen (kein Paket). Unbekannte Werte werden ignoriert (Konfiguration bleibt erhalten).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Budget`          | eine positive Zahl (maximaler USD-Betrag pro Anfrage)                                                                                                                                                          | Harte Kostenobergrenze: Kandidaten, deren geschätzte Kosten sie überschreiten, werden vor der Auswahl herausgefiltert. Was geschieht, wenn **jeder** Kandidat sie überschreitet, wird durch `X-OmniRoute-Budget-Fallback` weiter unten gesteuert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (Standard, Aliasse: `cheapest-viable`, `soft`) oder `strict` (Aliasse: `block`, `hard`)                                                                                                             | `cheapest`: greift auf den insgesamt günstigsten Kandidaten zurück, obwohl dieser die Obergrenze weiterhin überschreitet (Legacy-Verhalten). `strict`: verweigert die Auswahl — die Anfrage schlägt sofort mit `HTTP 402` fehl, statt unbemerkt zu viel auszugeben. Unbekannte Werte werden ignoriert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Effort`          | `auto` (andere Werte sind reserviert)                                                                                                                                                                          | Adaptives Denkbudget: Wenn die Anfrage **kein** Reasoning-Feld irgendeiner Form enthält (`reasoning_effort`, `reasoning`, `thinking`), löst das Gateway `auto` anhand deterministischer Signale aus der Anfragestruktur in `low`/`medium`/`high` auf (Länge der letzten Benutzernachricht, Kontextgröße bis zur letzten Benutzernachricht, vorherige Tool-Ergebnisse, Tiefe der Tool-Schleife). Die Signale sind auf den aktuellen Turn begrenzt — alles nach der letzten Benutzernachricht wird ignoriert —, sodass jede Anfrage in einer Tool-Schleife auf dieselbe Stufe aufgelöst wird (zustandslose Fixierung pro Turn, kein Sitzungsstatus, keine Eskalation innerhalb der Schleife, die Präfixe des Upstream-Prompt-Caches ungültig machen würde). Ein explizites Reasoning-Feld des Clients hat stets Vorrang. Gilt nur für Anfragen, deren Upstream-Dispatch in das OpenAI-Chat-Completions-Format aufgelöst wird (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` ist ein OpenAI-spezifisches Feld, daher hat der Header bei einer an Claude oder Gemini gerichteten Anfrage keine Wirkung (siehe `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Das schnellste Profil erzwingen, diese Anfrage auf 0,05 $ begrenzen und bei einer Überschreitung strikt blockieren
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Die Auflösung ist eine reine Funktion (`open-sse/services/autoCombo/requestControls.ts`); die
aufgelösten Werte werden an die vorhandenen Eingaben `config.modePack` / `config.budgetCap` /
`config.budgetFallback` der Engine übergeben. Das gespeicherte `config.budgetFallback` einer Kombination ("strict" |
"cheapest") legt die persistente Richtlinie fest; der Header überschreibt sie für eine einzelne Anfrage.

## Alle Routing-Strategien

Die Combo-Engine von OmniRoute unterstützt **19 Routing-Strategien** (deklariert in `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Die Auto-Combo-Engine selbst ist über die Strategie `auto` verfügbar; die übrigen Strategien stehen für persistierte Combos zur Verfügung.

| Strategie           | Beschreibung                                                                                                                                                                                                                              |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Geordnete Liste mit zuerst zu verwendendem Ziel und expliziter Priorität                                                                                                                                                                  |
| `weighted`          | Gewichtete Zufallsauswahl anhand der Gewichtung pro Ziel                                                                                                                                                                                  |
| `round-robin`       | Ziele der Reihe nach zyklisch durchlaufen                                                                                                                                                                                                 |
| `context-relay`     | Kontext zwischen Zielen weiterreichen (lange Unterhaltungen)                                                                                                                                                                              |
| `fill-first`        | Kontingent jedes Ziels ausschöpfen, bevor zum nächsten gewechselt wird                                                                                                                                                                    |
| `p2c`               | Zufällige Lastverteilung nach dem Power-of-2-Choices-Prinzip                                                                                                                                                                              |
| `random`            | Gleichverteilte Zufallsauswahl                                                                                                                                                                                                            |
| `least-used`        | Ziel mit der aktuell geringsten Auslastung auswählen                                                                                                                                                                                      |
| `cost-optimized`    | Kosten pro Anfrage anhand der Katalogpreise minimieren                                                                                                                                                                                    |
| `reset-aware` ⭐    | Nach Zeitpunkt der Kontingent-Zurücksetzung priorisieren — kurze Zurücksetzungsintervalle werden höher eingestuft                                                                                                                         |
| `reset-window`      | Ziele bevorzugen, deren Kontingentfenster am frühesten zurückgesetzt wird                                                                                                                                                                 |
| `headroom`          | Ziel mit dem größten verbleibenden Kontingentspielraum auswählen                                                                                                                                                                          |
| `strict-random`     | Zufällige Auswahl ohne Deduplizierung von Wiederholungen                                                                                                                                                                                  |
| `auto`              | Auto-Combo-Bewertung (16 Faktoren) verwenden — **empfohlen**                                                                                                                                                                              |
| `lkgp`              | Last-Known-Good Path (wählt dauerhaft den letzten erfolgreichen Anbieter und greift anschließend auf Regeln zurück)                                                                                                                       |
| `context-optimized` | Ziel mit der besten Eignung für die aktuelle Kontextgröße auswählen                                                                                                                                                                       |
| `cache-optimized`   | Ziele nach Prompt-Cache-Affinität neu anordnen — die Verbindung, die das zwischengespeicherte Präfix dieser Anfrage am wahrscheinlichsten bereits enthält, wird zuerst versucht (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Anfragen parallel an eine Gruppe von Modellen senden und anschließend über ein Bewertungsmodell zu einer Antwort synthetisieren (siehe unten)                                                                                             |
| `pipeline`          | Ziele nacheinander ausführen, wobei die Ausgabe jedes Schritts als Eingabe des nächsten Schritts dient; nur die endgültige Antwort wird zurückgegeben (#6396)                                                                             |

⭐ = Neu in v3.8.0 · 🧬 = Neu in v3.8.36

### Semantik von `weighted`

`weighted` ist eine **proportionale Zufallsauswahl pro Anfrage**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`) und kein Ausgleichsmechanismus:

- Für jede Anfrage wird **ein** Schritt mit der Wahrscheinlichkeit `weight / totalWeight` ausgewählt; die verbleibenden Schritte werden für diese Anfrage als Fallback-Kette nach absteigender Gewichtung sortiert.
- Ein Schritt, dessen Gewichtung `0` beträgt (oder fehlt), wird **nie ausgewählt**, solange ein anderer Schritt eine Gewichtung > 0 hat — er kann nur als Fallback dienen, nachdem der ausgewählte Schritt fehlgeschlagen ist. Nur wenn **alle** Gewichtungen 0 betragen, wird die Auswahl gleichverteilt.
- Schritte, deren Ziele sämtlich nicht verfügbar sind — Provider-Circuit-Breaker `OPEN`, Verbindungs-Cooldown, Modellsperre — werden vor der Auswahl daraus entfernt (`open-sse/services/combo/targetResolution.ts`), sodass ein einzelner funktionsfähiger Schritt vorübergehend jede Anfrage gewinnen kann.
- `stickyWeightedLimit` (Combo-Konfiguration, Standardwert `1` = deaktiviert) behält den ausgewählten Schritt für diese Anzahl aufeinanderfolgender erfolgreicher Ausführungen bei, bevor erneut ausgewählt wird.

Für eine strikte Rotation ist `round-robin` zu verwenden; gleiche Gewichtungen bei `weighted` führen zu einer statistischen — nicht strikten — Verteilung.

## Fusionsstrategie

`fusion` ist die einzige Strategie, die **kein** einzelnes Ziel auswählt. Sie verteilt den Prompt
parallel an **jedes Panel-Modell**. Anschließend führt ein konfigurierbares **Judge-Modell**
alle Panel-Antworten zu einer einzigen endgültigen Antwort zusammen. Portiert aus dem Upstream-Projekt `decolua/9router`
(OpenRouters Fusion-Design); Implementierung in `open-sse/services/fusion.ts`.

Funktionsweise:

0. **Umgehung bei Tool-Nutzung** — eine Anfrage, die ein nicht leeres `tools`-Array enthält und bei der
   `tool_choice` nicht ausdrücklich auf `"none"` gesetzt ist, überspringt das Panel vollständig: Sie wird direkt an
   ein einzelnes Modell weitergeleitet (das konfigurierte Judge-Modell oder `panel[0]`), wobei `tools`/`tool_choice`
   unverändert durchgereicht werden. Panel-Mitglieder haben keinen Zugriff auf Tools, und die
   Syntheseanweisung des Judge-Modells rät von der Ausgabe von Tool-Aufrufen ab. Dadurch erhalten agentische bzw. Tool-aufrufende Clients
   eine echte Tool-Aufrufentscheidung anstelle synthetisierter Prosa (#6771).
1. **Parallele Verteilung** (nur Anfragen ohne Tool-Nutzung) — der Prompt wird gleichzeitig an jedes Panel-Modell
   gesendet, wobei Nicht-Streaming erzwungen und Tools entfernt werden (das Judge-Modell benötigt vollständige
   Textantworten für die Synthese).
2. **Sammlung mit Quorum-Nachfrist** — sobald `minPanel` Antworten eingegangen sind, beginnt eine kurze
   Nachfrist für die Nachzügler. Danach fährt die Fusion mit den bis dahin gesammelten Antworten fort.
   Dadurch wird der Einfluss des langsamsten Modells auf die Gesamtdauer begrenzt, zusätzlich abgesichert durch ein festes Timeout.
3. **Synthese durch das Judge-Modell** — Panel-Antworten werden anonymisiert (`Source 1`, `Source 2`, … — damit
   das Judge-Modell den Inhalt und nicht die Modellmarke bewertet) und an das Judge-Modell übergeben. Dieses analysiert
   Konsens / Widersprüche / teilweise Abdeckung / einzigartige Erkenntnisse / blinde Flecken und
   verfasst anschließend **eine** maßgebliche Antwort. Der Aufruf des Judge-Modells behält das ursprüngliche
   `stream`-Flag sowie die Tools des Clients bei, sodass Streaming und nachgelagerte Tool-Nutzung weiterhin funktionieren.
4. **Kontrollierte Degradierung** — 0 Panel-Antworten → `503`; genau 1 verbliebene Antwort → diese Antwort
   wird direkt zurückgegeben (es gibt nichts zusammenzuführen); ein Panel mit nur einem Modell antwortet direkt.

Ein Panel-Mitglied kann außerdem ein `combo-ref`-Schritt (`{kind: "combo-ref", comboName: "..."}`) sein, der auf
eine andere Combo verweist — diese wird als **eine einzelne Blackbox-Stimme im Panel** aufgelöst (eine vollständige rekursive Weiterleitung an die
referenzierte Combo, nicht eine parallele Verteilung an die Ziele dieser Combo), mit demselben Tiefen-/Zyklenschutz,
den alle anderen Strategien zur Verarbeitung von Combo-Referenzen bereits verwenden (#6764).

### Konfiguration

Die Konfiguration erfolgt im `config`-Blob der Combo (keine Schemamigration — die vorhandene
`combos`-Tabelle wird wiederverwendet):

| Feld                                     | Typ      | Standardwert        | Zweck                                                                                             |
| :--------------------------------------- | :------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| `config.judgeModel`                      | `string` | erstes Panel-Modell | Modell, das die endgültige Antwort synthetisiert                                                  |
| `config.fusionTuning.minPanel`           | `number` | `2`                 | Erforderliche erfolgreiche Antworten, bevor die Nachfrist beginnt (begrenzt auf `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`              | Wartezeit auf Nachzügler, nachdem das Quorum erreicht wurde                                       |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`             | Absolute Obergrenze, damit ein hängendes Modell die Anfrage nicht blockieren kann                 |

Die Standardwerte befinden sich in `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Beispiel

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Rufen Sie sie anschließend wie jede andere Combo auf: `{"model":"fusion-panel","messages":[...]}`.

## Virtuelle Auto-Combo-Factory

Die Auto-Combo-Engine benötigt keine vordefinierten Combos. Stattdessen erstellt `open-sse/services/autoCombo/virtualFactory.ts` Kandidaten dynamisch:

1. Ruft `getProviderConnections({ isActive: true })` ab (alle aktivierten Verbindungen)
2. Filtert nach Verbindungen mit gültigen Anmeldedaten (API-Schlüssel oder nicht abgelaufenes OAuth-Token über `hasUsableOAuthToken()`)
3. Gleicht sie mit `getProviderRegistry()` hinsichtlich Modellverfügbarkeit und Preisen ab
4. Erstellt für jedes Tupel `(provider, model, connection)` einen `VirtualAutoComboCandidate`
5. Wählt `connection.defaultModel` (oder das erste Modell der Registry) als Weiterleitungsziel aus
6. Bewertet jeden Kandidaten mit dem 16-Faktoren-`scorePool()` und dem Gewichtungspaket der Variante
7. Gibt die resultierende speicherinterne `AutoComboConfig` für `handleComboChat()` zurück — sie wird nie in der DB persistiert

Das bedeutet: **Das Hinzufügen eines neuen Providers mit aktiviertem `auto/*` erweitert automatisch den Kandidatenpool** — eine manuelle Bearbeitung der Combo ist nicht erforderlich. Die virtuelle Combo wird für jede Anfrage neu erstellt, sodass neu hinzugefügte oder wieder funktionsfähige Verbindungen sofort berücksichtigt werden.

## Selbstheilung

- **Temporärer Ausschluss**: Bewertung < 0,2 → für 5 Min. ausgeschlossen (progressiver Backoff, max. 30 Min.)
- **Berücksichtigung des Circuit Breakers**: OPEN → automatisch ausgeschlossen; HALF_OPEN → Testanfragen
- **Vorfallmodus**: >50 % OPEN → Exploration deaktivieren, Stabilität maximieren
- **Wiederherstellung nach Abkühlphase**: Nach einem Ausschluss ist die erste Anfrage eine „Testanfrage“ mit reduziertem Timeout

## Bandit-Exploration

5 % der Anfragen (konfigurierbar) werden zur Exploration an zufällige Provider weitergeleitet. Im Vorfallmodus deaktiviert.

## API

Es gibt **keinen dedizierten Endpunkt `POST /api/combos/auto`** — Auto-Combo wird auf zwei Arten verwendet:

1. **Ohne Konfiguration (empfohlen):** Senden Sie eine beliebige Chat-Completion-Anfrage mit `model: "auto"` oder `model: "auto/<variant>"`. Die virtuelle Factory erstellt die Combo für jede Anfrage — keine Persistierung und keine API-Aufrufe erforderlich.

2. **Persistierte Combo mit `strategy: "auto"`:** Erstellen Sie über `POST /api/combos` eine reguläre Combo und setzen Sie `strategy: "auto"` sowie `config.auto.weights` / `config.auto.candidatePool`. Dabei wird dieselbe Bewertungs-Engine verwendet; die Combo wird in `combos` gespeichert und kann anhand ihrer ID wiederverwendet werden.

Zur Ermittlung listet `GET /api/combos/auto` jede Variante mit ihrem aufgelösten Kandidatenpool sowie `context_length` / `max_output_tokens` auf — jeweils der MAXIMALWERT über die Kontextfenster des Kandidatenpools hinweg. Clients (z. B. das opencode-Plugin) müssen diese Werte anstelle von `0` bekannt geben: Ein Kontextwert von null deaktiviert die automatische Komprimierung von opencode vollständig, wodurch Sitzungen so lange anwachsen, bis die Bereinigung des Verlaufs durch das Gateway den Kontext zerstört. Der MAXIMALWERT kann gefahrlos bekannt gegeben werden, da der Kontext-Vorfilter der Auto-Combo übergroße Anfragen an Kandidaten mit großen Kontextfenstern weiterleitet.

```bash
# Verwendung ohne Konfiguration (keine Combo-Erstellung)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Persistierte Auto-Combo über den regulären Combos-Endpunkt
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Auto-Router-Strategien

Persistierte Combos mit `strategy: "auto"` können `config.routerStrategy` (oder das veraltete
`config.auto.routerStrategy`) auf einen der folgenden Werte setzen:

- `rules` — standardmäßige gewichtete Bewertung
- `score` — wählt die höchste konfigurierte gewichtete Bewertung aus. Bei exakten Gleichständen bleibt die konfigurierte
  Kandidatenreihenfolge erhalten; die bestehende `explorationRate` nimmt Stichproben aus dem vollständig sortierten Pool.
- `cost` / `eco` — günstigster funktionsfähiger Provider
- `latency` / `fast` — niedrigste p95-Latenz mit Zuverlässigkeitsabzug
- `sla-aware` / `sla` — bevorzugt Kandidaten, welche die SLOs für p95-Latenz, Fehlerrate und optional
  Kosten erfüllen
- `lkgp` — zuletzt als funktionsfähig bekannter Provider zuerst

### Router-Strategien im Detail

Die Auto-Combo-Engine stellt 6 austauschbare **RouterStrategy**-Implementierungen bereit, zwischen denen
Sie über `config.routerStrategy` (oder das veraltete `config.auto.routerStrategy`) wechseln können.
Jede Strategie wählt anhand eines `RoutingContext` einen Provider aus dem Kandidatenpool aus
(Aufgabentyp, Tool-/Vision-Hinweise, Token-Schätzung, optionale SLA-Richtlinie, optionaler
zuletzt als funktionsfähig bekannter Provider).

#### 1. `rules` (Standard) — gewichtete Bewertung anhand von 16 Faktoren

Umschließt die bestehende Bewertungs-Engine. Filtert Circuit-Breaker-Kandidaten mit dem Status `OPEN`
heraus und führt anschließend `scorePool()` mit dem aktuellen Aufgabentyp und `getTaskFitness()` aus,
wobei der Provider mit der höchsten Bewertung ausgewählt wird.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Verwendung**: Standard. Verwenden Sie diese Strategie, wenn Sie einen ausgewogenen Kompromiss zwischen allen Signalen wünschen.

**Alias**: `rules` (kein Alias)

---

#### 2. `cost` / `eco` — günstigster funktionsfähiger Provider

Sortiert den Kandidatenpool nach `costPer1MTokens` (aufsteigend) und wählt den günstigsten aus.
Filtert zuvor Kandidaten mit dem Status `OPEN` heraus.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Verwendung**: Kostensensible Workloads, Stapelverarbeitung oder Hintergrundaufgaben.

**Aliasse**: `cost`, `eco`

---

#### 3. `latency` / `fast` — niedrigste p95-Latenz mit Zuverlässigkeitsabzug

Sortiert nach `p95LatencyMs + (errorRate * 1000)`. Der Fehlerraten-Malus sorgt dafür,
dass unzuverlässige Anbieter niedriger eingestuft werden, selbst wenn ihre nominelle Latenz gering ist.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Wann verwenden**: Für latenzempfindliche Workloads wie Echtzeit-Chats, automatische
Vervollständigung oder interaktive Programmierassistenten.

**Aliasse**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — Einhaltung von Latenz-, Fehler- und Kosten-SLOs

Bewertet jeden Kandidaten danach, wie gut er die konfigurierte SLO-Richtlinie erfüllt:

| Faktor          | Gewichtung | Formel                                               |
| --------------- | ---------- | ---------------------------------------------------- |
| Latenzwert      | 35%        | `threshold / max(value, ε)`                          |
| Fehlerwert      | 35%        | `threshold / max(value, ε)`                          |
| Zustandswert    | 15%        | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)    |
| Kostenwert      | 10%        | `threshold / max(value, ε)` oder invers normalisiert |
| Stabilitätswert | 5%         | invers normalisierte Standardabweichung der Latenz   |

Wenn `hardConstraints: true` gesetzt ist, werden Kandidaten primär nach ihrem
**Verletzungswert** sortiert (also danach, wie weit sie ein SLO überschreiten) und
anschließend nach dem Gesamtwert. Andernfalls wird nur der Gesamtwert verwendet.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... bewertet jeden Kandidaten anhand der Richtlinie: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA-Felder** (in der Kombinationskonfiguration festgelegt):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Wann verwenden**: Für Produktions-Workloads mit strikten Latenz-, Fehlerraten- oder Kostenbudgets.

**Aliasse**: `sla-aware`, `sla`

---

#### 5. `lkgp` — zuletzt bekannter guter Anbieter zuerst

Versucht zuerst den **zuletzt bekannten guten Anbieter** (falls festgelegt) und greift
anschließend auf die Strategie `rules` zurück. Dies ist für die Sitzungsaffinität
nützlich – derselbe Anbieter bearbeitet Folgeanfragen innerhalb einer Unterhaltung.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Rückgriff auf die Strategie „rules“
    return getStrategy("rules").select(pool, context);
  }
}
```

**Wann verwenden**: Für mehrstufige Unterhaltungen, bei denen derselbe Anbieter
Folgeanfragen bearbeiten soll (z. B. für Caching, Kontextkontinuität oder konsistente Preise).

**Alias**: `lkgp` (kein Alias)

---

### Benutzerdefinierte Router-Strategien

Sie können über die öffentliche API Ihre eigene `RouterStrategy`-Implementierung registrieren:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Ihre Routing-Logik hier
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Verwenden Sie sie anschließend wie folgt:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Auswahlhilfe für Router-Strategien

| Anwendungsfall        | Strategie   | Grund                                        |
| --------------------- | ----------- | -------------------------------------------- |
| Ausgewogener Workload | `rules`     | Standard – berücksichtigt alle Faktoren      |
| Kosten minimieren     | `cost`      | Wählt immer den günstigsten Anbieter         |
| Latenz minimieren     | `latency`   | Wählt den schnellsten zuverlässigen Anbieter |
| Strikte SLOs          | `sla-aware` | Filtert nach p95-/Fehler-/Kostenschwellen    |
| Mehrstufiger Chat     | `lkgp`      | Sitzungsaffinität                            |

SLA-fähige Felder:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Aufgabeneignung

Mehr als 30 Modelle wurden für 6 Aufgabentypen bewertet (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Unterstützt Platzhaltermuster (z. B. `*-coder` → hohe Bewertung für Programmierung).

## Zusammenfassung der Auto-Varianten

Einschließlich des einfachen `auto` (Standard) sowie der 6 in `autoPrefix.ts` deklarierten `AutoVariant`-Werte gibt es **7 aufrufbare Modell-IDs**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` selbst zählt 6 Werte auf; die 7. Option ist „keine Variante“ — das einfache `auto` — und wird von `parseAutoPrefix()` als `variant: undefined` behandelt.)

## Wie Tiers in Auto-Combo einfließen

Die Bewertungsfunktion mit 16 Faktoren (`open-sse/services/autoCombo/scoring.ts`) behandelt die Tier-Zugehörigkeit als zwei Signale: `tierPriority` (0.0476) und `tierAffinity` (0.0476). Die vollständige Menge von `DEFAULT_WEIGHTS` finden Sie oben in der kanonischen [Tabelle der Bewertungsfaktoren](#how-it-works-persisted-auto-combos) — die Überschreibungen pro Paket (ship-fast/cost-saver/quality-first/
offline-friendly) sind in der Tabelle „Gewichtungsprofile pro Paket“ aufgeführt.

Das Tier allein erzwingt **nicht**, dass Tier 1 zuerst verwendet wird — wenn die Latenz von Tier 1 schlecht oder das Kosten-Qualitäts-Verhältnis suboptimal ist, gewinnt Tier 2. Um die Tier-Reihenfolge zu erzwingen, verwenden Sie die Combo-Strategie `priority` und ordnen Sie die Anbieter nach Tier an.

Um Tier 1 (Abonnement) stark zu bevorzugen, erhöhen Sie die Gewichtung von `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Definitionen der Tiers und die Klassifizierung der Anbieter finden Sie unter `docs/marketing/TIERS.md`.

## Tests und Abdeckung

### Deterministische Matrix für Routing-Entscheidungen (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` belegt die Routing-**Entscheidung** aller 19 öffentlichen Strategien durchgängig über die echte Combo-Pipeline mit einem simulierten Upstream-Dienst. Die Abdeckung umfasst:

- Alle 19 Strategien aus `ROUTING_STRATEGY_VALUES` (geordnet, gewichtet, Kosten, Kontext, Fusion, …).
- `quota-share` (intern) durchgängig: DRR-Fairness + Herabstufung bei Sättigung über den echten `selectQuotaShareTarget`-Integrationspunkt (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Universelle Übergabeabdeckung für `context-relay` über jede Anzahl von Zielen hinweg.

Diese Suite wird in der CI (`test:integration`-Job) mit `--test-concurrency=1` und `--test-force-exit` ausgeführt, sodass sie deterministisch ist und keine Live-Anmeldedaten benötigt.

### Abgesicherte Live-Smoke-Tests (NICHT in der CI — echte Anbieter)

| Befehl                                 | Funktion                                                                                                 |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Echtes In-Process-Routing mit `RUN_COMBO_LIVE=1`; erstellt einen Snapshot einer Live-OmniRoute-Datenbank |
| `npm run test:combo:live:vps`          | HTTP-Aufrufe an einen aktiven OmniRoute-Server (`COMBO_LIVE_BASE_URL` festlegen)                         |
| `npm run test:combo:live:vps:failover` | Dasselbe, mit absichtlich herbeigeführten Failover-Szenarien                                             |

Diese Smoke-Tests prüfen den echten Übertragungspfad (Combo → Anbieter → Vervollständigung). Sie sind bewusst von der CI ausgeschlossen, da sie Live-Anmeldedaten und VPS-Zugriff erfordern.

---

## Dateien

| Datei                                                     | Zweck                                                                                                        |
| :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Bewertungsfunktion mit 16 Faktoren, `DEFAULT_WEIGHTS`, Pool-Normierung                                       |
| `open-sse/services/autoCombo/taskFitness.ts`              | Nachschlagetabelle für Modell-×-Aufgaben-Eignung                                                             |
| `open-sse/services/autoCombo/engine.ts`                   | Auswahllogik, Bandit, Budgetobergrenze                                                                       |
| `open-sse/services/autoCombo/selfHealing.ts`              | Ausschluss, Prüfungen, Vorfallmodus                                                                          |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 Gewichtungsprofile (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser für das Präfix `auto/` + 6 Varianten                                                                  |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Erstellt eine speicherinterne `AutoComboConfig` aus aktiven Verbindungen                                     |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Test-Hook zum Mocken der Provider-Registry                                                                   |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 Strategien)                                                                    |
| `src/sse/handlers/chat.ts`                                | Integration: Kurzschluss für Auto-Präfixe                                                                    |
