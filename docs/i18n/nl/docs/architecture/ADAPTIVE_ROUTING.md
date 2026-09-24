# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Dit document beschrijft de door feedback gestuurde adaptieve routeringsbasis die aan
OmniRoute is toegevoegd. Deze is bewust beperkt van omvang: er wordt een getypeerd kanaal voor
routeringsresultaten geïntroduceerd, evenals een online kwaliteitssignaal dat de bestaande
auto-combo-scorer voedt, een optionele OpenTelemetry-exporter en een endpoint voor
uitlegbaarheid. Het vervangt **niet** de bestaande weerbaarheidsstack (circuit breaker,
afkoelperiode voor verbindingen, modelblokkering, gezondheidsmatrix, autopilot) — het vult
deze aan.

## 1. Architecturale context

OmniRoute is een gegevensvlak met een **kritiek verzoekpad** en een **besturings-/intelligentie-
vlak**. Het kritieke pad moet snel, geheugenefficiënt, asynchroon, weerbaar en
voorspelbaar blijven. Evaluatie, kwaliteitsscores, experimenten en historische analyse horen
thuis in het besturingsvlak.

```
AI-agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   gegevensvlak (snel, synchroon, in-memory)
│ routering / failover│
│ gezondheid / vangnet│
│ cache / streaming   │
└──────────┬──────────┘
           │ RoutingEvent (fire-and-forget, ~0.2µs)
           ▼
┌─────────────────────┐
│  Feedback-sinks     │   besturingsvlak (asynchroon, best-effort)
│  kwaliteitstracker  │
│  OTel-exporter      │
│  uitlegopslag       │
└──────────┬──────────┘
           ▼  kwaliteitsscore
      auto-combo-scorer
```

### Wat al aanwezig was (geaudit, niet gedupliceerd)

| Concept                                     | Bestaande implementatie                                                                                              |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Beschikbaarheid (kunnen we verkeer sturen?) | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, opgeslagen in DB), afkoelperiode voor verbindingen, modelblokkering |
| Gezondheidsrapportage                       | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                              |
| Schaduwverkeer                              | `open-sse/services/combo/shadowRouting.ts`                                                                           |
| Vangrails                                   | `src/lib/guardrails/` (pre-/post-hooks)                                                                              |
| Exacte cache                                | `src/lib/semanticCache.ts` (gebaseerd op handtekeningen)                                                             |
| Evaluatoren / evaluatiegestuurde routering  | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                 |
| Uitlegbaarheid van combo-beslissingen       | `open-sse/services/combo/decisionTrace.ts`                                                                           |
| Realtime dashboardgebeurtenissen            | `src/lib/events/eventBus.ts` (UI-meldingskanaal, `unknown`-payloads, geschiedenis van 100 items)                     |

De routeringsgebeurtenislaag is **geen** herimplementatie van `eventBus`: die bus is
het realtime meldingskanaal van het dashboard (getypeerde _gebeurtenisnamen_, ondoorzichtige
payloads, UI-consumenten). `RoutingEvent` is een getypeerde _resultaat_-struct
(latentie/tokens/kosten/resultaat/stopreden) die wordt gebruikt door de feedback-sinks
van het besturingsvlak (kwaliteitstracker, OTel-exporter, uitlegopslag).

### Wat ontbrak (hier toegevoegd)

1. Een **getypeerde routeringsresultaatgebeurtenis + sink-abstractie** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` is beperkt tot combo's en alleen in-memory;
   `comboMetrics` zijn cumulatieve tellers; `call_logs` is onbewerkte asynchrone opslag.
   Geen daarvan is een getypeerd, op sinks gebaseerd resultaatkanaal waarop een
   kwaliteitstracker, een OTel-exporter of een evaluator in Future-AGI-stijl zich kan
   abonneren.
2. Een **online kwaliteitssignaal** (EWMA) voor uitvoerkwaliteit — voorheen benaderde
   de scorer 'kwaliteit' uitsluitend via statische taakgeschiktheid en optionele
   slagingspercentages van evaluaties.
3. Een **optionele, afhankelijkheidsvrije OTel-exporter** die gebruikmaakt van semantische
   GenAI-conventies.
4. Een **endpoint voor uitlegbaarheid** dat de werkelijke routeringsbeslissingen en
   kwaliteitsstatus retourneert.

## 2. Routeringsgebeurtenissen (basis voor feedback)

Bestanden: `open-sse/services/routing/events.ts`, `.../index.ts`

Een `RoutingEvent` bevat uitsluitend routeringsmetadata:

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
  outcome: RoutingOutcome; // union op basis van een toelatingslijst
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` is een trait in `Send+Sync`-stijl in TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // moet O(1) zijn, geen synchrone I/O
}
```

Het kritieke pad roept `emitRoutingEvent(event)` eenmaal aan per voltooide aanvraag
(de callback voor voltooiing van streaming, het niet-streamende succespad en het
pad voor mislukte ongeldige 200-responses in `handleChatCore`). Distributie is een
synchrone fan-out naar geregistreerde sinks, maar elke sink plaatst alleen items
in een wachtrij of werkt de toestand in het geheugen bij. **Geen synchrone
databasebewerkingen en geen netwerk-I/O op het kritieke pad.**

Standaardsinks:

- `MemoryRoutingEventStore` — begrensde ringbuffer (500), nieuwste eerst, voor het
  explain-eindpunt.
- `QualityTracker`-consumer — werkt de EWMA-kwaliteitsschatting bij.
- `OtlpHttpsEventSink` — optioneel, alleen ingeschakeld wanneer
  `OMNIROUTE_OTEL_ENDPOINT` (of `OTEL_EXPORTER_OTLP_ENDPOINT`) is ingesteld.

### Gemeten overhead (eerlijke vergelijking)

`npm run bench:routing-events` op dit werkstation (100k iteraties; bewerkingen van
minder dan een µs zijn gemeten als geaggregeerde µs/op, omdat de percentielen per
bewerking onder de timerresolutie van `performance.now()` liggen):

| Scenario                                | µs/op  | ops/s  |
| --------------------------------------- | ------ | ------ |
| basislijn (alleen scoring)              | ~0.045 | ~22 M  |
| basislijn + RoutingEvent (2 sinks)      | ~0.168 | ~5.9 M |
| basislijn + gebeurtenis + OTel-wachtrij | ~0.163 | ~6.1 M |
| gelijktijdig (8 vervlochten bursts)     | ~0.18  | —      |

Het verschil voor gebeurtenisdistributie ten opzichte van de basislijn voor
scoring bedraagt ~0.12 µs/aanvraag; de OTel-sink plaatst alleen items in een
wachtrij (O(1)-toevoeging aan de buffer) en voegt niets meetbaars toe. Deze
getallen zijn machinespecifiek en relatief — ze vormen geen garantie voor
productie. Het v1-cijfer van "~0.2 µs" was een geaggregeerde schatting; deze
methodologie scheidt de basislijn voor scoring van de kosten van
gebeurtenisdistributie.

## 3. Kwaliteitssignaal (providerstatus op basis van feedback)

Bestanden: `open-sse/services/routing/quality.ts`

v2 scheidt **operationele** van **semantische** kwaliteit:

- **Operationeel** — afgeleid van het kritieke routeringspad (HTTP 4xx/5xx,
  verbindingsfouten, 429-responses, ongeldige responses, streamonderbrekingen,
  `finish_reason=length`, geslaagde aanvragen zonder uitvoer, EWMA van
  latentie/TTFT). Een 200-response wordt NIET als semantische kwaliteit
  beschouwd.
- **Semantisch** — de werkelijke waarde van de gegenereerde uitvoer. Wordt
  UITSLUITEND door een evaluator geproduceerd via `setSemanticQuality()`. De
  waarde is `null` totdat een evaluator deze aanlevert en wordt nooit in de
  operationele score opgenomen.

Status per (provider, model) (EWMA + begrensde tellers):

- `successEwma` — EWMA (α=0.2) van succesvolle resultaten.
- `latencyEwma` / `ttftEwma` — EWMA van latentie (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — hoe recent het model voor het laatst is waargenomen.

### Rekening houden met vertrouwen / steekproefgrootte

`confidence = clamp01(samples / 50)`, en de aan de scorer geretourneerde score
wordt naar het neutrale middelpunt toe gemengd:

```
score = 0.5 + confidence * (operational - 0.5)
```

Gevolgen (geverifieerd door tests):

- Een koude provider (0 steekproeven) scoort **0.5** — wordt niet onterecht
  benadeeld, maar kan evenmin een provider met duizenden solide waarnemingen
  domineren.
- Een provider met 7 toevallige successen wordt naar 0.5 toe getrokken
  (en domineert nooit door optimistische initialisatie).
- Een provider met 50+ steekproeven convergeert naar zijn werkelijke operationele
  score.
- Verslechtering en herstel verlopen geleidelijk (EWMA), en één geïsoleerde fout
  maakt een gezonde provider niet kapot.

`ProviderQuality` stelt `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` beschikbaar.

Dit wordt als de scoringfactor `quality` aan de auto-combo-scorer doorgegeven:

- `ScoringFactors.quality` / `ScoringWeights.quality` in
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. De som blijft 1.0.
- `buildAutoCandidates` vult `candidate.quality` vanuit de tracker; kandidaten
  zonder gegevens krijgen standaard de neutrale waarde **0.5** (een koude
  kandidaat wordt versterkt noch benadeeld).

De gesloten lus:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo-kwaliteitsfactor
      ↑                                                    │
      └────── resultaat van aanvraag (handleChatCore) ←─────┘
```

### Harde uitsluiting versus zachte straf

Het kwaliteitssignaal is uitsluitend een **zachte adaptieve voorkeur**. Harde
uitsluiting blijft bij de bestaande weerbaarheidsstack: circuitbreaker OPEN,
quota uitgeput, authenticatiefout, modelblokkering — geen van deze wordt door de
kwaliteitsscore beïnvloed. Een provider waarvan de kwaliteitsscore tijdelijk
daalt, krijgt een lagere voorkeur, maar wordt nooit hard uitgeschakeld.

## 3b. Canonieke streamtiming (TTFT / ITL)

Bestanden: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` is het centrale instrumentatiepunt voor het streamingpad,
gekoppeld aan `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — eerste upstreamchunk ontvangen.
- `markForward()` — eerste chunk doorgestuurd naar de client (gebruikt voor TTFT).
- `markInterrupted()` — streamtime-out/-afbreking/-fout vóór een correcte voltooiing.
- `ttft()` = latentie van de eerste doorgestuurde SSE-chunk. **Dit is GEEN TTFT op tokenniveau** —
  één SSE-chunk kan nul, één of meerdere tokens bevatten. Nauwkeurig gedocumenteerd.
- `avgItlMs()` = gemiddelde tijd tussen chunks (een chunklatentieproxy voor ITL).

TTFT/ITL/interrupted worden opgenomen in de `RoutingEvent` (`ttftMs`, `itlMs`) en
door de OTel-sink geëxporteerd als GenAI-/OmniRoute-spanattributen.

## 4. OpenTelemetry-/GenAI-observeerbaarheid

Bestanden: `open-sse/services/routing/otel.ts`

- Afhankelijkheidsvrije OTLP/HTTP JSON-exporter (gebruikt de globale `fetch`, geen
  `@opentelemetry/*`-SDK).
- Spans volgen de semantische GenAI-conventies (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) plus OmniRoute-routeringsattributen
  (resultaat, status, TTFT, nieuwe pogingen, fallback).
- `record()` plaatst uitsluitend items in een begrensde buffer (O(1)); een achtergrondtimer
  verstuurt ze asynchroon via `POST {endpoint}/v1/traces`. Bij overbelasting worden de
  oudste events verwijderd (`dropped`-teller) — er wordt nooit tegendruk op het datavlak
  uitgeoefend.
- **Uitgeschakeld tenzij geconfigureerd.** `OMNIROUTE_OTEL_ENDPOINT` (of
  `OTEL_EXPORTER_OTLP_ENDPOINT`) moet zijn ingesteld; anders wordt de sink niet
  geregistreerd en wordt er geen OTel-code uitgevoerd.

## 5. Uitlegbaarheid

- `GET /v1/explain/routing` retourneert de recente `RoutingEvent`s (de werkelijke
  beslissingen, nieuwste eerst) en de kwaliteitsmomentopname per provider/model.
- Authenticatie komt overeen met `/v1/combos` (Bearer-API-sleutel of dashboardsessie; anoniem bij
  lokale implementaties voor één gebruiker met `REQUIRE_API_KEY=false`).
- Traces per aanroep op combinatieniveau blijven beschikbaar via het bestaande
  `decisionTrace.ts` (header `X-OmniRoute-Combo-Trace`).
- Veiligheid: events bevatten uitsluitend routeringsmetadata, nooit prompts/bodies/inloggegevens.

## 6. Integratie van het evaluatievlak (gereedheid voor Future AGI)

OmniRoute behandelt Future AGI (of elke andere evaluator) als een **potentiële
backend voor intelligentie/evaluatie, niet als een afhankelijkheid**. De integratiepunten:

- Een `RoutingEventSink` kan events asynchroon doorsturen naar een evaluator.
- De `MemoryRoutingEventStore` + kwaliteitsmomentopname geven een evaluator de ruwe
  beslissingsstroom.
- Een toekomstige `Evaluator` (deterministisch, lokale beoordelaar, HTTP, WASM) zou
  events/traces verwerken en een `QualityScore` retourneren die aan hetzelfde
  `getQualityScore`-/kwaliteitsfactorpad wordt doorgegeven.
- Bestaande evaluatiegestuurde routering (`open-sse/services/evalRouting.ts`)
  herschikt combinatiedoelen al op basis van slagingspercentages van `eval_runs` wanneer deze is ingeschakeld.

Er worden geen evaluaties synchroon op het aanvraagpad uitgevoerd en de gateway
functioneert volledig wanneer de evaluator afwezig is.

## 7. Definitieve architectuurreview

1. **Wat blijft er over op het synchrone hot path?** Routering/scoring, voorafgaande
   guardrailcontroles, cachelookup en één `emitRoutingEvent`-fan-out (~0,12 µs bovenop
   de basisscoring) naar sinks in het geheugen.
2. **Wat is verplaatst naar asynchrone verwerking?** OTel-export (timer + fetch),
   persistentie van `call_logs`/gebruik, schrijfbewerkingen naar de semantische cache;
   kwaliteit bevindt zich in het geheugen en is O(1) (geen async nodig).
3. **Hoe wordt een routeringsresultaat omgezet in feedback?** `handleChatCore` emitteert een
   `RoutingEvent` → `QualityTracker` werkt de EWMA-status bij → `getQualityScore`
   voedt de `quality`-factor van de automatische combinatie.
4. **Hoe beïnvloedt kwaliteit toekomstige routering?** Een lage kwaliteitsscore verlaagt
   de gewogen score van dat provider/model in `scoreAutoTargets`, zodat verslechterde
   modellen geleidelijk een lagere voorkeur krijgen en herstellen naarmate hun EWMA verbetert.
5. **Hoe kan Future AGI integreren zonder een afhankelijkheid te worden?** Via de
   `RoutingEventSink`-interface / een toekomstige `Evaluator`-adapter — geen hardgecodeerde
   afhankelijkheid.
6. **Wat gebeurt er wanneer de evaluator niet beschikbaar is?** De routering wordt niet beïnvloed;
   de kwaliteit valt terug op neutraal (1.0) voor modellen zonder waargenomen signaal.
7. **Wat gebeurt er wanneer telemetrie niet beschikbaar is?** De OTel-sink wordt simpelweg niet
   geregistreerd; de rest van de routeringslaag blijft ongewijzigd werken.
8. **Wat gebeurt er bij overbelasting?** De OTel-buffer verwijdert de oudste events; kwaliteit
   en de ringbuffer zijn per ontwerp begrensd; geen tegendruk.
9. **Hoe herstelt de providerstatus na verslechtering?** EWMA convergeert opnieuw naarmate
   succesvolle resultaten zich opstapelen; warm-up houdt koude modellen neutraal; de circuitbreaker
   herstelt onafhankelijk via HALF_OPEN-probes.
10. **Welke voorgestelde functies zijn bewust NIET geïmplementeerd, en waarom?**
    - Schaduwverkeer / experimenten — al geïmplementeerd
      (`combo/shadowRouting.ts`); niet opnieuw gebouwd.
    - Guardrails — al geïmplementeerd (`src/lib/guardrails/`); niet gedupliceerd.
    - Semantische cache — al geïmplementeerd (`src/lib/semanticCache.ts`); niet
      gedupliceerd.
    - Een volledig platform voor experimentbeheer, datasettools, een platform voor promptoptimalisatie,
      een vectordatabase of verplichte externe OTel-infrastructuur — valt buiten
      het bereik van een slank datavlak.
    - Een Rust-`RoutingEvent`-struct — het datavlak is TypeScript; het TS-type
      is het aangepaste equivalent.

## 8. Configuratiereferentie

| Variabele                     | Standaardwaarde | Effect                                                                                            |
| ----------------------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | niet ingesteld  | Indien ingesteld, wordt de OTLP/HTTP-trace-exporter ingeschakeld (bijv. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | niet ingesteld  | Alternatieve fallbacknaam voor het OTLP-eindpunt.                                                 |
| `OTEL_SERVICE_NAME`           | `omniroute`     | Resourceattribuut `service.name`.                                                                 |

## 9. Tests

- `tests/unit/routing-events.test.ts` — normalisatie van gebeurtenissen, statusclassificatie, begrensde ringbuffer, fan-out naar sinks + isolatie.
- `tests/unit/routing-quality.test.ts` — EWMA-opwarmfase, herstel na mislukking/succes, anomalieboetes, afhandeling van tijdelijke 429-fouten, momentopname, reset.
- `tests/unit/routing-scoring-quality.test.ts` — integriteit van gewichten, neutrale standaardwaarde, rangschikking op kwaliteitsfactor.
- `tests/unit/routing-otel.test.ts` — activeringsvoorwaarde, payload van GenAI-span, asynchrone flush, overslaan bij overbelasting.
- `tests/unit/routing-events-concurrency.test.ts` — duizenden gebeurtenissen, begrenzing van de ringbuffer, isolatie van sinks die fouten genereren, afwisselende asynchrone bursts, reset tijdens invoegingen.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministische end-to-end-lus via de echte `scoreAutoTargets`-scorer: gezond → verslechtering → herstel → tijdelijke hapering, plus scenario's voor koude start en een toevallig succesvolle koude provider.
- `tests/unit/stream-timing.test.ts` — TTFT (eerste doorgestuurde chunk), ITL, eerste byte versus eerste doorsturing, onderbreking, veilige afhandeling van ongeldige/lege chunks.

## 10. Status van reeds bestaande problemen (fase 18)

| Probleem                                                 | Status                           | Opmerkingen                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Niet-overeenkomende `omniglyph`-export                   | **OPGELOST (omgevingsprobleem)** | `node_modules` liep niet synchroon met `package-lock.json` (1.3.1 geïnstalleerd versus 1.4.0 vergrendeld). Het uitvoeren van `npm install omniglyph@1.4.0` herstelde de vergrendelde versie; het aantal typefouten daalde naar 0. Manifesten zijn ongewijzigd.                                       |
| Verouderde `getKnownContextOverflow`-tests               | **BEKEND — niet opgelost**       | `combo-context-overflow-compression-probe.test.ts` importeert een functie die niet meer bestaat in `open-sse/services/combo.ts` (alleen opmerkingen verwijzen ernaar). Voor een oplossing moeten die tests opnieuw worden geïmplementeerd of geschreven — niet-gerelateerde architectuurwijzigingen. |
| DB-isolatie van `combo-runtime-unit-concurrency.test.ts` | **BEKEND — niet opgelost**       | De SQLite-isolatieassertie van de test-harness mislukt wanneer deze rechtstreeks wordt uitgevoerd; de fout treedt op identieke wijze op in de basisbranch.                                                                                                                                           |
| Verschil in i18n-`llm.txt`                               | **BEKEND — niet opgelost**       | `docs/i18n/*/llm.txt` wijken af van de rootversie; dit bestond al en blokkeert de pre-commit-controle voor documentatiesynchronisatie.                                                                                                                                                               |

Omgevingsproblemen en codeproblemen worden afzonderlijk gehouden; niet-gerelateerde fouten worden niet verborgen achter gewijzigde testfilters.
