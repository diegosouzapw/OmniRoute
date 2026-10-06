# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Dette dokumentet beskriver det tilbakemeldingsdrevne grunnlaget for adaptiv ruting som er lagt til i
OmniRoute. Det er bevisst lite: Det introduserer en typet kanal for rutingsutfall,
et nettbasert kvalitetssignal som mates inn i den eksisterende auto-combo-poengberegningen, en
valgfri OpenTelemetry-eksportør og et endepunkt for forklarbarhet. Det **erstatter ikke**
den eksisterende robusthetsstakken (kretsbryter, nedkjøling av tilkoblinger,
modellutestenging, helsematrise, autopilot) — det utfyller den.

## 1. Arkitektonisk kontekst

OmniRoute er et dataplan med en **kritisk forespørselssti** og et **kontroll-/intelligensplan**.
Den kritiske stien må forbli rask, minneeffektiv, asynkron, robust og
forutsigbar. Evaluering, kvalitetsberegning, eksperimenter og historisk analyse hører
hjemme i kontrollplanet.

```
KI-agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   dataplan (raskt, synkront, i minnet)
│  ruting / failover  │
│  helse / rekkverk   │
│  hurtigbuffer /     │
│  strømming          │
└──────────┬──────────┘
           │ RoutingEvent (utløs-og-glem, ~0.2µs)
           ▼
┌─────────────────────┐
│  Tilbakemeldings-   │   kontrollplan (asynkront, etter beste evne)
│  mottakere          │
│  kvalitetssporing   │
│  OTel-eksportør     │
│  forklaringslager   │
└──────────┬──────────┘
           ▼  kvalitetspoeng
      auto-combo-poengberegning
```

### Det som allerede fantes (revidert, ikke duplisert)

| Konsept                                 | Eksisterende implementasjon                                                                               |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Tilgjengelighet (kan vi sende trafikk?) | Kretsbryter (CLOSED/DEGRADED/OPEN/HALF_OPEN, lagret i DB), nedkjøling av tilkoblinger, modellutestenging  |
| Helserapportering                       | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                   |
| Skyggetrafikk                           | `open-sse/services/combo/shadowRouting.ts`                                                                |
| Rekkverk                                | `src/lib/guardrails/` (før-/etter-hooks)                                                                  |
| Eksakt hurtigbuffer                     | `src/lib/semanticCache.ts` (signaturbasert)                                                               |
| Evaluatorer / evalueringsdrevet ruting  | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                      |
| Forklarbarhet for combo-beslutninger    | `open-sse/services/combo/decisionTrace.ts`                                                                |
| Hendelser i sanntid for kontrollpanelet | `src/lib/events/eventBus.ts` (kanal for UI-varsler, `unknown`-nyttelaster, historikk med 100 oppføringer) |

Rutingshendelseslaget er **ikke** en ny implementasjon av `eventBus`: Denne bussen er
kontrollpanelets kanal for sanntidsvarsler (typede _hendelsesnavn_, ugjennomsiktige
nyttelaster, UI-konsumenter). `RoutingEvent` er en typet _utfallsstruktur_
(latens/tokener/kostnad/utfall/avslutningsårsak) som brukes av kontrollplanets
tilbakemeldingsmottakere (kvalitetssporing, OTel-eksportør, forklaringslager).

### Det som manglet (lagt til her)

1. En **typet rutingsutfallshendelse + mottakerabstraksjon** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` er avgrenset til combo og finnes bare i minnet;
   `comboMetrics` er kumulative tellere; `call_logs` er rå, asynkron persistens.
   Ingen av dem er en typet, mottakerbasert utfallskanal som en kvalitetssporer, en OTel-
   eksportør eller en evaluator i Future-AGI-stil kan abonnere på.
2. Et **nettbasert kvalitetssignal** (EWMA) for utdatakvalitet — poengberegningen
   representerte tidligere «kvalitet» bare gjennom statisk oppgaveegnethet og
   valgfrie beståttandeler fra evalueringer.
3. En **valgfri, avhengighetsfri OTel-eksportør** som bruker semantiske GenAI-konvensjoner.
4. Et **endepunkt for forklarbarhet** som returnerer de faktiske rutingsbeslutningene + kvalitetstilstanden.

## 2. Rutinghendelser (grunnlag for tilbakemelding)

Filer: `open-sse/services/routing/events.ts`, `.../index.ts`

En `RoutingEvent` inneholder bare rutingsmetadata:

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
  outcome: RoutingOutcome; // union med tillatte verdier
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` er et `Send+Sync`-lignende grensesnitt i TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // må være O(1), ingen synkron I/O
}
```

Den kritiske kjørebanen kaller `emitRoutingEvent(event)` én gang per fullførte forespørsel
(tilbakekallet for fullført strømming, suksessbanen uten strømming og
feilbanen for ugyldig 200-svar i `handleChatCore`). Distribusjonen er synkron
utsending til registrerte mottakere, men hver mottaker legger bare i kø eller
oppdaterer tilstand i minnet. **Ingen synkrone databaseskrivinger og ingen
nettverks-I/O i den kritiske kjørebanen.**

Standardmottakere:

- `MemoryRoutingEventStore` — avgrenset ringbuffer (500), nyeste først, for
  forklaringsendepunktet.
- `QualityTracker`-konsument — oppdaterer EWMA-estimatet for kvalitet.
- `OtlpHttpsEventSink` — valgfri, bare aktivert når `OMNIROUTE_OTEL_ENDPOINT`
  (eller `OTEL_EXPORTER_OTLP_ENDPOINT`) er angitt.

### Målt overhead (ærlig sammenligning)

`npm run bench:routing-events` på denne arbeidsstasjonen (100k iterasjoner; operasjoner
under ett µs målt som aggregert µs/op fordi persentilene per operasjon er lavere enn
tidsoppløsningen til `performance.now()`):

| Scenario                                | µs/op  | ops/s  |
| --------------------------------------- | ------ | ------ |
| grunnlinje (bare poengberegning)        | ~0.045 | ~22 M  |
| grunnlinje + RoutingEvent (2 mottakere) | ~0.168 | ~5.9 M |
| grunnlinje + hendelse + OTel-kølegging  | ~0.163 | ~6.1 M |
| samtidig (8 flettede puljer)            | ~0.18  | —      |

Forskjellen i hendelsesdistribusjon sammenlignet med grunnlinjens poengberegning er
~0.12 µs/forespørsel; OTel-mottakeren legger bare i kø (O(1)-innsetting i buffer)
og tilfører ikke noe målbart. Disse tallene er maskinspesifikke og relative — ikke
en produksjonsgaranti. v1-tallet på «~0.2 µs» var et aggregert estimat; denne
metoden skiller grunnlinjen for poengberegning fra kostnaden ved
hendelsesdistribusjon.

## 3. Kvalitetssignal (tilbakemeldingsdrevet leverandørtilstand)

Filer: `open-sse/services/routing/quality.ts`

v2 skiller mellom **operasjonell** og **semantisk** kvalitet:

- **Operasjonell** — utledet fra den kritiske rutingsbanen (HTTP 4xx/5xx,
  tilkoblingsfeil, 429-svar, ugyldige svar, avbrudd i strømmer,
  `finish_reason=length`, vellykkede svar uten utdata, EWMA for latenstid/TTFT).
  Et 200-svar behandles IKKE som semantisk kvalitet.
- **Semantisk** — den faktiske verdien av genererte utdata. Produseres
  UTELUKKENDE av en evaluator via `setSemanticQuality()`. Den er `null` frem
  til en evaluator oppgir den, og påvirker aldri den operasjonelle poengsummen.

Tilstand per (leverandør, modell) (EWMA + avgrensede tellere):

- `successEwma` — EWMA (α=0.2) for vellykket utfall.
- `latencyEwma` / `ttftEwma` — EWMA for latenstid (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — hvor nylig modellen sist ble observert.

### Bevissthet om konfidens og antall observasjoner

`confidence = clamp01(samples / 50)`, og poengsummen som returneres til
poengberegneren, blandes mot det nøytrale midtpunktet:

```
score = 0.5 + confidence * (operational - 0.5)
```

Konsekvenser (verifisert av tester):

- En kald leverandør (0 observasjoner) får poengsummen **0.5** — den straffes
  ikke urettferdig, men kan heller ikke overgå en leverandør med tusenvis av
  solide observasjoner.
- En leverandør med 7 heldige vellykkede resultater trekkes mot 0.5 (den
  dominerer aldri som følge av optimistisk initialisering).
- En leverandør med 50+ observasjoner konvergerer mot sin reelle operasjonelle
  poengsum.
- Forringelse og gjenoppretting skjer gradvis (EWMA), og én isolert feil
  ødelegger ikke en velfungerende leverandør.

`ProviderQuality` eksponerer `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Dette mates inn i auto-combo-poengberegneren som poengfaktoren `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` i
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Summen forblir 1.0.
- `buildAutoCandidates` fyller ut `candidate.quality` fra sporeren; kandidater
  uten data bruker som standard nøytrale **0.5** (en kald kandidat verken
  favoriseres eller straffes).

Den lukkede sløyfen:

```
RoutingEvent → QualityTracker → getQualityScore → kvalitetsfaktor for auto-combo
      ↑                                                    │
      └────── forespørselsutfall (handleChatCore) ←────────┘
```

### Hard ekskludering kontra myk straff

Kvalitetssignalet er bare en **myk adaptiv preferanse**. Hard ekskludering
håndteres fortsatt av den eksisterende robusthetsstakken: åpen effektbryter,
oppbrukt kvote, autentiseringsfeil, modellsperre — ingen av disse påvirkes av
kvalitetspoengsummen. En leverandør med midlertidig redusert kvalitetspoengsum
blir nedprioritert, aldri deaktivert fullstendig.

## 3b. Kanonisk strømtiming (TTFT / ITL)

Filer: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` er det eneste instrumenteringspunktet for strømmebanen,
koblet til `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — første oppstrømsdatablokk mottatt.
- `markForward()` — første datablokk videresendt til klienten (brukes for TTFT).
- `markInterrupted()` — tidsavbrudd/avbrudd/feil i strømmen før en fullført avslutning.
- `ttft()` = latens frem til første videresendte SSE-datablokk. **Dette er IKKE TTFT på tokennivå** —
  én enkelt SSE-datablokk kan inneholde null/ett/mange tokener. Presist dokumentert.
- `avgItlMs()` = gjennomsnittlig mellomrom mellom datablokker (en datablokklatens-proxy for ITL).

TTFT/ITL/avbrutt flyter inn i `RoutingEvent` (`ttftMs`, `itlMs`) og
eksporteres som GenAI-/OmniRoute-spanattributter av OTel-mottakeren.

## 4. OpenTelemetry / GenAI-observerbarhet

Filer: `open-sse/services/routing/otel.ts`

- Avhengighetsfri OTLP/HTTP JSON-eksportør (bruker global `fetch`, ingen
  `@opentelemetry/*` SDK).
- Spans følger GenAI-semantiske konvensjoner (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) i tillegg til OmniRoute-attributter
  for ruting (resultat, status, ttft, nye forsøk, reservevalg).
- `record()` legger bare i kø i en avgrenset buffer (O(1)); en bakgrunnstidtaker
  tømmer bufferen asynkront via `POST {endpoint}/v1/traces`. Ved overbelastning
  forkastes de eldste hendelsene (`dropped`-teller) — dataplanet utsettes aldri
  for mottrykk.
- **Deaktivert med mindre det er konfigurert.** `OMNIROUTE_OTEL_ENDPOINT` (eller
  `OTEL_EXPORTER_OTLP_ENDPOINT`) må være angitt; ellers registreres ikke
  mottakeren, og ingen OTel-kode kjøres.

## 5. Forklarbarhet

- `GET /v1/explain/routing` returnerer de nylige `RoutingEvent`-ene (de faktiske
  beslutningene, nyeste først) og kvalitetsøyeblikksbildet per leverandør/modell.
- Autentisering tilsvarer `/v1/combos` (Bearer-API-nøkkel eller instrumentbordøkt; anonym
  på lokale énbrukerdistribusjoner med `REQUIRE_API_KEY=false`).
- Spor per kjøring på kombinasjonsnivå er fortsatt tilgjengelige via eksisterende
  `decisionTrace.ts` (headeren `X-OmniRoute-Combo-Trace`).
- Sikkerhet: Hendelser inneholder bare rutingsmetadata, aldri ledetekster/innhold/legitimasjon.

## 6. Integrasjon med evalueringsplanet (beredskap for Future AGI)

OmniRoute behandler Future AGI (eller enhver evaluator) som en **potensiell
intelligens-/evalueringsbackend, ikke en avhengighet**. Integrasjonspunktene:

- En `RoutingEventSink` kan videresende hendelser asynkront til en evaluator.
- `MemoryRoutingEventStore` + kvalitetsøyeblikksbildet gir en evaluator den rå
  beslutningsstrømmen.
- En fremtidig `Evaluator` (deterministisk, lokal bedømmer, HTTP, WASM) vil konsumere
  hendelser/spor og returnere en `QualityScore` som mates inn i den samme
  `getQualityScore`-/kvalitetsfaktorbanen.
- Eksisterende evalueringsdrevet ruting (`open-sse/services/evalRouting.ts`) omorganiserer
  allerede kombinasjonsmål etter beståttandeler fra `eval_runs` når dette er aktivert.

Ingen evaluering kjøres synkront i forespørselsbanen, og gatewayen fungerer
fullt ut uten evaluatoren.

## 7. Endelig arkitekturgjennomgang

1. **Hva gjenstår i den synkrone ytelseskritiske banen?** Ruting/poengberegning, forhåndskontroller
   for beskyttelsesregler, bufferoppslag og én `emitRoutingEvent`-utsending (~0,12 µs over
   grunnlinjens poengberegning) til mottakere i minnet.
2. **Hva ble flyttet til asynkron behandling?** OTel-eksport (tidtaker + fetch),
   persistens av `call_logs`/bruk, skriving til semantisk buffer; kvalitet holdes i minnet
   og er O(1) (ingen asynkron behandling nødvendig).
3. **Hvordan blir et rutingsresultat til tilbakemelding?** `handleChatCore` sender ut en
   `RoutingEvent` → `QualityTracker` oppdaterer EWMA-tilstanden → `getQualityScore`
   mater `quality`-faktoren for automatiske kombinasjoner.
4. **Hvordan påvirker kvalitet fremtidig ruting?** En lav kvalitetsscore reduserer
   den vektede poengsummen for den aktuelle leverandøren/modellen i `scoreAutoTargets`, slik at degraderte
   modeller gradvis nedprioriteres og gjenopprettes etter hvert som deres EWMA forbedres.
5. **Hvordan kan Future AGI integreres uten å bli en avhengighet?** Via
   `RoutingEventSink`-grensesnittet / en fremtidig `Evaluator`-adapter — ingen hardkodet
   avhengighet.
6. **Hva skjer når evaluatoren ikke er tilgjengelig?** Rutingen påvirkes ikke;
   kvalitet faller tilbake til nøytral (1.0) for modeller uten observerte signaler.
7. **Hva skjer når telemetri ikke er tilgjengelig?** OTel-mottakeren blir ganske enkelt ikke
   registrert; resten av rutingslaget kjører uendret.
8. **Hva skjer ved overbelastning?** OTel-bufferen forkaster de eldste hendelsene; kvalitet
   og ringbufferen er avgrenset per konstruksjon; ingen mottrykk.
9. **Hvordan gjenopprettes leverandørtilstanden etter degradering?** EWMA konvergerer på nytt etter hvert som
   vellykkede resultater akkumuleres; oppvarming holder kalde modeller nøytrale; kretsbryteren
   gjenopprettes uavhengig via HALF_OPEN-prober.
10. **Hvilke foreslåtte funksjoner ble med hensikt IKKE implementert, og hvorfor?**
    - Skyggetrafikk / eksperimenter — allerede implementert
      (`combo/shadowRouting.ts`); ikke bygget på nytt.
    - Beskyttelsesregler — allerede implementert (`src/lib/guardrails/`); ikke duplisert.
    - Semantisk buffer — allerede implementert (`src/lib/semanticCache.ts`); ikke
      duplisert.
    - En komplett plattform for eksperimentadministrasjon, datasettverktøy, plattform for optimalisering
      av ledetekster, vektordatabase eller obligatorisk ekstern OTel-infrastruktur — utenfor
      omfanget til et slankt dataplan.
    - En Rust-`RoutingEvent`-struct — dataplanet er TypeScript; TS-typen
      er den tilpassede ekvivalenten.

## 8. Konfigurasjonsreferanse

| Variabel                      | Standardverdi | Effekt                                                                                     |
| ----------------------------- | ------------- | ------------------------------------------------------------------------------------------ |
| `OMNIROUTE_OTEL_ENDPOINT`     | ikke angitt   | Når angitt aktiveres OTLP/HTTP-eksportøren for sporinger (f.eks. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | ikke angitt   | Reservealias for OTLP-endepunktet.                                                         |
| `OTEL_SERVICE_NAME`           | `omniroute`   | Ressursattributtet `service.name`.                                                         |

## 9. Tester

- `tests/unit/routing-events.test.ts` — normalisering av hendelser, statusklassifisering,
  avgrenset ringbuffer, utvidelse til flere mottakere + isolasjon.
- `tests/unit/routing-quality.test.ts` — EWMA-oppvarming, gjenoppretting etter feil/suksess,
  avviksstraffer, midlertidig håndtering av 429, øyeblikksbilde, tilbakestilling.
- `tests/unit/routing-scoring-quality.test.ts` — vektintegritet, nøytral
  standardverdi, rangering etter kvalitetsfaktor.
- `tests/unit/routing-otel.test.ts` — aktiveringskontroll, GenAI-spennets nyttelast, asynkron
  tømming, forkasting ved overbelastning.
- `tests/unit/routing-events-concurrency.test.ts` — tusenvis av hendelser, ringbufferens
  avgrensning, isolasjon av mottakere som kaster feil, sammenflettede asynkrone puljer,
  tilbakestilling under innsettinger.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministisk ende-til-ende-løkke via
  den faktiske `scoreAutoTargets`-poengberegneren: frisk → forverring → gjenoppretting → kortvarig
  avvik, i tillegg til scenarier med kaldstart og heldig kald leverandør.
- `tests/unit/stream-timing.test.ts` — TTFT (første videresendte datablokk), ITL,
  første byte kontra første videresending, avbrudd, sikkerhet ved ugyldige/tomme datablokker.

## 10. Status for eksisterende problemer (fase 18)

| Problem                                                      | Status                     | Merknader                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eksportavvik i `omniglyph`                                   | **RETTET (miljørelatert)** | `node_modules` var ikke synkronisert med `package-lock.json` (installert 1.3.1 kontra låst 1.4.0). Kjøring av `npm install omniglyph@1.4.0` gjenopprettet den låste versjonen; antallet typefeil falt til 0. Manifestene er uendret.                                            |
| Utdaterte `getKnownContextOverflow`-tester                   | **KJENT — ikke rettet**    | `combo-context-overflow-compression-probe.test.ts` importerer en funksjon som ikke lenger finnes i `open-sse/services/combo.ts` (kun kommentarer refererer til den). Retting krever at testene implementeres på nytt eller skrives om — en ikke-relatert arkitektonisk endring. |
| Databaseisolasjon i `combo-runtime-unit-concurrency.test.ts` | **KJENT — ikke rettet**    | Testverktøyets kontroll av SQLite-isolasjon mislykkes når testen kjøres direkte; den mislykkes på identisk måte på grunngrenen.                                                                                                                                                 |
| Avvik i i18n-`llm.txt`                                       | **KJENT — ikke rettet**    | `docs/i18n/*/llm.txt` avviker fra rotversjonen; dette er et eksisterende problem som blokkerer pre-commit-kontrollen for dokumentsynkronisering.                                                                                                                                |

Miljø- og kodeproblemer holdes atskilt; ingen ikke-relaterte feil skjules
bak endrede testfiltre.
